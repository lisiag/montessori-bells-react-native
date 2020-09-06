import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Draggable from 'react-native-draggable';
import { Text, View, ScrollView, SafeAreaView } from '../components/Themed';

const BELLSIZE = 140;

/* Use the screen width to work out the placement of the bells. In the future, if this app is
deployed not just for mobile devices but also for web, this will need to be modified so that on a
larger device such as laptop, the bells placement doesn't use the entire width of the screen but
only a portion in the centre */
const screenWidth = Math.round(Dimensions.get('window').width);

export default function Bells() {
    const notes = [3, 7, 2];
    const notesSorted = [2, 3, 7];
    const rowIndices = [0, 1, 2];

    const type = "match";
    const numPairs = 1;

    const renderDraggable = (rowIdx: number, x: number, y: number) => {
        if (numPairs !== 1 || rowIdx === 1) {
        return (<View key={rowIdx}>
          <Draggable x={x} y={y} minX={0} minY={0}>
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
            const y = rowIdx * (BELLSIZE + 10);
            return renderDraggable(rowIdx, x, y);
        });
    }

    const renderFixed = (rowIdx: number, x: number, y: number) => {
        return  (<View key={rowIdx}>
          <Draggable x={x} y={y} minX={0} minY={0} disabled={true}>
            <Icon
                name='notifications'
                color="dodgerblue"
                size={BELLSIZE}
            />
          </Draggable>
        </View>);
    }

    const renderFixedBells = () => {
        const x = screenWidth - (BELLSIZE + 10);
        return rowIndices.map(rowIdx => {
            const y = rowIdx * (BELLSIZE + 10);
            return renderFixed(rowIdx, x, y);
        });
    }

    return (
        <View >
          <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/>
          <Draggable x={200} y={300} renderColor='red' renderText='B'/>
          <Draggable/>
          {renderFixedBells()}
          {renderDraggableBells()}
        </View>
    );
}

const styles = StyleSheet.create({
});
