declare module "react-native-google-drive-api-wrapper" {
    declare const _default: {
        setAccessToken: (token: string) => void;
        init: () => void;
        isInitialized: () => boolean;

        files: {
            createFileMultipart(
                contents: string,
                mimeType: string,
                opts: {
                    parents: string[];
                    name: string;
                },
                isBase64: boolean
            ): Promise<Response>;
        };
    };
    export default _default;
}
