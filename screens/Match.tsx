import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, View, ScrollView, SafeAreaView } from '../components/Themed';

export default function Match({navigation}: any) {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scroll}>
            <Text style={styles.item}>This is the Match page</Text>
          </ScrollView>
        </SafeAreaView>
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
