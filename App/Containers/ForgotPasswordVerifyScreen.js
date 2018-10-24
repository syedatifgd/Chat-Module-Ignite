import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CodeInput from 'react-native-confirmation-code-input';
import API from "../Services/Api";
import { NavigationActions } from 'react-navigation';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ForgotPasswordVerifyScreenStyle'

export default class ForgotPasswordVerifyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
  onCodeComplete = (code) => {
    const { navigation } = this.props;
    const userEmail = navigation.getParam('userEmail');
    console.log(userEmail);
    this.setState({ email: userEmail })
    console.log(code);
    const api = API.create();
    api.verifyResetPasswordCode(userEmail, code)
      .then(response => {
        if (response.status == 200) {
          //this.props.navigation.navigate('SetupNewPasswordScreen',{userEmail:userEmail});
          this.resetNavigation('SetupNewPasswordScreen');
        }
        else {
          ToastAndroid.show('Invalid code or incorrect email, please try again', ToastAndroid.LONG);
        }
      })
      .catch(error => {
        ToastAndroid.show('Invalid code or incorrect email, please try again', ToastAndroid.LONG);
      })
  }
  resendCode = () =>{
    const { navigation } = this.props;
    const userEmail = navigation.getParam('userEmail');
    const api = API.create();
    console.log(userEmail);
    api.resetPassword(userEmail)
    .then(response => {
      if (response.status == 200) {
        ToastAndroid.show('Enter the verification code sent to your email', ToastAndroid.LONG)
      }
      else {
        ToastAndroid.show('Could not send the code, try again', ToastAndroid.LONG);
      }
    })
    .catch(error => {
      console.log(error);
      ToastAndroid.show('Could not send the code, try again', ToastAndroid.LONG);
    })
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <KeyboardAwareScrollView style={styles.resetForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}>Verification Code</Text>
          <CodeInput
            ref="codeInputRef2"
            keyboardType="numeric"
            codeLength={6}
            autoFocus={false}
            codeInputStyle={{ fontWeight: '800' }}
            onFulfill={(code) => this.onCodeComplete(code)}
          />
          <TouchableOpacity style={styles.resendButton} onPress={this.resendCode}>
            <Text style={styles.btnText}> RESEND CODE </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

