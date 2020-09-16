import * as React from "react";
import { Button } from "react-native";

export default function Login() {
    return (
        <Button
            onPress={() => alert("This is a button!")}
            title="Login"
            color="#000"
        />
    );
}
