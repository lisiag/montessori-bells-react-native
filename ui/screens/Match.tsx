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

    return (
        <Bells type="match" numPairs={level} numRows={numRows} title={title} />
    );
}
