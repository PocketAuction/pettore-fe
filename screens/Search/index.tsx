import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import SearchInputWrapper from '@/screens/Search/SearchInputWrapper'
import { type SearchTabScreenProps } from '@/constants/type/navigationType'

export default function SearchScreen ({ route }: SearchTabScreenProps): React.JSX.Element {

  console.log('SearchScreen', route.params, Object.prototype.toString.call(route))
  return (
    <View style={styles.container}>
      <SearchInputWrapper />
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  map: { width: '100%', height: '100%' }
})
