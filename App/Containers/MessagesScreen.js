import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import API from "../Services/Api"
import { NavigationActions } from 'react-navigation'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator, TabBarBottom } from "react-navigation"

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MessagesScreenStyle'

export default class MessagesScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton
          buttonColor="rgba(38, 153, 251, 1)"
          onPress={() => { this.props.navigation.navigate('Contacts') }}
        />
      </View>
    )
  }
}

