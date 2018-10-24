import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#2699FB'
  },
  textStyle: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 40,
  },
  resetForm: {
    alignSelf: 'stretch',
  },
  resendButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 30,
    borderRadius: 5,
  },
  btnText: {
    color: '#2699FB',
    fontWeight: 'bold',
  },
  error: {
    borderBottomColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6CE'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'red',
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 30
  },
  wrapper: {
    marginTop: 30
  },
})
