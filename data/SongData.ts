import { setSongDB, NoteTime } from "../business/song";

const url = "https://www.googleapis.com/drive/v3";
const uploadUrl = "https://www.googleapis.com/upload/drive/v3";

const boundaryString = "reactbells"; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

let apiToken: any = null;

// export const configureGoogleSignIn = async () => GoogleSignIn.configure({
//     // https://developers.google.com/identity/protocols/googlescopes
//   scopes: ['https://www.googleapis.com/auth/drive.appdata'],
//   shouldFetchBasicProfile: true,
// })

export function setApiToken(token: any) {
    apiToken = token;
}

const dispatchGoogleDrive = (apiToken: string) => (dispatch: any) => {
    dispatch({ type: ActionNames.dataRestoreStart });
    setApiToken(apiToken);
    return getWorkoutFile()
        .then((file) => {
            if (file) {
                return downloadFile(file.id);
            }
            throw new Error("No existing backup file found.");
        })
        .then((data) => {
            dispatch({
                type: ActionNames.dataRestoreFinished,
                payload: data,
            });
        })
        .catch((err) =>
            dispatch({ type: ActionNames.dataRestoreError, payload: err })
        );
};

function parseAndHandleErrors(response: any) {
    if (response.ok) {
        return response.json();
    }
    return response.json().then((error: any) => {
        throw new Error(JSON.stringify(error));
    });
}

function configureGetOptions() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${apiToken}`);
    return {
        method: "GET",
        headers,
    };
}

function configurePostOptions(bodyLength: number, isUpdate = false) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${apiToken}`);
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

function createMultipartBody(body: any, title: string, isUpdate = false) {
    // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
    const metaData: any = {
        name: title,
        description: "Store song",
        mimeType: "application/json",
    };
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
    content: string,
    title: string,
    existingFileId?: string
): Promise<any> {
    const body = createMultipartBody(content, title, existingFileId != null);
    const options = configurePostOptions(body.length, !!existingFileId);
    const response = await fetch(
        `${uploadUrl}/files${
            existingFileId ? `/${existingFileId}` : ""
        }?uploadType=multipart`,
        {
            ...options,
            body,
        }
    );
    return parseAndHandleErrors(response);
}

// Looks for files with the specified file name in your app Data folder only (appDataFolder is a magic keyword)
function queryParams(title: string) {
    return encodeURIComponent(
        `name = '${title}' and 'appDataFolder' in parents`
    );
}

// does the file exist?
// returns the files meta data only. the id can then be used to download the file
async function getFile(title: string): Promise<any | null> {
    const qParams = queryParams(title);
    const options = configureGetOptions();
    const response = await fetch(
        `${url}/files?q=${qParams}&spaces=appDataFolder`,
        options
    );
    const body = parseAndHandleErrors(response);
    if (body && body.files && body.files.length > 0) return body.files[0];
    return null;
}

// download the file contents given the id
async function downloadFile(existingFileId: string): Promise<any> {
    const options = configureGetOptions();
    if (!existingFileId) throw new Error("Didn't provide a valid file id.");
    return parseAndHandleErrors(
        await fetch(`${url}/files/${existingFileId}?alt=media`, options)
    );
}

function cleanTitle(title: string): string {
    return title.replace(/\W+/g, "");
}

setSongDB({
    async saveSong(title: string, song: NoteTime[]): Promise<void> {
        title = cleanTitle(title);
        const metadata = await getFile(title);
        console.log(`DEBUG metadata`, metadata);
        throw new Error("FIXME GJ ");
        await uploadFile(
            JSON.stringify(song, undefined, 2),
            title,
            metadata ?? undefined
        );
    },

    async loadSong(title: string): Promise<NoteTime[] | null> {
        title = cleanTitle(title);
        const metadata = await getFile(title);
        if (metadata == null) return null;
        const drivedata = await downloadFile(metadata);
        return JSON.parse(drivedata) as NoteTime[];
    },
});
