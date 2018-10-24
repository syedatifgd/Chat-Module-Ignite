import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { createBottomTabNavigator } from "react-navigation";
import { TabNavigator, TabBarBottom } from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeScreenStyle'

import MainScreen from './MainScreen';
import NotificationScreen from './NotificationScreen';
import ContactScreen from './ContactScreen';
import SettingScreen from './SettingScreen';
import MessagesScreen from './MessagesScreen';
import InvitesScreen from './InvitesScreen';

// export default createMaterialBottomTabNavigator({
//   Main : {screen: MainScreen},
//   Notifications : {screen: NotificationScreen},
//   Contacts : {screen : ContactScreen},
//   Settings : {screen : SettingScreen}
// },{
//   initialRouteName : 'Main',
//   activeTintColor : 'orange'
// })
export default TabNavigator({
  Home: { screen: MainScreen },
  Notifications: { screen: NotificationScreen },
  Contacts: { screen: ContactScreen },
  Settings: { screen: SettingScreen },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        }
        else if (routeName === 'Notifications') {
          iconName = 'ios-notifications';
        }
        else if (routeName === 'Contacts') {
          iconName = 'md-contacts';
        }
        else if (routeName === 'Settings') {
          iconName = 'ios-settings'
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2699FB',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);

// export default mainNavigation;
// export default class HomeScreen extends Component{
//   render(){
//     return(
//       <View>
//         <Text>Home Screen</Text>
//       </View>
//     )
//   }
// }
