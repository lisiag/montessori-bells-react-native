import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./ui/hooks/useCachedResources";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./ui/screens/HomeScreen";
import AboutScreen from "./ui/screens/AboutScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Match from "./ui/screens/Match";
import { headerHeight } from "./ui/constants/constants";

const Stack = createStackNavigator();

const loginButton = () => {
    return (
        <Button
            onPress={() => alert("This is a button!")}
            title="Login"
            color="#000"
        />
    );
};

export default function App() {
    const isLoadingComplete = useCachedResources();

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
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: "Home",
                            headerRight: loginButton,
                        }}
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            title: "About",
                            headerRight: loginButton,
                        }}
                    />
                    <Stack.Screen
                        name="Match"
                        component={Match}
                        options={{
                            title: "Pair the matching bells",
                            headerRight: loginButton,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
