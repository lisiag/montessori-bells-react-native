import React from "react";
import { Button } from "react-native";

export default function LoginButton(navigation: any) {
    return (
        <Button
            onPress={() => navigation.navigate("Login")}
            title="Login"
            color="#000"
        />
    );
}
