import * as React from "react";
import { Text } from "../components/Themed";
import Bells from "../components/Bells";

export default function Match({ route }: any) {
    const { level } = route.params;
    const title = "Pair the matching bells";
    let numRows: number;

    switch (level) {
        case 1:
        case 3:
            numRows = 3;
            break;
        default:
            numRows = 8;
    }

    /* The instructions that are displayed in a modal when the user presses the 'instructions'
       button */
    const instructions = () => {
        let sing_plural: string;
        if (level === 1) {
            sing_plural = "Tap each bell to play its note. Drag the ";
        } else {
            sing_plural = "Tap each bell to play its note. Drag each ";
        }
        return (
            <Text style={{ padding: 20 }}>
                <Text>{sing_plural!}</Text>
                <Text style={{ color: "limegreen" }}>green</Text>
                <Text> bell and drop it next to the </Text>
                <Text style={{ color: "dodgerblue" }}>blue</Text>
                <Text> bell that plays the same note.</Text>
            </Text>
        );
    };

    return (
        <Bells
            type="match"
            numPairs={level}
            numRows={numRows}
            title={title}
            instructions={instructions()}
        />
    );
}
