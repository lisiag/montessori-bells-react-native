import React from "react";
import { Button } from "react-native";
import { Text } from "../components/Themed";
import { getUserName } from "../../business/UserBus";

export default function LoginButton(navigation: any) {
    let userName = getUserName();
    if (userName != null) {
        return <Text>{userName}</Text>;
    } else {
        return (
            <Button
                onPress={() => navigation.navigate("Login")}
                title="Login"
                color="#000"
            />
        );
    }
}
