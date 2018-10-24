import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import API from "../Services/Api";
import { NavigationActions } from 'react-navigation';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ForgotPasswordScreenStyle'

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validated: true,
    };
  }
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute, params: { userEmail: this.state.email } }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  validate = (text) => {
    this.setState({ email: text })
  }
  resetPressed = () => {
    const api = API.create();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email != '') {
      this.setState({ validated: true });
      if (reg.test(this.state.email) === false) {
        ToastAndroid.show('Please enter a valid email address and try again', ToastAndroid.LONG);
        this.setState({ validated: false })
        return false;
      }
      else {
        this.setState({ validated: true })
        api.resetPassword(this.state.email)
          .then(response => {
            if (response.status == 200) {
              ToastAndroid.show('Enter the verification code sent to your email', ToastAndroid.LONG)
              //this.props.navigation.navigate('ForgotPasswordVerifyScreen',{userEmail:this.state.email});
              this.resetNavigation('ForgotPasswordVerifyScreen');
            }
            else {
              ToastAndroid.show('Please check your email and try again', ToastAndroid.LONG);
            }
          })
          .catch(error => {
            ToastAndroid.show('Please check your email and try again', ToastAndroid.LONG);
          })
      }
    }
    else {
      ToastAndroid.show('Email cannot be empty', ToastAndroid.LONG);
      this.setState({ validated: false });
    }
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <KeyboardAwareScrollView style={styles.resetForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}></Text>
          <TextInput style={[styles.textInput, !this.state.validated ? styles.error : null]} placeholder="Email" underlineColorAndroid={'transparent'} keyboardType={'email-address'}
            autoCapitalize={'none'} autoCorrect={false} onChangeText={(text) => this.validate(text)}
            value={this.state.email}></TextInput>
          <TouchableOpacity style={styles.resetButton} onPress={this.resetPressed}>
            <Text style={styles.btnText}> RESET </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

