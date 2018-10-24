import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: 'white',
    alignItems: 'center',
  },  
  textStyle: {
    fontSize: 23,
    color: '#2699FB',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 40,
  },
  newPassForm: {
    alignSelf: 'stretch',
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#2699FB',
    borderBottomColor: '#BCE0FD',
    borderBottomWidth: 1,
  },
  resetButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2699FB',
    marginTop: 30,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    borderBottomColor: 'red'
  },
})
