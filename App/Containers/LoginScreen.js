import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { ToastAndroid } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import  API  from "../Services/Api";
import { NavigationActions } from 'react-navigation';


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validated: true,
      passwordvalidation: true,
      userToken : ''
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
  componentDidMount(){
    // if(this.state.userToken != null){
    //   this.resetNavigation('HomeScreen');
    // }
  }
  validate = (text) => {
    this.setState({ email: text })
  }
  getpassword = (text) => {
    this.setState({ password: text })
  }
  loginPressed = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email != '' && this.state.password != '') {
      this.setState({ validated: true });
      this.setState({ passwordvalidation: true });
      if (reg.test(this.state.email) === false) {
        ToastAndroid.show('Please enter a valid email address and try again', ToastAndroid.LONG);
        this.setState({ validated: false });
        return false;
      }
      else {
        this.setState({ validated: true });
        const api = API.create();
        api.postLogin(this.state.email,this.state.password)
          .then(response => {
            if (response.status == 200) {
              console.log(response);
              if(response.data.data.userEmail == 'Unverified'){
                Alert.alert(
                  'Email Unverified',
                  'Please verify your email before logging in.',
                  [
                    {
                      text: 'Resend Email', 
                      onPress: () => {
                        api.registrationtoken(this.state.email)
                          .then(response => {
                            if(response.status == 200){
                              ToastAndroid.show('Email sent successfully', ToastAndroid.LONG);
                            }
                          })
                          .catch(error => {
                            ToastAndroid.show('There was an error sending the email, try again later', ToastAndroid.LONG);
                          });
                      }
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              }
              else{
                this.setState({ userToken: response.data.token });
                //this.props.navigation.navigate('HomeScreen');
                this.resetNavigation('HomeScreen');
              }
            }
            else{
              ToastAndroid.show('Invalid credentials, please check your input or signup to continue', ToastAndroid.LONG);
              this.setState({ validated: false });
              this.setState({ passwordvalidation: false });
            }
            console.log(response.status);
          })
          .catch(error => {
            ToastAndroid.show('Invalid credentials, please check your input or signup to continue', ToastAndroid.LONG);
            this.setState({ validated: false });
            this.setState({ passwordvalidation: false });
          });
      }
    }
    else {
      ToastAndroid.show('One of the fields are empty or not set properly', ToastAndroid.LONG);
      if (this.state.email === '') {
        this.setState({ validated: false });
      }
      else if (this.state.password === '') {
        this.setState({ passwordvalidation: false });
      }
    }
  }

  render () {
    return (
      <View style={styles.divStyle}>
        <KeyboardAwareScrollView style={styles.logForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}> LOGIN
            </Text>
          <TextInput style={[styles.textInput, !this.state.validated ? styles.error : null]} placeholder="Email" underlineColorAndroid={'transparent'} keyboardType={'email-address'}
            autoCapitalize={'none'} autoCorrect={false} onChangeText={(text) => this.validate(text)}
            value={this.state.email}></TextInput>
          <TextInput style={[styles.textInput, !this.state.passwordvalidation ? styles.error : null]} placeholder="Password" underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={(text) => this.getpassword(text)} value={this.state.password} maxLength={25} autoCapitalize={'none'} autoCorrect={false}></TextInput>
          <TouchableOpacity style={styles.loginButton} onPress={this.loginPressed}>
            <Text style={styles.btnText}> LOGIN </Text>
          </TouchableOpacity>
          <Text style={styles.forgotpass} onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>Forgot Password</Text>
          <View style={styles.inlineComp}>
            <Text style={styles.donthaveaccount}>Don't have an account?</Text>
            <Text style={styles.donthaveaccount} onPress={() => this.props.navigation.navigate('RegisterScreen')}>Sign up</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

