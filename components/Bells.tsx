import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Draggable from 'react-native-draggable';
import { Text, View, ScrollView, SafeAreaView } from '../components/Themed';

export default function Bells() {
    const notes = [3, 7, 2];
    const notesSorted = [2, 3, 7];
    const indices = [0, 1, 2];
    const numColumns = 3;

    const type = "match";
    const numPairs = 1;

    const renderBell = (index: number) => {
        if (numPairs !== 1 || index === 1) {
            return (<Draggable x={50} y={50} >
              <Icon
                  name='notifications'
                  color='#517fa4'
                  size={140}
              />
            </Draggable>);
        }
    }

    const arrangeBells = () => {
        if (type === "match") {
            /* Arrange the bells: on the left in random order; on the right sorted high to low
             */
            return indices.map(index =>
                {renderBell(index)});
        } else if (type === "sort") {
        } else {
            /* type is make_music
               Arrange the bells from high to low down the centre column of of the grid*/
        }
    }

    const tmpRender = () => {
        return indices.map(index => {
            let x, y, col;
            if (index === 0) {
                x  = y = 0;
                col = "limegreen";
            } else if (index === 1) {
                x = y = 130;
                col = "blue";
            } else {
                x = y = 280;
                col = "dodgerblue";
            }

            return(<Draggable x={x} y={y} >
              <Icon
                  name='notifications'
                  color={col}
                  size={140}
              />
            </Draggable>);
        });
    }

    const tmpRender2 = () => {
        return(
            <View style={styles.row}>
            <View style={styles.col}>
            <Draggable >
            <Icon
            name='notifications'
            color="dodgerblue"
            size={140}
            />
            </Draggable>
            </View>
            <View style={styles.col}>
              <Draggable >
                <Icon
                    name='notifications'
                    color="dodgerblue"
                    size={140}
                />
              </Draggable>
            </View>
            <View style={styles.col}>
              <Draggable >
                <Icon
                    name='notifications'
                    color="dodgerblue"
                    size={140}
                />
              </Draggable>
            </View>
            </View>
        );
    }

    return (
        <View >
          <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/>
          <Draggable x={200} y={300} renderColor='red' renderText='B'/>
          <Draggable/>
            {tmpRender2()}
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
    }

});
