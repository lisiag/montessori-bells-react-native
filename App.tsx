import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import createHeaderRight from "./ui/components/HeaderRight";
import { headerHeight } from "./ui/constants/constants";
import useCachedResources from "./ui/hooks/useCachedResources";
import AboutScreen from "./ui/screens/AboutScreen";
import HomeScreen from "./ui/screens/HomeScreen";
import Login from "./ui/screens/Login";
import MakeMusic from "./ui/screens/MakeMusic";
import Match from "./ui/screens/Match";

import { initDB } from "./data/SongData";

initDB();

const Stack = createStackNavigator();

export default function App() {
    const isLoadingComplete = useCachedResources();

    const headerRight = createHeaderRight();

    const stackScreen = (name: string, component: any, title = name) => {
        return (
            <Stack.Screen
                name={name}
                component={component}
                options={({ navigation }) => ({
                    title,
                    headerRight: () => headerRight(navigation),
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
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            title: "Log in",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
