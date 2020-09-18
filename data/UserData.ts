import * as Google from "expo-google-app-auth";

export let userName: string | undefined = undefined;

export let accessToken: any = null;

const ANDROID_CLIENT_ID =
    "206489084146-42luprtdfm6mr734srruuq01jgm69dv6.apps.googleusercontent.com";

type LoginCallback = (userName?: string, accessToken?: string) => void;

let loginListener = new Set<LoginCallback>();

export function observeLogin(callback: LoginCallback): () => void {
    loginListener.add(callback);
    return () => {
        loginListener.delete(callback);
    };
}

function notifyListeners(userName?: string, accessToken?: string) {
    for (const cb of loginListener) {
        cb(userName, accessToken);
    }
}

export async function signInWithGoogle() {
    try {
        const result = await Google.logInAsync({
            androidClientId: ANDROID_CLIENT_ID,
            scopes: [
                "profile",
                "email",
                "https://www.googleapis.com/auth/drive.appdata",
            ],
        });

        if (result.type === "success") {
            userName = result.user.givenName;
            accessToken = result.accessToken;
            notifyListeners(userName, accessToken);
            return true;
        } else {
            notifyListeners();
            return false;
        }
    } catch (e) {
        console.error("Error with Google login", e);
        return false;
    }
}

export async function signOutWithGoogle() {
    try {
        await Google.logOutAsync({
            accessToken: accessToken,
            androidClientId: ANDROID_CLIENT_ID,
        });
        userName = undefined;
        accessToken = null;
        return true;
    } catch (e) {
        console.error("Error with Google signout", e);
        return false;
    }
}
