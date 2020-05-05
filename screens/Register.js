import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import * as firebase from  'firebase';




export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };
    
    handleSignUp = ()  => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(UserCredentials => {
            return UserCredentials.user.updateProfile({
                displayName: this.state.name
            });
        })
        .catch(error => this.setState({errorMessage: error.message}));
    };
   
    
    render() {
        return( 
            <View style={styles.container}>
                <View style={styles.circle}/>
                <Text style={styles.greeting}>
                {'Регистрация нового пользователя'}
                </Text>
                

                <View style={styles.errorMessage}>
                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.forms}>
                    <View>
                        <Text style={styles.inputTitle} ></Text>
                        <TextInput 
                        placeholder="Name"
                        style={styles.input}
                        autoCapitalize='none' 
                        onChangeText={name => this.setState({ name})}
                        value={this.state.name}
                        ></TextInput>
                    </View>



                    <View style={{marginTop: 0}}> 
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
                        placeholder="Pass"
                        style={styles.input} 
                        secureTextEntry 
                        autoCapitalize='none'
                        onChangeText={password => this.setState({password })}
                        value = {this.state.password}
                        ></TextInput>
                    </View>
                
                    <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                        <Text style={{color: "#FFF", fontWeight: "500"}}>Зарегистрироваться</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignSelf: "center" , marginTop: 15 }}>
                        <Text style={{color: "#414959", fontSize: 13}}>
                            <Text style={{ fontWeight: "400", color: "#246ac7" }}>Войти</Text>
                        </Text>

                    </TouchableOpacity>
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
    greeting:{
        marginTop: 20,
        fontSize: 30,
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
        marginBottom: 48,
        marginHorizontal: 38

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
        borderColor: "#246ac7", borderWidth: 3,  
        width:350,
        paddingLeft: 10,
        height: 48,
        marginLeft: 35,
        fontSize: 15, 
        color: "#161F3D",
    },
    button:{
        marginTop: 25,
        marginLeft: 130, 
        width: 156,
        marginHorizontal: 38, 
        backgroundColor: "#246ac7",
        borderRadius: 25,
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

    }
});