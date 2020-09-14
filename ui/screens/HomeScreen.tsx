import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View, ScrollView, SafeAreaView } from "../components/Themed";

export default function HomeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text
                    style={styles.item}
                    onPress={() => navigation.navigate("About")}
                >
                    About
                </Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text
                    style={styles.item}
                    onPress={() => navigation.navigate("Match", { level: 1 })}
                >
                    Match bell
                </Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text
                    style={styles.item}
                    onPress={() => navigation.navigate("Match", { level: 3 })}
                >
                    Match bells: 3
                </Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text
                    style={styles.item}
                    onPress={() => navigation.navigate("Match", { level: 8 })}
                >
                    Match bells: octave
                </Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text
                    style={styles.item}
                    onPress={() => navigation.navigate("MakeMusic")}
                >
                    Make music
                </Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text style={styles.item}>Play song</Text>
                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />
                <Text style={[styles.item, styles.coming]}>
                    Sort bells (coming soon!)
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scroll: {
        width: "100%",
        paddingLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    item: {
        fontSize: 20,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    coming: {
        color: "gray",
    },
});
