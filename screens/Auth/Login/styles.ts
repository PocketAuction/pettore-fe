import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff'
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
    paddingVertical: 60
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center'
  },
  thumnail: {
    width: 70, height: 70, borderRadius: 100, marginBottom: 20
  },
  textBig: {
    fontSize: 24,
    fontWeight: '700'
  },
  textSub: {
    fontSize: 16,
    color: '#aaa'
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  bottomItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomsItems: {
    width: 250
  },
  textCenter: {
    textAlign: 'center'
  },
  rowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mb10: {
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  }
})

export default styles
