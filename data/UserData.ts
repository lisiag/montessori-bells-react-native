import * as Google from "expo-google-app-auth";

export let userName: string | undefined = undefined;

export let accessToken: any = null;

const ANDROID_CLIENT_ID =
    "206489084146-42luprtdfm6mr734srruuq01jgm69dv6.apps.googleusercontent.com";

export async function signInWithGoogle() {
    try {
        const result = await Google.logInAsync({
            androidClientId: ANDROID_CLIENT_ID,
            scopes: ["profile", "email"],
        });

        if (result.type === "success") {
            userName = result.user.givenName;
            accessToken = result.accessToken;
            return true;
        } else {
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
