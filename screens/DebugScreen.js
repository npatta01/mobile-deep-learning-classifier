import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,

} from 'react-native';


import {Button, Text, SearchBar} from 'react-native-elements';


import {ImageManipulator} from 'expo';

import {ApiService} from "../api";


export default class DebugScreen extends React.Component {
    static navigationOptions = {
        title: "Debug",
    };

    state = {
        image: {},
        predictionData: null,
        loading: false,
        classes: [],
        filteredClasses: []
    }

    async componentDidMount() {
        const res = await this.loadClasses()

    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.titleContainer}>

                    </View>

                    <View>
                        <SearchBar
                            onChangeText={this._onFilterClasses}
                            onClear={this._onFilterClasses}
                            placeholder='Type Here...'/>
                    </View>

                    <View style={styles.actionsContainer}>

                        <View style={styles.callToActionContainer}>
                            <Button title="Test" onPress={this._onWake}/>

                        </View>

                    </View>


                    <View style={styles.predictionsContainer}>
                        {this.renderClasses()}
                    </View>

                </View>

            </ScrollView>
        );
    }

    _updateState = async (result) => {

        const resizedResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [{resize: {width: 400}}],
            {compress: 0.7}
        );

        console.log(resizedResult)

        this.setState({image: {uri: resizedResult.uri}, loading: true});
        await this._classifyImage(resizedResult.uri)
    }

    renderClasses() {

        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#0000ff"/>
        } else if (this.state.classes) {
            return (
                <View style={styles.predictionsContentContainer}>
                    <Text h2>Classes</Text>
                    <View>
                        {this.state.filteredClasses.map(p => {
                            return (
                                <View key={p} style={styles.predictionRow}>
                                    <Text>{p}</Text>
                                </View>
                            );
                        })}
                    </View>

                </View>
            )
        } else {
            return null
        }
    }

    _onWake = async () => {
        this.setState({loading: true});
        try {
            await ApiService.ping();

            alert("Server is up")

        } catch (e) {
            alert(e);
            console.log(e)
        } finally {
            this.setState({loading: false});
        }
    }

    _onFilterClasses = (text) => {
        const t = text.toLowerCase()
        const filteredClasses = this.state.classes.filter((c) => c.startsWith(t));

        this.setState({filteredClasses: filteredClasses});
    }


    loadClasses = async () => {
        this.setState({loading: true});
        try {

            const classes = await ApiService.loadClasses();
            this.setState({classes: classes, filteredClasses: classes});

        } catch (e) {
            alert(e)
            console.log(e)
        } finally {
            this.setState({loading: false});
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // paddingTop: 10,

    },

    contentContainer: {
        paddingTop: 10,
        marginTop: 5,
    },
    titleContainer: {
        alignItems: 'center',
        //marginTop: 10,
        flex: 2,
        //  backgroundColor: "red",
        justifyContent: 'center',
    },
    actionsContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',

    },
    callToActionContainer: {
        flex: 1,
        flexDirection: "row"
    },
    feedBackContainer: {
        flex: 1,
    },

    feedBackActionsContainer: {
        flex: 1,
        flexDirection: "row"
    },

    predictionsContainer: {
        flex: 4,
        // alignItems: "flex-start",
        // flexShrink: 2,
        //  backgroundColor: "red",
        padding: 10,
        justifyContent: 'center',

    },

    predictionsContentContainer: {
        flex: 4,
        // alignItems: "flex-start",
        // flexShrink: 2,
        //  backgroundColor: "red",
        padding: 10,
        //justifyContent: 'center',
        //alignItems: 'center',

    },

    predictionRow: {
        //flex: 1,
        flexDirection: "row",
        //  alignItems: "flex-end",
        // borderColor: "red",
        // backgroundColor: "green",

        justifyContent: "space-between"


    },

    predictionRowCategory: {
        flex: 1,
        justifyContent: "space-between"
    },

    predictionRowLabel: {
        flex: 1,
        justifyContent: "space-between"

    }
});
