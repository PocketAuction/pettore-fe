import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import InputSearch from '@/components/molecules/inputSearch'

import Constants from 'expo-constants'
import useCustomNavigation from '@/customhooks/useCustomNavigation'
import { IconButton } from 'react-native-paper'

const statusBarHeight = Constants.statusBarHeight
export default function SearchInputWrapper (): React.JSX.Element {
  const [searchText, setSearchText] = useState('')
  const { navigation } = useCustomNavigation()

  const goBack = (): void => {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <IconButton icon={'chevron-left'} onPress={goBack} style={{ margin: 0, marginRight: 15, width: 20 }}/>
      <InputSearch
        value={searchText}
        placeholder='지역 또는 애견카페명을 검색해 보세요.'
        onChangeText={(e) => { setSearchText(e) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: statusBarHeight,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 25
  },
})
