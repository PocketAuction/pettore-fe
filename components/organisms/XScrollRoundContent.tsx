import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { type RecommendPlaceType } from '@/constants/type/apiResponseType'

export default function XScrollRoundContent (props: { list: RecommendPlaceType[] }): React.JSX.Element {
  const { list } = props

  return (
    <ScrollView contentContainerStyle={styles.xScrollContentWrap} horizontal={true} showsHorizontalScrollIndicator={false}>
      {list.map((item: RecommendPlaceType) => {
        return (
          <View style={styles.roundContentBox} key={item.name}>
            <Image style={styles.roundContentImg} source={{ uri: item.url }} />
            <Text style={styles.roundContentText}>{item.name}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  xScrollContentWrap: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    width: 'auto',
    paddingLeft: 24,
    paddingRight: 24
  },
  roundContentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 75,
    marginRight: 12,
    borderRadius: 50,
    backgroundColor: '#bbb',
    overflow: 'hidden'
  },
  roundContentImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'black'
  },
  roundContentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  }
})
