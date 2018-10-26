import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { SearchBar } from 'react-native-elements'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ContactScreenStyle'

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        query: "",
    };
  }
  searchOnTextChange = query =>{
    console.log(query);
    this.setState(state => ({ state, query: query || "" }));
    if(query === ''){
      console.log('query is null now');
    }
    else{
      console.log('search for query here');
    }
  }
  searchOnClear = () =>{
    console.log('search cleared');
  }
  render() {
    return (
      <ScrollView style={styles.divStyle}>
        <SearchBar
          containerStyle={styles.searchcontainer}
          inputContainerStyle={styles.searchtextcontainer}
          inputStyle = {{marginTop : 5}}
          placeholderTextColor = '#2699FB'
          platform="ios"
          round
          cancelIcon = {false}
          searchIcon={null}
          onChangeText={this.searchOnTextChange}
          onClear={this.searchOnClear}
          placeholder='Search...' />
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.contactsheadingstyle}>Contacts</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
