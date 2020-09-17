import React from "react";
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
                            headerRight: () => LoginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={({ navigation }) => ({
                            title: "About",
                            headerRight: () => LoginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="Match"
                        component={Match}
                        options={({ navigation }) => ({
                            title: "Pair the matching bells",
                            headerRight: () => LoginButton(navigation),
                        })}
                    />
                    <Stack.Screen
                        name="MakeMusic"
                        component={MakeMusic}
                        options={({ navigation }) => ({
                            title: "Make music",
                            headerRight: () => LoginButton(navigation),
                        })}
                    />
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
