import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import * as firebase from  'firebase';

export default class LoadingScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        email: "",
        password: "",
        errorMessage: null
    };
   
    
    handleLogin = () => {
        const {email,  password}= this.state 

        firebase.auth().signInWithEmailAndPassword(email, password ).catch(error => this.setState({errorMessage: error.message}))
    };
    
    
    
    render() {
        return( 
            
            <View style={styles.container}>
                 
                <View style={styles.circle}/>
                <TouchableOpacity  onPress={ ()=>this.props.navigation.navigate("Chat")} >
                   
                </TouchableOpacity>
            
                <Text style={styles.greeting}>
                {'Agro Pro'}
                </Text>
                

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.forms}>
                    <View>
                        <Text style={styles.inputTitle}></Text>
                        <TextInput
                        placeholder="Email" 
                        style={styles.input}
                        autoCapitalize='none' 
                        onChangeText={email => this.setState({ email})}
                        value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 0}}>
                        <Text style={styles.inputTitle}></Text>
                        <TextInput 
                        placeholder="Password"
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize='none'
                        onChangeText={password => this.setState({password })}
                        value = {this.state.password}
                        ></TextInput>
            </View>
                    </View>
                    <View style={styles.containerbottom}> 
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.handleLogin}>
                        <Text style={{color: "#FFF", fontWeight: "500"}}>Войти</Text>
                    </TouchableOpacity>
                    </View>
                    <View  style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} 
                    onPress={ ()=>this.props.navigation.navigate("Register") }
                    >
                        
                            <Text style={{color: "#FFF", fontWeight: "500"}}>Регистрация</Text>
                        

                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            
        );
    }

}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f5f6"
    },
    containerbottom:{
      
        marginLeft: 30,
        marginBottom: 250,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        
        flex: 1
    },
    greeting:{
        marginTop: 50,
        fontSize: 40,
        fontWeight: "600",
        textAlign: "center"
    },
    errorMessage:{
        height:72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 38
    },
    form:{
        
        
        

    },
    inputTitle:{
        color: "#8a8f9e",
        fontSize: 15,
        textTransform: "uppercase",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 35
        
    },
    input: {
        borderColor: "#246ac7", borderWidth: 3,  marginBottom: 5,
        width:350,
        paddingLeft: 10,
        height: 60,
        marginLeft: 35,
        fontSize: 15, 
        color: "#161F3D",
        
    },
    button:{
        
        borderRadius: 25,
        width: 100,
        marginHorizontal: 38, 
        backgroundColor: "#246ac7",
        alignItems: "center",
        height: 52,
        justifyContent: "center"
    },
    error:{
        color: "#c7244f",
        fontSize: 13, 
        fontWeight: "600",
        textAlign: "center"
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500/2,
        position: "absolute",
        left: -120,
        top: -20,
        backgroundColor: "#FFF"

    },
    buttonTop: {
        marginLeft: 370,
     
    },
    textTop:{
        fontSize: 30
    },
    imagestyle:{
     
        marginLeft: 390,
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
});