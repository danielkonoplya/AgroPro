import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './screens/Loading';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import ChatScreen from './screens/Chat';
import VehiclesScreen from './screens/Vehicles';
import WheatherScreen from './screens/Weather';

import ForecastScreen from './screens/Forecast'
import  firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyCCP8RgNyym3gfzpYqobw6PQnmjJPHilSg",
  authDomain: "agroapp-5dae2.firebaseapp.com",
  databaseURL: "https://agroapp-5dae2.firebaseio.com",
  projectId: "agroapp-5dae2",
  storageBucket: "agroapp-5dae2.appspot.com",
  messagingSenderId: "353426799823",
  appId: "1:353426799823:web:1eee999d38c590692d0bba"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Vehicles: VehiclesScreen,
  Wheather: WheatherScreen,
  Forecast: ForecastScreen
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  
});

export default createAppContainer(
  createSwitchNavigator(
    {
        Loading: LoadingScreen,
        
        App: AppStack,
        Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);