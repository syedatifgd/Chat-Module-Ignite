import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import  API  from "../Services/Api";
import { NavigationActions } from 'react-navigation';

// Styles
import styles from './Styles/SettingScreenStyle'

export default class SettingScreen extends Component {
  logoutPressed = () =>{
    
  }

  render () {
    return (
      <View style={styles.divStyle}>
        <KeyboardAwareScrollView style={styles.settingsForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.logoutButton} onPress={this.logoutPressed}>
            <Text style={styles.btnText}> LOGOUT </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}