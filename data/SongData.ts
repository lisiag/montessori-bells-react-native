import { setSongDB, NoteTime } from "../business/song";
import { observeLogin, accessToken } from "./UserData";

const uploadUrl = "https://www.googleapis.com/upload/drive/v3/files";

const ddb = `--abcdef123456`;

console.log(`DEBUG accessToken`, accessToken);

function _createHeaders(
    contentType: string,
    contentLength: number,
    ...additionalPairs: any[]
) {
    let pairs = [["Authorization", `Bearer ${accessToken}`]];

    [
        ["Content-Type", contentType],
        ["Content-Length", contentLength.toString()],
    ].forEach((data) => (data[1] ? pairs.push(data) : undefined));

    if (additionalPairs) {
        pairs = pairs.concat(additionalPairs);
    }

    const headers = new Headers();

    for (let pair of pairs) {
        headers.append(pair[0], pair[1]);
    }

    return headers;
}

const Files = {
    async createFileMultipart(
        media: string,
        mediaType: string,
        metadata: any
    ): Promise<Response> {
        const ending = `\n${ddb}--`;

        let body =
            `\n${ddb}\n` +
            `Content-Type: application/json; charset=UTF-8\n\n` +
            `${JSON.stringify(metadata)}\n\n${ddb}\n` +
            `Content-Type: ${mediaType}\n\n`;

        body += `${media}${ending}`;

        console.log(`DEBUG body`, body);

        console.log(`DEBUG params`, `${uploadUrl}?uploadType=multipart`, {
            method: "POST",
            headers: _createHeaders(
                `multipart/related; boundary=${ddb}`,
                body.length
            ),
        });

        return fetch(`${uploadUrl}?uploadType=multipart`, {
            method: "POST",
            headers: _createHeaders(
                `multipart/related; boundary=${ddb}`,
                body.length
            ),
            body,
        });
    },
};

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
        try {
            assertInitialized();
            title = cleanTitle(title);
            const response = await Files.createFileMultipart(
                JSON.stringify(song, undefined, 2),
                "application/json",
                {
                    parents: ["appDataFolder"],
                    name: title,
                }
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    },

    async loadSong(title: string): Promise<NoteTime[] | null> {
        assertInitialized();
        title = cleanTitle(title);
        const drivedata = "{}"; //await downloadFile(metadata);
        return JSON.parse(drivedata) as NoteTime[];
    },
});
