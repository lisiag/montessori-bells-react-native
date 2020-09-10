import * as React from 'react';
import { Dimensions, Animated, StyleSheet, PanResponder } from "react-native";
import Draggable from 'react-native-draggable';
import { Icon } from 'react-native-elements';
import { View } from '../components/Themed';

const BELLSIZE = 140;
const GAP = 10;
/* Use the screen width to work out the placement of the bells. In the future, if this app is
   deployed not just for mobile devices but also for web, this will need to be modified so that on a
   larger device such as laptop, the bells placement doesn't use the entire width of the screen but
   only a portion in the centre */
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
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
    const BOTTOMBOUND = Math.max(screenHeight - (BELLSIZE) + 30, (numRows + 1) * (BELLSIZE + GAP));

    const renderDraggable = (rowIdx: number, x: number, y: number) => {
        if (numPairs !== 1 || rowIdx === 1) {
            return (<View key={rowIdx}>
              <Draggable x={x} y={y} minX={LEFTBOUND} minY={TOPBOUND} maxX={RIGHTBOUND} maxY={BOTTOMBOUND}>
                <Icon
                    name='notifications'
                    color="limegreen"
                    size={BELLSIZE}
                />
              </Draggable>
            </View>);
        } else {
            return;
        }
    }

    const renderDraggableBells = () => {
        const x = 0;
        return rowIndices.map(rowIdx => {
            const y = rowIdx * (BELLSIZE + GAP);
            return renderDraggable(rowIdx, x, y);
        });
    }

    const renderFixed = (rowIdx: number, x: number, y: number) => {
        return  (<View key={rowIdx}>
          <Draggable x={x} y={y}  minX={LEFTBOUND} minY={TOPBOUND} maxX={RIGHTBOUND} maxY={BOTTOMBOUND} disabled={true}>
            <Icon
                name='notifications'
                color="dodgerblue"
                size={BELLSIZE}
            />
          </Draggable>
        </View>);
    }

    const renderFixedBells = () => {
        const x = screenWidth - (BELLSIZE + GAP);
        return rowIndices.map(rowIdx => {
            const y = rowIdx * (BELLSIZE + GAP);
            return renderFixed(rowIdx, x, y);
        });
    }

    const pan = React.useRef(new Animated.ValueXY()).current;

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ]
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    return (
        <View style={styles.container}>
          <Animated.View
              style={{
                  transform: [{ translateX: pan.x }, { translateY: pan.y }]
              }}
              {...panResponder.panHandlers}
          >
            <Icon
                name='notifications'
                color="dodgerblue"
                size={BELLSIZE}
            />
          </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});
