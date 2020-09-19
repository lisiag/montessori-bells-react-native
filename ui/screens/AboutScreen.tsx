import * as React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, View } from "../components/Themed";
import * as Linking from "expo-linking";

export default function AboutScreen() {
    return (
        <View style={{ padding: 20, flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.paragraph}>
                    <Text>
                        This Montessori Bells app is developed by{" "}
                        <Text
                            onPress={() =>
                                Linking.openURL(
                                    "https://www.linkedin.com/in/lisia-grocott-7996491a0/"
                                )
                            }
                            style={{ color: "blue" }}
                        >
                            Lisia Grocott
                        </Text>{" "}
                        and based on activities devised by Maria Montessori.
                        Although an app is no replacement for the tactile and
                        kinaesthetic experience of working with real Montessori
                        bells where they are available, the real bells are one
                        of the most expensive pieces of equipment in the
                        Montessori curriculum and as such are out of reach for
                        many Montessori classrooms and homeschools. This app is
                        intended to bring the Montessori bells activities to
                        children who would otherwise not experience them.
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>
                        This app is intended for children age three years and
                        up, under adult supervision.
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>
                        We recommend the adult explore the app before presenting
                        the activities to the child. They are designed to be
                        presented to the child in the same way as the real
                        Montessori bells and other Montessori sensorial
                        activities. Usually, the adult and child will be seated
                        comfortably at a low table, the adult sitting on the
                        child's right if the adult is right-handed. The adult
                        will say something like "Today, I'm going to show you
                        the <Text style={styles.em}>matching bells</Text>{" "}
                        activity. It's my turn first and then you can have a
                        turn." The adult will then slowly demonstrate the
                        activity, mostly without saying anything, but possibly
                        pausing at some point to say, "I'm listening to hear
                        which blue bell is the same as the green bell. Then the
                        adult invites the child to have a turn.
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>
                        If the child doesn't match the bells correctly, the
                        adult does not usually correct the child but instead
                        demonstrates the activity again, either immediately or
                        later, perhaps emphasising the aspect the child
                        misunderstood. In a Montessori environment, this app's{" "}
                        <Text style={styles.em}>Show answers</Text> feature
                        would not be used. For more information on how to
                        present Montessori bells activities to children, see a
                        Montessori manual (often called an album) on the
                        sensorial activities, such as:
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text
                        onPress={() =>
                            Linking.openURL(
                                "http://www.infomontessori.com/sensorial/auditory-sense-bells.htm"
                            )
                        }
                        style={{ color: "blue" }}
                    >
                        Montessori Primary Guide
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text
                        onPress={() =>
                            Linking.openURL(
                                "https://www.montessorialbum.com/montessori/index.php/Bells"
                            )
                        }
                        style={{ color: "blue" }}
                    >
                        Montessori Album
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>
                        <Text>Or see Maria Montessori's book, </Text>
                        <Text style={styles.em}>
                            The Discovery of the Child.
                        </Text>
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    <Text>
                        <Text>
                            For general information on Montessori education, a
                            great place to start (and a short read) is{" "}
                        </Text>
                        <Text
                            onPress={() =>
                                Linking.openURL(
                                    "http://www.gutenberg.org/ebooks/29635"
                                )
                            }
                            style={{ color: "blue" }}
                        >
                            Montessori's Own Handbook
                        </Text>
                        <Text>, available for free on Project Gutenberg.</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    em: {
        fontStyle: "italic",
    },
    paragraph: {
        paddingBottom: 10,
    },
});
