import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  divStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  contactsheadingstyle : {
    color : '#D0D0D0',
    alignItems: 'flex-start',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 15,
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  searchcontainer : {
    backgroundColor: '#2699FB',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  searchtextcontainer : {
    backgroundColor: 'white',
    padding : 0,  
  }
})
