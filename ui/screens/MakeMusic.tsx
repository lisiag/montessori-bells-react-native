import * as React from "react";
import Bells from "../components/Bells";

export default function MakeMusic() {
    return (
        <Bells type="makeMusic" numPairs={0} numRows={8} title="Make music" />
    );
}
