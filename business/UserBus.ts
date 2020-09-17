import { signInWithGoogle, userName } from "../data/UserData";

export async function signIn() {
    return await signInWithGoogle();
}

export function getUserName() {
    return userName;
}
