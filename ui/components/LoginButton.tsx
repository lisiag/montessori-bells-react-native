import React, { useState } from "react";
import { Button } from "react-native";
import { Text, View } from "../components/Themed";
import { getUserName } from "../../business/UserBus";

export default function LoginButton(
    navigation: any,
    logoutShowing: boolean,
    setLogoutShowing: (v: boolean) => void
) {
    let userName = getUserName();

    if (userName != null) {
        if (logoutShowing) {
            return (
                <View>
                    <Text>{userName}</Text>
                    <Text>Log out</Text>
                </View>
            );
        } else {
            return (
                <Text onPress={() => setLogoutShowing(true)}>{userName}</Text>
            );
        }
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

/* export interface LoginButtonProps {
 *     navigation: any;
 * }
 *
 * type MyState = { logoutShowing: boolean };
 *
 * export class LoginButton extends Component<LoginButtonProps, MyState> {
 *     userName!: string | undefined;
 *
 *     constructor(props: any) {
 *         super(props);
 *         // Don't call this.setState() here!
 *         this.state = { logoutShowing: false };
 *         this.userName = getUserName();
 *     }
 *
 *     render() {
 *         if (this.userName != null) {
 *             if (this.state.logoutShowing) {
 *                 return (
 *                     <View>
 *                         <Text>{this.userName}</Text>
 *                         <Text>Log out</Text>
 *                     </View>
 *                 );
 *             } else {
 *                 return (
 *                     <Text
 *                         onPress={() => this.setState({ logoutShowing: true })}
 *                     >
 *                         {this.userName}
 *                     </Text>
 *                 );
 *             }
 *         } else {
 *             return (
 *                 <Button
 *                     onPress={() => this.props.navigation.navigate("Login")}
 *                     title="Login"
 *                     color="#000"
 *                 />
 *             );
 *         }
 *     }
 * } */
