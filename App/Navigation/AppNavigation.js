import { StackNavigator } from 'react-navigation'
import InvitesScreen from '../Containers/InvitesScreen'
import MessagesScreen from '../Containers/MessagesScreen'
import SetupNewPasswordScreen from '../Containers/SetupNewPasswordScreen'
import ForgotPasswordVerifyScreen from '../Containers/ForgotPasswordVerifyScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import SettingScreen from '../Containers/SettingScreen'
import ContactScreen from '../Containers/ContactScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import MainScreen from '../Containers/MainScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  InvitesScreen: { screen: InvitesScreen },
  MessagesScreen: { screen: MessagesScreen },
  SetupNewPasswordScreen: { screen: SetupNewPasswordScreen,        
    navigationOptions: {
      header: null,
    }},
  ForgotPasswordVerifyScreen: { screen: ForgotPasswordVerifyScreen,        
    navigationOptions: {
      header: null,
    }},
  ForgotPasswordScreen: { screen: ForgotPasswordScreen,        
    navigationOptions: {
      title : 'Reset Password',
    headerStyle : {
      fontSize: 23,
      textAlign: 'center',
    },
    headerTintColor : '#2699FB'
  }},
  RegisterScreen: { screen: RegisterScreen,        
    navigationOptions: {
      title : 'Create an Account',
    headerStyle : {
      fontSize: 23,
      textAlign: 'center',
    },
    headerTintColor : '#2699FB'
  }},
  SettingScreen: { screen: SettingScreen },
  ContactScreen: { screen: ContactScreen },
  NotificationScreen: { screen: NotificationScreen },
  MainScreen: { screen: MainScreen },
  HomeScreen: { screen: HomeScreen,        
    navigationOptions: {
      header: null,
    }},
  LoginScreen: { screen: LoginScreen,        
    navigationOptions: {
      header: null,
    }},
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  initialRouteName: 'LoginScreen',
})

export default PrimaryNav
