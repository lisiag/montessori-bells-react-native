import { Audio } from "expo-av";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    PanResponderInstance,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { Util } from "../../business/util";
import { View, ScrollView, Text } from "../components/Themed";

const BELLSIZE = 140;
/* the vertical gap between bells before they are dragged */
const GAP = 10;
/* Use the screen width to work out the placement of the bells. In the future, if this app is
   deployed not just for mobile devices but also for web, this will need to be modified so that on a
   larger device such as laptop, the bells placement doesn't use the entire width of the screen but
   only a portion in the centre */
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
/* The position of top for the top bell in each column */
const TOPSTARTPOS = -5;
/* The position of top for the current bell being drawn */
let bellTop = TOPSTARTPOS;
/* The furthest left/up/right a bell can be dragged */
const LEFTBOUND = -15;
const TOPBOUND = -9;
const RIGHTBOUND = screenWidth + 15;

export interface BellsProps {
    type: string /* Are these bells wanted for a matching activity, sorting activity or making music activity? */;
    numPairs: number /* the number of pairs of bells for user to match; i.e. the number of bells in the lefthand col */;
    numRows: number /* the number of rows of bells; the number of bells in the righthand column */;
    title: string;
}

export default function Bells(props: BellsProps) {
    /* The furthest down a bell can be dragged */
    const BOTTOMBOUND = Math.max(
        screenHeight - BELLSIZE + 30,
        (props.numRows + 1) * (BELLSIZE + GAP)
    );

    let pans: Array<Animated.ValueXY | null> = [];
    let panResponders: Array<PanResponderInstance | null> = [];

    /*
       Get random notes for the bells in the righthand column
     */
    const notes = Util.getRandoms(8, props.numRows);

    /* Sort bells from high to low for the righthand column */
    const notesSorted = notes.slice().sort().reverse();

    /* Create a list of indices so that list.map() can access both "notes" and "notesSorted" arrays */
    let rowIndices: number[] = [];
    for (let i = 0; i < notes.length; ++i) {
        rowIndices.push(i);
    }

    /* Is the instructions modal displaying? */
    const [modalVisible, setModalVisible] = useState(false);

    const C4 = require("../../assets/sounds/pianoC4.mp3");
    const D4 = require("../../assets/sounds/pianoD4.mp3");
    const E4 = require("../../assets/sounds/pianoE4.mp3");
    const F4 = require("../../assets/sounds/pianoF4.mp3");
    const G4 = require("../../assets/sounds/pianoG4.mp3");
    const A4 = require("../../assets/sounds/pianoA4.mp3");
    const B4 = require("../../assets/sounds/pianoB4.mp3");
    const C5 = require("../../assets/sounds/pianoC5.mp3");
    const mp3s = [C4, D4, E4, F4, G4, A4, B4, C5];

    const renderFixed = (rowIdx: number) => {
        return (
            <View key={rowIdx} style={[styles.fixedBell, { top: bellTop }]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        playSound(notesSorted[rowIdx]);
                    }}
                >
                    <Icon
                        name="notifications"
                        color="dodgerblue"
                        size={BELLSIZE}
                    />
                </TouchableWithoutFeedback>
            </View>
        );
    };

    const renderFixedBells = () => {
        return rowIndices.map((rowIdx) => {
            bellTop = TOPSTARTPOS + rowIdx * BELLSIZE;
            return renderFixed(rowIdx);
        });
    };

    async function playSound(note: number) {
        const mp3 = mp3s[note];
        try {
            await Audio.Sound.createAsync(mp3, {
                shouldPlay: true,
            });
        } catch (error) {
            console.error(error);
        }
    }

    const renderDraggable = (rowIdx: number) => {
        /* If numPairs is 1, only render a draggable at rowIdx 0. If numPairs is greater than 1 (3
           or 8), render a draggable in every row */
        if (props.numPairs == 1 && rowIdx != 0) {
            return;
        }

        pans.push(
            useRef(new Animated.ValueXY({ x: -11, y: TOPSTARTPOS })).current
        );
        panResponders.push(
            useRef(
                PanResponder.create({
                    /* onStartShouldSetPanResponder: () => true, */
                    onMoveShouldSetPanResponder: () => true,
                    onPanResponderGrant: () => {
                        pans[rowIdx]!.setOffset({
                            x: (pans[rowIdx]!.x as any)._value,
                            y: (pans[rowIdx]!.y as any)._value,
                        });
                    },
                    onPanResponderMove: Animated.event(
                        [null, { dx: pans[rowIdx]!.x, dy: pans[rowIdx]!.y }],
                        { useNativeDriver: false }
                    ),
                    onPanResponderRelease: () => {
                        pans[rowIdx]!.flattenOffset();
                    },
                })
            ).current
        );

        return (
            <Animated.View
                key={rowIdx}
                style={[styles.draggable, pans[rowIdx]!.getLayout()]}
                {...panResponders[rowIdx]!.panHandlers}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        playSound(notes[rowIdx]);
                    }}
                >
                    <Icon
                        name="notifications"
                        color="limegreen"
                        size={BELLSIZE}
                    />
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    };

    const renderDraggables = () => {
        return rowIndices.map((rowIdx) => {
            bellTop = TOPSTARTPOS + rowIdx * BELLSIZE;
            return renderDraggable(rowIdx);
        });
    };

    const instructions = () => {
        let sing_plural: string;
        if (props.numPairs === 1) {
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

    const instructionsModal = () => {
        return (
            <Modal visible={modalVisible}>
                {instructions()}
                <View style={styles.button}>
                    <Button
                        onPress={() => setModalVisible(false)}
                        title="Close"
                        color="#000"
                    />
                </View>
            </Modal>
        );
    };

    const toolbar = () => {
        return (
            <View style={styles.toolbar}>
                <Button
                    onPress={() => alert("This is a button!")}
                    title="Play again"
                    color="#000"
                />
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Instructions"
                    color="#000"
                />
                <Button
                    onPress={() => alert("This is a button!")}
                    title="Show answers"
                    color="#000"
                />
            </View>
        );
    };

    if (props.numPairs == 8) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {renderFixedBells()}
                    {renderDraggables()}
                </ScrollView>
                {toolbar()}
            </View>
        );
    } else {
        /* only 1 fixed bell displays when numPairs is 1 if ScrollView is used */
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {renderFixedBells()}
                    {renderDraggables()}
                </View>
                {instructionsModal()}
                {toolbar()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedBell: {
        position: "absolute",
        left: screenWidth - (BELLSIZE + GAP) + 20,
    },
    draggable: {
        width: BELLSIZE,
        height: BELLSIZE,
    },
    toolbar: {
        flexDirection: "row",
        backgroundColor: "gray",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
});
