import { StyleSheet, Dimensions } from 'react-native'

let screenWidth = Dimensions.get('window').width
// let screenHeight = Dimensions.get('window').height
export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bannerArea: {
    width: screenWidth,
    height: 300
  },
  mainArea: {
    width: screenWidth,
    paddingTop: 36,
    overflow: 'visible'
  },
  contentsArea: {
    marginBottom: 50,
    overflow: 'visible'
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    marginLeft: 24,
    fontSize: 18,
    fontWeight: '700'
  },
  showMoreBtn: {
    marginRight: 24,
    fontSize: 13,
    fontWeight: '400',
    color: '#898ABD'
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default styles
