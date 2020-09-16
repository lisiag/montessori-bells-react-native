import React, { Component } from "react";
import { View, StyleSheet, Button } from "react-native";
import { signIn } from "../../business/UserBus";

async function handlePress(navigation: any) {
    const signedIn = await signIn();
    if (signedIn) {
        navigation.navigate("Profile"); //after Google login redirect to Profile
    } else {
    }
}

export default function LoginScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Button
                title="Login with Google"
                onPress={() => handlePress(navigation)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
