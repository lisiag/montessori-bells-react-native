import React from "react";
import { Button } from "react-native";

import useCachedResources from "./ui/hooks/useCachedResources";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./ui/screens/HomeScreen";
import AboutScreen from "./ui/screens/AboutScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Match from "./ui/screens/Match";
import MakeMusic from "./ui/screens/MakeMusic";
import Login from "./ui/screens/Login";
import ProfileScreen from "./ui/screens/ProfileScreen";
import { headerHeight } from "./ui/constants/constants";

const Stack = createStackNavigator();

const loginButton = (navigation: any) => {
    return (
        <Button
            title="Login"
            color="#000"
            onPress={() => navigation.navigate("Login")}
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
                        options={({ navigation }) => ({
                            title: "Home",
                            headerRight: () => loginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={({ navigation }) => ({
                            title: "About",
                            headerRight: () => loginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="Match"
                        component={Match}
                        options={({ navigation }) => ({
                            title: "Pair the matching bells",
                            headerRight: () => loginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="MakeMusic"
                        component={MakeMusic}
                        options={({ navigation }) => ({
                            title: "Make music",
                            headerRight: () => loginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            title: "Log in",
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            title: "Profile",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
