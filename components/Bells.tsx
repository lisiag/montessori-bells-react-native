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



    return (
        <View >
          <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/>
          <Draggable x={200} y={300} renderColor='red' renderText='B'/>
          <Draggable/>
          <Draggable x={50} y={50} >
            <Icon
                name='notifications'
                color='#517fa4'
                size={140}
            />
          </Draggable>
        </View>
    );
}
