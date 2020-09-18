import { setSongDB, NoteTime } from "../business/song";
import { accessToken } from "./UserData";

const url = "https://www.googleapis.com/drive/v3";
const uploadUrl = "https://www.googleapis.com/upload/drive/v3";

const boundaryString = "foo_bar_baz"; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

async function parseAndHandleErrors(response: Response): Promise<any> {
    console.log(`DEBUG parseAndHandleErrors`, response.ok);
    if (response.ok) {
        return response.json();
    }
    console.log(`DEBUG err`, err);
    const error = await response.json();
    throw new Error(JSON.stringify(error));
}

function configureGetOptions() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    return {
        method: "GET",
        headers,
    };
}

function configurePostOptions(bodyLength: number, isUpdate = false) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);
    headers.append(
        "Content-Type",
        `multipart/related; boundary=${boundaryString}`
    );
    headers.append("Content-Length", bodyLength.toString());
    return {
        method: isUpdate ? "PATCH" : "POST",
        headers,
    };
}

function createMultipartBody(name: string, body: any, isUpdate = false) {
    // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
    const metaData = {
        name,
        description: "React Bells song",
        mimeType: "application/json",
    } as any;
    // if it already exists, specifying parents again throws an error
    if (!isUpdate) metaData.parents = ["appDataFolder"];

    // request body
    const multipartBody =
        `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${JSON.stringify(metaData)}\r\n` +
        `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n` +
        `${JSON.stringify(body)}\r\n` +
        `--${boundaryString}--`;

    return multipartBody;
}

// uploads a file with its contents and its meta data (name, description, type, location)
async function uploadFile(
    name: string,
    content: any,
    existingFileId?: string
): Promise<any> {
    const body = createMultipartBody(name, content, !!existingFileId);
    const options = configurePostOptions(body.length, !!existingFileId);
    return await parseAndHandleErrors(
        await fetch(
            `${uploadUrl}/files${
                existingFileId ? `/${existingFileId}` : ""
            }?uploadType=multipart`,
            {
                ...options,
                body,
            }
        )
    );
}

// Looks for files with the specified file name in your app Data folder only (appDataFolder is a magic keyword)
function queryParams(name: string) {
    return encodeURIComponent(
        `name = '${name}' and 'appDataFolder' in parents`
    );
}

// returns the files meta data only. the id can then be used to download the file
async function getFile(name: string): Promise<any> {
    const qParams = queryParams(name);
    const options = configureGetOptions();
    const body = await parseAndHandleErrors(
        await fetch(`${url}/files?q=${qParams}&spaces=appDataFolder`, options)
    );
    if (body && body.files && body.files.length > 0) return body.files[0];
    return null;
}

// download the file contents given the id
async function downloadFile(existingFileId: string): Promise<any> {
    const options = configureGetOptions();
    if (!existingFileId) throw new Error("Didn't provide a valid file id.");
    return await parseAndHandleErrors(
        await fetch(`${url}/files/${existingFileId}?alt=media`, options)
    );
}

export function initDB(): void {}

function cleanTitle(title: string): string {
    return title.replace(/[^a-zA-Z0-9._-]+/g, "");
}

function assertInitialized(): void {
    if (!accessToken) {
        throw new Error("Google Drive is not initialized!");
    }
}

setSongDB({
    async saveSong(title: string, song: NoteTime[]): Promise<void> {
        assertInitialized();
        title = cleanTitle(title);
        uploadFile(title, song);
    },

    async loadSong(title: string): Promise<NoteTime[] | null> {
        assertInitialized();
        title = cleanTitle(title);
        const existingFileId = await getFile(title);
        console.log(`DEBUG existingFileId`, existingFileId);
        const drivedata = await downloadFile(existingFileId.id);
        return drivedata as NoteTime[];
    },
});
