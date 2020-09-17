import {
    signInWithGoogle,
    userName,
    signOutWithGoogle,
} from "../data/UserData";

export async function signIn() {
    return await signInWithGoogle();
}

export function getUserName() {
    return userName;
}

export async function logout() {
    return await signOutWithGoogle();
}
