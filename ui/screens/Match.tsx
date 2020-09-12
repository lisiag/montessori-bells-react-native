import * as React from "react";
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

    let sing_plural;
    if (level === 1) {
        sing_plural = "Tap each bell to play its note. Drag the ";
    } else {
        sing_plural = "Tap each bell to play its note. Drag each ";
    }
    const instructions = React.createElement(
        "div",
        {},
        sing_plural,
        React.createElement("span", { id: "draggableColor" }, "green"),
        " bell and drop it next to the ",
        React.createElement("span", { id: "fixedBellColor" }, "blue"),
        " bell that plays the same note."
    );

    return (
        <Bells
            type="match"
            numPairs={level}
            numRows={numRows}
            instructions={instructions}
            title={title}
        />
    );
}
