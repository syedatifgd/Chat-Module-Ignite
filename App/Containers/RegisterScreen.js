import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux'
import  API  from "../Services/Api";

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      validated: true,
      namevalidation: true,
      usernamevalidation: true,
      passwordvalidation: true,
      confirmpasswordvalidation: true
    };
  }


  validate = (text) => {
    this.setState({ email: text })
  }
  getname = (text) => {
    this.setState({ name: text })
  }
  getusername = (text) => {
    this.setState({ username: text })
  }
  getpassword = (text) => {
    this.setState({ password: text })
  }
  getconfirmpassword = (text) => {
    this.setState({ confirmPassword: text })
  }
  signUpPressed = () => {
    const api = API.create();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let fullNameRegex = /^[a-zA-Z\s]*$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (this.state.email != '' && this.state.name != '' && this.state.username != '' && this.state.password != '' && this.state.confirmPassword != '') {
      this.setState({ validated: true });
      this.setState({ namevalidation: true });
      this.setState({ usernamevalidation: true });
      this.setState({ passwordvalidation: true });
      this.setState({ confirmpasswordvalidation: true });
      if (reg.test(this.state.email) === false) {
        ToastAndroid.show('Please enter a valid email address and try again', ToastAndroid.LONG);
        this.setState({ validated: false })
        return false;
      }
      else {
        this.setState({ validated: true })
        console.log("Email is Correct");
        if (usernameRegex.test(this.state.username) === false) {
          ToastAndroid.show('Username cannot contain special charaters, try again', ToastAndroid.LONG);
          this.setState({ usernamevalidation: false })
          return false;
        }
        else {
          this.setState({ usernamevalidation: true })
          if (this.state.password != this.state.confirmPassword) {
            ToastAndroid.show('Password does not match', ToastAndroid.LONG);
            this.setState({ passwordvalidation: false })
            this.setState({ confirmpasswordvalidation: false })
          }
          else {
            if(fullNameRegex.test(this.state.name)===false){
              ToastAndroid.show('Your name cannot contain special charaters, try again', ToastAndroid.LONG);
              this.setState({namevalidation : false})
              return false;
            }
            else{
              if(passwordRegex.test(this.state.password) === false){
                ToastAndroid.show('Password must contain: One uppercase and lowercase character followed by atleast 1 number and special character with minimum of 8 characters in total', ToastAndroid.LONG);
                this.setState({ passwordvalidation: false });
                this.setState({ confirmpasswordvalidation: false });
                return false;
              }
              else{
                this.setState({ passwordvalidation: true })
                this.setState({ confirmpasswordvalidation: true })
                api.registration(this.state.username,this.state.email,this.state.password,this.state.name)
                  .then(response => {
                    if (response.status == 200) {
                      ToastAndroid.show('An email was sent to you, please verify it before logging in', ToastAndroid.LONG);
                      api.registrationtoken(this.state.email)
                        .then(response => {
                          if(response.status == 200){
                            this.props.navigation.navigate('LoginScreen');
                          }
                        })
                        .catch(error => {
                          ToastAndroid.show('There was an error sending the email, try again later', ToastAndroid.LONG);
                        });
                    }
                    else if(response.status == 400){
                      ToastAndroid.show('Email already registered or username is taken', ToastAndroid.LONG);
                      this.setState({ validated: false });
                      this.setState({ usernamevalidation: false });
                    }
                  })
                  .catch(error => {
                    ToastAndroid.show('Email already registered or username is taken', ToastAndroid.LONG);
                    this.setState({ validated: false });
                    this.setState({ usernamevalidation: false });
                  });
              }
            }
          }
        }
      }
    }
    else {
      ToastAndroid.show('One of the fields are empty or not set properly', ToastAndroid.LONG);
      if (this.state.email === '') {
        this.setState({ validated: false });
      }
      else if (this.state.name === '') {
        this.setState({ namevalidation: false });
      }
      else if (this.state.username === '') {
        this.setState({ usernamevalidation: false });
      }
      else if (this.state.password === '') {
        this.setState({ passwordvalidation: false });
      }
      else if (this.state.confirmPassword === '') {
        this.setState({ confirmpasswordvalidation: false });
      }
      this.setState({ validated: false });
      this.setState({ namevalidation: false });
      this.setState({ usernamevalidation: false });
      this.setState({ passwordvalidation: false });
      this.setState({ confirmpasswordvalidation: false });
    }
  }
  render () {
    return (
      <View style={styles.viewStyle}>
        <KeyboardAwareScrollView style={styles.regForm} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} automaticallyAdjustContentInsets={false} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <Text style={styles.textStyle}></Text>
          <TextInput style={[styles.textInput, !this.state.namevalidation ? styles.error : null]} placeholder="Name" underlineColorAndroid={'transparent'} onChangeText={(text) => this.getname(text)} value={this.state.name}></TextInput>
          <TextInput style={[styles.textInput, !this.state.validated ? styles.error : null]} placeholder="Email" underlineColorAndroid={'transparent'} keyboardType={'email-address'}
            autoCapitalize={'none'} autoCorrect={false} onChangeText={(text) => this.validate(text)}
            value={this.state.email}></TextInput>
          <TextInput style={[styles.textInput, !this.state.usernamevalidation ? styles.error : null]} placeholder="Username" underlineColorAndroid={'transparent'} autoCapitalize={'none'} autoCorrect={false} onChangeText={(text) => this.getusername(text)} value={this.state.username} maxLength={15}></TextInput>
          <TextInput style={[styles.textInput, !this.state.passwordvalidation ? styles.error : null]} placeholder="Password" underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={(text) => this.getpassword(text)} value={this.state.password} maxLength={15} autoCapitalize={'none'} autoCorrect={false}></TextInput>
          <TextInput style={[styles.textInput, !this.state.confirmpasswordvalidation ? styles.error : null]} placeholder="Confirm Password" underlineColorAndroid={'transparent'} secureTextEntry={true} onChangeText={(text) => this.getconfirmpassword(text)} value={this.state.confirmPassword} maxLength={15} autoCapitalize={'none'} autoCorrect={false}></TextInput>
          <TouchableOpacity style={styles.signupButton} onPress={this.signUpPressed}>
            <Text style={styles.btnText}> SIGN UP </Text>
          </TouchableOpacity>
          <View style={styles.inlineComp}>
            <Text style={styles.donthaveaccount} onPress={() => this.props.navigation.navigate('LoginScreen')}>Already have an account?</Text>
            <Text style={styles.donthaveaccount} onPress={() => this.props.navigation.navigate('LoginScreen')}>Login</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

