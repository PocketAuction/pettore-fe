import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Input, { type InputProps } from '@/components/atoms/Input'
import { IconButton } from 'react-native-paper'

export default function InputSearch (props: InputProps): React.JSX.Element {
  return (
    <View style={styled.container}>
      <IconButton
        icon={() => (
          <Image
            source={require('../../assets/icon/ico_search.png')}
            style={{
              width: 16,
              height: 16
            }}
          />
        )}
        style={{
          width: 16,
          height: 16,
          minWidth: 16,
          margin: 0,
          padding: 0,
          paddingLeft: 0,
          borderRadius: 0
        }}
      />
      <Input {...props} />
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    // android
    elevation: 4,
    // ios
    shadowColor: 'black', // shadow 색
    shadowRadius: 6.3, // 그림자 번지는 정도
    shadowOffset: { width: 4, height: 4 }, // shadow 어떤식으로 그릴지?
    shadowOpacity: 0.15, // shadow 투명도
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E6E6E6'
  }
})
