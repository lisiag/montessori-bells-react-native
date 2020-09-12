import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./ui/hooks/useCachedResources";
import useColorScheme from "./ui/hooks/useColorScheme";
import Navigation from "./ui/navigation";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./ui/screens/HomeScreen";
import AboutScreen from "./ui/screens/AboutScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Match from "./ui/screens/Match";

const Stack = createStackNavigator();

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: "Welcome",
                            headerRight: () => (
                                <Button
                                    onPress={() => alert("This is a button!")}
                                    title="Login"
                                    color="#000"
                                />
                            ),
                        }}
                    />
                    <Stack.Screen name="About" component={AboutScreen} />
                    <Stack.Screen name="Match" component={Match} />
                </Stack.Navigator>
                {/* Rest of your app code */}
            </NavigationContainer>
        );
    }
}
