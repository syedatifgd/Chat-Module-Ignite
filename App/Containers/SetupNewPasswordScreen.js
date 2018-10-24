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
import styles from './Styles/SetupNewPasswordScreenStyle'

export default class SetupNewPasswordScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      passwordvalidation: true,
      confirmpasswordvalidation: true,
    };
  }
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  getpassword = (text) => {
    this.setState({ password: text })
  }
  getconfirmpassword = (text) => {
    this.setState({ confirmpassword: text })
  }
  resetPasswordPressed = () => {
    this.setState({ passwordvalidation: true })
    this.setState({ confirmpasswordvalidation: true })
    const { navigation } = this.props;
    const userEmail = navigation.getParam('userEmail');
    const api = API.create();
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (this.state.password != null || this.state.confirmpassword !=null) {
      if (this.state.password != this.state.confirmpassword) {
        ToastAndroid.show('Password does not match', ToastAndroid.LONG);
      }
      else {
        if (passwordRegex.test(this.state.password) === false) {
          ToastAndroid.show('Password must contain: One uppercase and lowercase character followed by atleast 1 number and special character with minimum of 8 characters in total');
        }
        else {
          api.newPasswordSetup(userEmail, this.state.password)
          .then(response => {
            if (response.status == 200) {
              Alert.alert(
                'Password Reset',
                'Your password was changed successfully',
                [
                  { text: 'OK', onPress: () => this.resetNavigation('LoginScreen') },
                ],
                { cancelable: false }
              )
            }
            else {
              ToastAndroid.show('There was an error, please check your input and try again', ToastAndroid.LONG);
            }
          })
          .catch(error => {
            ToastAndroid.show('There was an error, please check your input and try again', ToastAndroid.LONG);
          })
        }
      }
    }
    else {
      ToastAndroid.show('Password cannot be empty', ToastAndroid.LONG);
      this.setState({ passwordvalidation: false });
      this.setState({ confirmpasswordvalidation: false });
    }
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <KeyboardAwareScrollView style={styles.newPassForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}>New Password</Text>
          <TextInput style={[styles.textInput, !this.state.passwordvalidation ? styles.error : null]} placeholder="New Password" underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={(text) => this.getpassword(text)} value={this.state.password} maxLength={15} autoCapitalize={'none'} autoCorrect={false}></TextInput>
          <TextInput style={[styles.textInput, !this.state.confirmpasswordvalidation ? styles.error : null]} placeholder="Confirm Password" underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={(text) => this.getconfirmpassword(text)} value={this.state.confirmpassword} maxLength={15} autoCapitalize={'none'} autoCorrect={false}></TextInput>
          <TouchableOpacity style={styles.resetButton} onPress={this.resetPasswordPressed}>
            <Text style={styles.btnText}> RESET </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}