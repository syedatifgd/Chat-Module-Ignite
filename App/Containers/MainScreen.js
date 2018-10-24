import React, { Component } from 'react'
import MessagesScreen from './MessagesScreen';
import InvitesScreen from './InvitesScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { TabNavigator, TabBarBottom } from "react-navigation";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'

export default TabNavigator({
  Messages: { screen: MessagesScreen },
  Invites: { screen: InvitesScreen },
});

