import * as Google from "expo-google-app-auth";

export let userName: string | undefined = undefined;

// This accessToken is got when the user logs in to the app with their Google account and agrees to
// allow the app to view and manage its own configuration data in their Google Drive. I
export let accessToken: any = null;

// Project ID provided by Google, in order to access Google Sign-in and Google Drive API.
const ANDROID_CLIENT_ID =
    "206489084146-42luprtdfm6mr734srruuq01jgm69dv6.apps.googleusercontent.com";

// LoginCallback, loginListener, observeLogin and notifyListeners are not currently being used. They
// were intended for, and may in future be used for, listening to changes in the logged in user.
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

// sign in with Google and request access to view and manage this app's config data in the user's Google Drive
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
