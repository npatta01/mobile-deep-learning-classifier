import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import {description} from "../config"
import Markdown from 'react-native-markdown-renderer';


export default class AboutScreen extends React.Component {
    static navigationOptions = {
        title: "About"
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.titleContainer}>

                    </View>

                    <View style={styles.contentContainer}>
                        <Markdown style={styles}>{description}</Markdown>
                    </View>

                </View>

            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        paddingTop: 10,

    },

    contentContainer: {
        paddingTop: 10,
        marginTop: 5,
        paddingLeft: 30,
        paddingRight: 30
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        flex: 2,
        justifyContent: 'center',
    },

});
