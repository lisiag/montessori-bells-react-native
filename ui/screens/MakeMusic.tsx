import * as React from "react";
import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import Bells from "../components/Bells";

export default function MakeMusic() {
    const instructions = (
        <Text style={{ padding: 20 }}>
            <Text>
                Compose and play your own songs by tapping the bells.{"\n\n"}To
                record a song:{"\n"}1. Press{" "}
            </Text>
            <Text style={styles.emph}>Record</Text>
            <Text>
                {" "}
                to start recording. {"\n"}2. Play your song by tapping the
                bells. {"\n"}3. Press{" "}
            </Text>
            <Text style={styles.emph}>Stop</Text>
            <Text>
                {" "}
                to stop recording.
                {"\n\n"}To hear your saved song, press{" "}
            </Text>
            <Text style={styles.emph}>Play song</Text>
            <Text>
                .{"\n\n"}You must be logged in to record and play back songs.
            </Text>
        </Text>
    );

    return (
        <Bells
            type="makeMusic"
            numPairs={0}
            numRows={8}
            title="Make music"
            instructions={instructions}
        />
    );
}

const styles = StyleSheet.create({
    emph: {
        fontWeight: "bold",
    },
});
