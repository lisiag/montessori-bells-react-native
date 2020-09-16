import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Google from "expo-google-app-auth";

const ANDROID_CLIENT_ID =
    "206489084146-42luprtdfm6mr734srruuq01jgm69dv6.apps.googleusercontent.com";
export default class LoginScreen extends Component<any> {
    signInWithGoogle = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: ANDROID_CLIENT_ID,
                scopes: ["profile", "email"],
            });

            console.log(`DEBUG result`, result);

            if (result.type === "success") {
                console.log("LoginScreen.js.js 21 | ", result.user.givenName);
                this.props.navigation.navigate("Profile"); //after Google login redirect to Profile
                return result.accessToken;
            } else {
                console.log(`DEBUG cancelled`);
                return { cancelled: true };
            }
        } catch (e) {
            console.log("LoginScreen.js 30 | Error with login", e);
            return { error: true };
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Login with Google"
                    onPress={this.signInWithGoogle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
