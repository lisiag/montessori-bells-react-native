/** Bells.tsx. Lay out the bells and the other components (toolbars, instructions) required for each
of the bells activities: match bells, sort bells, make music **/

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
    ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import { Util } from "../../business/util";
import { View, Text } from "../components/Themed";
import { headerHeight } from "../constants/constants";
import { notifyNoteListener } from "../../business/note";
import { NoteTime } from "../../business/song";

// FIXME example mock code for recording song
/*
   startRecording.onclick(() => {
   song = recordSong();
   });

   songTitleForm.onsubmit(async () => {
   await songSaver.saveSong("myBellsSong", song);
   })
*/

/* Use the screen width to work out the placement of the bells. In the future, if this app is
   deployed not just for mobile devices but also for web, this will need to be modified so that on a
   larger device such as laptop, the bells placement doesn't use the entire width of the screen but
   only a portion in the centre */
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
/* The furthest left/up/right a bell can be dragged */
const LEFTBOUND = -15;
const TOPBOUND = -9;
const RIGHTBOUND = screenWidth + 15;

/* Sound files */
const mp3s = (() => {
    const C4 = require("../../assets/sounds/pianoC4.mp3");
    const D4 = require("../../assets/sounds/pianoD4.mp3");
    const E4 = require("../../assets/sounds/pianoE4.mp3");
    const F4 = require("../../assets/sounds/pianoF4.mp3");
    const G4 = require("../../assets/sounds/pianoG4.mp3");
    const A4 = require("../../assets/sounds/pianoA4.mp3");
    const B4 = require("../../assets/sounds/pianoB4.mp3");
    const C5 = require("../../assets/sounds/pianoC5.mp3");
    return [C4, D4, E4, F4, G4, A4, B4, C5];
})();

/* Eight colors used to correspond to the eight notes. Used to color the bells when the user
   clicks "Show answers" so bells with the same note have the same color */
const answerColors = [
    "lightseagreen",
    "gold",
    "blue",
    "red",
    "blueviolet",
    "deepskyblue",
    "darkorange",
    "magenta",
];

/* Each time the activity is played, some sound files from 'mp3s' are randomly selected (or all are
selected in activities where the whole octave is used). The index of each selected 'mp3s' element is
stored in the 'notes' array */
let notes: number[] = [];

export interface BellsProps {
    type: string /* Are these bells wanted for a matching activity, sorting activity or making music activity? */;
    numPairs: number /* the number of pairs of bells for user to match; i.e. the number of bells in the lefthand col */;
    numRows: number /* the number of rows of bells; the number of bells in the righthand column */;
    title: string;
}

/* Lay out the bells and other components required for the bells activities */
export default function Bells(props: BellsProps) {
    /* After the user drags or presses a bell or clicks the 'Instructions' or 'Show answers'
       buttons, the bells should keep their locations on the screen and their notes. After the user
       clicks 'Play again', the bells should be reset to their original locations on the screen and
       given new random notes */
    const [needsReset, setNeedsReset] = useState({ value: true });

    /* Is the instructions modal displaying? */
    const [modalVisible, setModalVisible] = useState(false);

    /* Are the colored borders indicating answers showing? */
    const [answersShowing, setAnswersShowing] = useState(false);

    /* In the 'Make music' activity, is the app recording the music the user is making? */
    const [isRecording, setIsRecording] = useState(false);

    let BELLSIZE = 140;
    let leftRightMargin = 0;
    /* If the activity displays a whole octave of 8 bells, keep the bells small enough so they all
       fit on the screen because scrolling during the activity detracts from the user experience;
       and increase the margin on the left and right sides of the screen for a nicer appearance */
    if (props.numRows == 8) {
        BELLSIZE = (screenHeight - headerHeight() - 40) / 8;
        leftRightMargin = 30;
    }

    /* The furthest down a bell can be dragged */
    const BOTTOMBOUND = Math.max(
        screenHeight - BELLSIZE + 30,
        (props.numRows + 1) * BELLSIZE
    );

    /* The position of top for the top bell in each column */
    const TOPSTARTPOS = -5;

    /* The position of top for the current bell being drawn */
    let bellTop = TOPSTARTPOS;

    /* Collections of handlers of touches and gestures by the user */
    const pans: Array<Animated.ValueXY | null> = [];
    const panResponders: Array<PanResponderInstance | null> = [];

    /*
       numRows random notes from the scale of C major
     */
    if (needsReset.value) {
        notes = Util.getRandoms(8, props.numRows);
    }

    /* Sort bells from high to low for the righthand column */
    const notesSorted = notes.slice().sort().reverse();

    /* Create a list of indices so that list.map() can access both "notes" and "notesSorted" arrays */
    let rowIndices: number[] = [];
    for (let i = 0; i < notes.length; ++i) {
        rowIndices.push(i);
    }

    /* set up for recording the user's song in 'Make music' activity */
    let song: NoteTime[] = [];

    /* Render a fixed bell - a bell that can't be dragged */
    const renderFixed = (rowIdx: number) => {
        return (
            <View
                key={rowIdx}
                style={{
                    position: "absolute",
                    left: screenWidth - (BELLSIZE + leftRightMargin) + 20,
                    top: bellTop,
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        playSound(notesSorted[rowIdx]);
                    }}
                >
                    <Icon
                        name="notifications"
                        color={
                            answersShowing
                                ? answerColors[notesSorted[rowIdx]]
                                : "dodgerblue"
                        }
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
            notifyNoteListener(note);
            await Audio.Sound.createAsync(mp3, {
                shouldPlay: true,
            });
        } catch (error) {
            console.error(error);
        }
    }

    /* Render a draggable bell - a bell that can be dragged */
    const renderDraggable = (rowIdx: number) => {
        /* If numPairs is 1, only render a draggable at rowIdx 0. If numPairs is greater than 1 (3
           or 8), render a draggable in every row */
        if (props.numPairs == 1 && rowIdx != 0) {
            return;
        }

        const x = -11 + leftRightMargin;

        /* Weirdly, even though this code is reached after user opens and closes 'Instructions'
           modal, and 'pans' is emptied and repopulated, somehow it is repopulated with bellXY elements
           that keep the previous bellXY elements' layout - they don't get reset with the original pos
           (-11, TOPSTARTPOS) here. This magic is fortunate, as keeping the prev bells' layout is the
           desired behaviour in that case. It may be to do with React Native's use of "slots"; perhaps
           useRef *sets* the first time it is called, and *gets* on subsequent calls? */
        const bellXY = useRef(new Animated.ValueXY({ x, y: TOPSTARTPOS }));

        /* When 'Play again' button is pressed, reset bell's x and y to the start position */
        if (needsReset.value) {
            bellXY.current.setValue({ x, y: TOPSTARTPOS });
        }

        pans.push(bellXY.current);

        panResponders.push(
            useRef(
                PanResponder.create({
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
                style={[
                    { width: BELLSIZE, height: BELLSIZE },
                    pans[rowIdx]!.getLayout(),
                ]}
                {...panResponders[rowIdx]!.panHandlers}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        playSound(notes[rowIdx]);
                    }}
                >
                    <Icon
                        name="notifications"
                        color={
                            answersShowing
                                ? answerColors[notes[rowIdx]]
                                : "limegreen"
                        }
                        size={BELLSIZE}
                    />
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    };

    const renderDraggables = () => {
        return rowIndices.map((rowIdx) => {
            return renderDraggable(rowIdx);
        });
    };

    /* The instructions that are displayed in a modal when the user presses the 'instructions'
       button */
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

    const onModalClose = () => {
        setAnswersShowing(false);
        setModalVisible(false);
    };

    const instructionsModal = () => {
        return (
            <Modal visible={modalVisible}>
                {instructions()}
                <View style={styles.button}>
                    <Button onPress={onModalClose} title="Close" color="#000" />
                </View>
            </Modal>
        );
    };

    const onPlayAgainPress = () => {
        setAnswersShowing(false);
        /* change state so that the component is re-rendered, and set needsReset to true so the
           bells return to their original positions and a new random collection of notes is
           generated */
        setNeedsReset({ value: true });
    };

    const showToastWithGravity = (message: string) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP
        );
    };

    const record = () => {};

    async function handleRecordButtonPress() {
        if (!isRecording) {
            /* start recording */
            /* record song */
            record();
            showToastWithGravity("Recording");
        } else {
            /* Stop recording */
            showToastWithGravity("Recording finished");
            /* Save recording */
            /* Clear recording ready for user's next song */
            song = [];
        }
        setIsRecording(!isRecording);
    }

    const matchToolbar = () => {
        return (
            <View style={styles.matchToolbar}>
                <Button
                    onPress={onPlayAgainPress}
                    title="Play again"
                    color="#000"
                />
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Instructions"
                    color="#000"
                />
                <Button
                    onPress={() => setAnswersShowing(!answersShowing)}
                    title={answersShowing ? "Hide answers" : "Show answers"}
                    color="#000"
                />
            </View>
        );
    };

    const makeMusicToolbar = () => {
        /* type is "makeMusic" */
        return (
            <View style={styles.makeMusicToolbar}>
                <Button
                    onPress={() => handleRecordButtonPress()}
                    title={isRecording ? "Stop" : "Record"}
                    color="#000"
                />
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Instructions"
                    color="#000"
                />
            </View>
        );
    };

    let ret;

    if (props.type === "match") {
        ret = (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {renderFixedBells()}
                    {renderDraggables()}
                </View>
                {instructionsModal()}
                {matchToolbar()}
            </View>
        );
    } else {
        ret = (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>{renderFixedBells()}</View>
                {instructionsModal()}
                {makeMusicToolbar()}
            </View>
        );
    }

    /* set needsReset to false so that the bells' notes and positions don't reset after the user
       drags a bell to a new position or presses the 'Instructions' or 'Show answers' buttons */
    needsReset.value = false;

    return ret;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    matchToolbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    makeMusicToolbar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
    },
    button: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
});
