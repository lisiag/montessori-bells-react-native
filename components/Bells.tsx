import React, { useRef, useState } from 'react';
import { Dimensions, Animated, StyleSheet, PanResponder, PanResponderInstance, TouchableWithoutFeedback } from "react-native";
import { Icon } from 'react-native-elements';
import { View } from '../components/Themed';

const BELLSIZE = 140;
/* the vertical gap between bells before they are dragged */
const GAP = 10;
/* Use the screen width to work out the placement of the bells. In the future, if this app is
   deployed not just for mobile devices but also for web, this will need to be modified so that on a
   larger device such as laptop, the bells placement doesn't use the entire width of the screen but
   only a portion in the centre */
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
/* The position of top for the top bell in each column */
const TOPSTARTPOS = -5;
/* The position of top for the current bell being drawn */
let bellTop = TOPSTARTPOS;
/* The furthest left/up/right a bell can be dragged */
const LEFTBOUND = -15;
const TOPBOUND = -9;
const RIGHTBOUND = screenWidth + 15;

export default function Bells() {
    const numRows = 3;
    const notes = [3, 7, 2];
    const notesSorted = [2, 3, 7];
    const rowIndices = [0, 1, 2];
    const type = "match";
    const numPairs = 1;
    /* The furthest down a bell can be dragged */
    const BOTTOMBOUND = Math.max(screenHeight - (BELLSIZE) + 30, (numRows + 1) * (BELLSIZE + GAP));

    let pans: Array<Animated.ValueXY> = [];
    let panResponders: Array<PanResponderInstance> = [];

    const renderFixed = (rowIdx: number) => {
        return  (<View key={rowIdx} style={[styles.fixedBell, {top: bellTop}]} >
          <Icon
              name='notifications'
              color="dodgerblue"
              size={BELLSIZE}
          />
        </View>);
    }

    const renderFixedBells = () => {
        return rowIndices.map(rowIdx => {
            bellTop = TOPSTARTPOS + rowIdx * BELLSIZE;
            return renderFixed(rowIdx);
        });
    }

    const renderDraggable = (rowIdx: number) => {
        pans.push(useRef(new Animated.ValueXY({x: -11, y: TOPSTARTPOS})).current);
        panResponders.push(
            useRef(
                PanResponder.create({
                    /* onStartShouldSetPanResponder: () => true, */
                    onMoveShouldSetPanResponder: () => true,
                    onPanResponderGrant: () => {
                        pans[rowIdx].setOffset({
                            x: (pans[rowIdx].x as any)._value,
                            y: (pans[rowIdx].y as any)._value
                        });
                    },
                    onPanResponderMove: Animated.event(
                        [
                            null,
                            { dx: pans[rowIdx].x, dy: pans[rowIdx].y }
                        ],
                        { useNativeDriver: false }
                    ),
                    onPanResponderRelease: () => {
                        pans[rowIdx].flattenOffset();
                    }
                })
            ).current
        );

        return (
            <Animated.View key={rowIdx}
                           style={[
                               styles.draggable,
                               pans[rowIdx].getLayout()
                           ]}
                           {...panResponders[rowIdx].panHandlers}
            >
              <TouchableWithoutFeedback onPress={() => {
                  console.log("onPress");
                  alert('You tapped a bell!')
              }}>
                <Icon
                    name='notifications'
                    color="limegreen"
                    size={BELLSIZE}
                />
              </TouchableWithoutFeedback>
            </Animated.View>
        );
    }

    const renderDraggables = () => {
        return rowIndices.map(rowIdx => {
            bellTop = TOPSTARTPOS + rowIdx * BELLSIZE;
            return renderDraggable(rowIdx);
        });
    }

    return (
        <View style={{flex: 1}}>
          { renderFixedBells() }
          { renderDraggables() }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fixedBell: {
        position: 'absolute',
        left: screenWidth - (BELLSIZE + GAP) + 20,
    },
    draggable: {
        width: BELLSIZE,
        height: BELLSIZE,
    }
});
