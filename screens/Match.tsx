import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, View, ScrollView, SafeAreaView } from '../components/Themed';
import Bells from '../components/Bells';

export default function Match({navigation}: any) {
    const level = 1;
    const instructions = "some instructions about what to do";
    const title = "Pair the matching bells";
    const numRows = 3;

    return (
        /* type="match"
           numPairs={level}
           numRows={numRows}
           instructions={instructions}
           title={title} */
        <Bells

        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: '100%',
        paddingLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    item: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
