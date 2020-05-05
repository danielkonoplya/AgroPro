import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        email: "",
        displayName: ""
    }

    componentDidMount(){
        const{email, displayName} = firebase.auth().currentUser

        this.setState({email, displayName});
    }

    signOutUser= () => {
        firebase.auth().signOut();
    }

    render() {
        return( 
            <View style={styles.container}>
                 <TouchableOpacity  onPress={ ()=>this.props.navigation.navigate("Chat")} >
                   
                </TouchableOpacity>
                <Text style={{marginLeft: 100, fontSize: 23}}>Добрый день, {this.state.displayName}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text  style={{color: "#ffffff", fontSize: 23}} onPress={ ()=>this.props.navigation.navigate("Forecast")}>Прогноз урожая</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={{color: "#ffffff", fontSize: 23}} onPress={ ()=>this.props.navigation.navigate("Wheather")} >Прогноз погоды</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ ()=>this.props.navigation.navigate("Vehicles")}>
                    <Text style={{color: "#ffffff", fontSize: 23}}>Техника</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color: "#ffffff", fontSize: 23}} >Состояние почвы</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderRadius: 10, marginTop: 35, alignItems: "center",justifyContent: "center", marginLeft: 150, width: 90,height:52 , backgroundColor: "#246ac7"}} onPress={this.signOutUser}>
                    <Text style={{fontSize: 15, color: "#FFF",justifyContent:"center", alignContent:"center",}}> Выйти</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles =  StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        marginBottom:50
      
    },
    button:{
        marginLeft: 35,
        width:350,
        paddingBottom: 25,
        padding: 15,
        marginTop: 35, 
        backgroundColor: "#246ac7",
        borderRadius: 10,
        alignItems: "center",
        height: 80,
        justifyContent: "center"
    },
    textBottom:{
        color: "#141823",
        fontSize: 30
    },
    imagestyle:{
        marginBottom: 20,
        marginLeft: 390,
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500/2,
        position: "absolute",
        left: -120,
        top: -20,
        backgroundColor: "#FFF"

    }
});