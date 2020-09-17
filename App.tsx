import React, { useState } from "react";
import useCachedResources from "./ui/hooks/useCachedResources";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./ui/screens/HomeScreen";
import AboutScreen from "./ui/screens/AboutScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Match from "./ui/screens/Match";
import MakeMusic from "./ui/screens/MakeMusic";
import Login from "./ui/screens/Login";
import LoginButton from "./ui/components/LoginButton";
import { headerHeight } from "./ui/constants/constants";

const Stack = createStackNavigator();

export default function App() {
    const isLoadingComplete = useCachedResources();

    const [logoutShowing, setLogoutShowing] = useState(false);

    const stackScreen = (name: string, component: any, title = name) => {
        return (
            <Stack.Screen
                name={name}
                component={component}
                options={({ navigation }) => ({
                    title,
                    headerRight: () =>
                        LoginButton(
                            navigation,
                            logoutShowing,
                            setLogoutShowing
                        ),
                })}
            />
        );
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { height: headerHeight() },
                    }}
                >
                    {stackScreen("Home", HomeScreen)}
                    {stackScreen("About", AboutScreen)}
                    {stackScreen("Match", Match, "Pair the matching bells")}
                    {stackScreen("MakeMusic", MakeMusic, "Make music")}
                    {stackScreen("Login", Login, "Log in")}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
