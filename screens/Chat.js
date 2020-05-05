import React from "react";
import {View, Text,StyleSheet } from 'react-native';
import * as firebase from 'firebase';

export default class ChatScreen extends React.Component {
    state = {
        displayName: ""
    }
    componentDidMount(){
        const{displayName} = firebase.auth().currentUser

        this.setState({displayName});
    }

    
    
    
    render() {
        return( 
           <View style={styles.circle}>
               <Text>GGGG</Text>
               <Text style={{marginLeft: 100, fontSize: 23}}>Добрый день, {this.state.displayName}</Text>
           </View>
           
            );
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        marginBottom:100
      
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500/2,
        position: "absolute",
        left: 20,
        top: 300,
        backgroundColor: "#FFF"
    }
});

