import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Draggable from 'react-native-draggable';
import { Text, View, ScrollView, SafeAreaView } from '../components/Themed';

export default function Bells() {
    const notes = [3, 7, 2];
    const notesSorted = [2, 3, 7];
    const rowIndices = [0, 1, 2];
    const colIndices = [0, 1, 2];

    const type = "match";
    const numPairs = 1;

    const renderCols = (rowIdx: number) => {
        let left: any;
        const space = (<View style={styles.col}>
          <Icon
              name='notifications'
              color="red"
              size={140}
          />
        </View>);

        if (numPairs !== 1 || rowIdx === 1) {
            left = (<View style={styles.draggableCol}>
              <Draggable minX={0} minY={0} z={2000} >
                <Icon
                    name='notifications'
                    color="limegreen"
                    size={140}
                />
              </Draggable>
            </View>)
        } else {
            left = space;
        }


        const fixed = (<View style={styles.col}>
          <Draggable minX={0} minY={0} disabled={true}>
            <Icon
                name='notifications'
                color="dodgerblue"
                size={140}
            />
          </Draggable>
        </View>);

        return (
            <View style={styles.row}>
              {left}
              {space}
              {fixed}
            </View>
        );
    }

        const renderRow = (rowIdx: number) => {
            return (
                <View key={rowIdx}>
                  {renderCols(rowIdx)}
                </View>
            );
    }

    const renderRows = () => {
        return rowIndices.map(rowIdx => renderRow(rowIdx));
    }

    return (
        <View >
          <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/>
          <Draggable x={200} y={300} renderColor='red' renderText='B'/>
          <Draggable/>
            {renderRows()}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    col: {
        flex: 1,
    },
    draggableCol: {
        flex: 1,
        zIndex: 33,
    }
});
