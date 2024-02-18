import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import SearchInputWrapper from '@/screens/Search/SearchInputWrapper'
import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { type BottomTabParamList } from '@/constants/type/navigationType'

export default function SearchScreen ({ route }: BottomTabScreenProps<BottomTabParamList>): React.JSX.Element {
  const { flag } = route.params ?? { flag: '' }
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
      {
        flag === 'DETAIL' && (
          <View style={styles.detailPopWrapper}>
            <Text>hi</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  map: { width: '100%', height: '100%' },
  detailPopWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '100%', backgroundColor: '#fff' }
})
