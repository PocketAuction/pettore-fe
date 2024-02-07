import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/constants/type/navigationType";
import {HotPlaceType} from "@/constants/type/apiResponseType";


interface itemProps extends HotPlaceType {
  bookmark?: boolean
}

export default function XScrollContent (props: { list: itemProps[], isShowScore?: boolean, navigation: StackNavigationProp<RootStackParamList> }): React.JSX.Element {
  const { list, isShowScore = false, navigation } = props
  const onClickBookmark = (placeSeq:number, index:number): void => {
    console.log(placeSeq)
    console.log(list[index].bookmark)
  }

  return (
    <ScrollView contentContainerStyle={styles.xScrollContentWrap} horizontal={true} showsHorizontalScrollIndicator={false}>
      {Array.isArray(list) && list.map((item: itemProps, index: number) => {
        return (
          <View style={styles.contentBox} key={item.placeSeq}>
            <TouchableOpacity onPress={() => {navigation.navigate('PlaceDetail')}}>
              <View style={styles.imgWrap}>
                <Image style={styles.img} source={{ uri: item.imageUrl }} />
                <View style={styles.bookmarkIcon}>
                  <IconButton
                    icon={(item.bookmark ?? false) ? 'bookmark' : 'bookmark-outline'}
                    size={24}
                    iconColor={(item.bookmark ?? false) ? '#0BCA7A' : '#fff'}
                    onPress={() => {onClickBookmark(item.placeSeq, index)}}
                  />
                </View>
              </View>
              <View style={styles.infoArea}>
                <Text style={styles.placeName}>{item.placeName}</Text>
                <View style={styles.textWrap}>
                  {isShowScore &&
                    <>
                      <View style={styles.icon}><Icon name="heart" size={14} color="#FF8080" /></View>
                      <View><Text style={styles.score}>{item.score}</Text></View>
                    </>}
                  <View><Text style={styles.location}>{item.location}</Text></View>
                </View>
              </View>
            </TouchableOpacity>
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
  contentBox: {
    width: 182,
    marginRight: 10,
    borderStyle: 'solid',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 4
  },
  imgWrap: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  bookmarkIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 'auto',
    height: 'auto'
  },
  infoArea: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4
  },
  placeName: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '400',
    color: '#222'
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  icon: {
    paddingRight: 5
  },
  score: {
    paddingRight: 5,
    fontSize: 10,
    fontWeight: '500'
  },
  location: {
    fontSize: 10,
    color: '#808080'
  }
})
