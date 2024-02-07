import React, { useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'

let screenWidth = Dimensions.get('window').width
// let screenHeight = Dimensions.get('window').height

export default function PlaceDetail (): React.JSX.Element {
  const onClickBookmark = (): void => {
    console.log('click')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bannerArea}>
          <SwiperComponent />
        </View>
      </View>
      <View style={styles.titleArea}>
        {/* 제목, 버튼 */}
        <View style={styles.topArea}>
          <View>
            <Text style={styles.title}>애견카페명</Text>
          </View>
          <View style={styles.buttonArea}>
            <IconButton
              icon={'bookmark-outline'}
              size={24}
              iconColor={'#ccc'}
              onPress={onClickBookmark}
            />
            <IconButton
              icon={'bookmark-outline'}
              size={24}
              iconColor={'#ccc'}
              onPress={onClickBookmark}
            />
          </View>
        </View>
        {/* 점수 */}
        <View style={styles.scoreArea}>
          <Icon name="heart" size={14} color="#FF8080" />
          <Text>4.8</Text>
        </View>
        {/* 지역 */}
        <View>
          <Text style={styles.location}>서울 강남구</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const SwiperComponent = (list: any): React.JSX.Element => {
  const [bannerList, setBannerList]: any = useState([])

  useEffect(() => {
    setBannerList([
      {
        seq: 1,
        imgUrl: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'
      },
      {
        seq: 2,
        imgUrl: 'https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cac274d00b12.jpg'
      }
    ])
  }, [])

  return (
    <Swiper
      showsButtons={false}
      dotStyle={{ backgroundColor: '#eee' }}
      activeDotStyle={{ backgroundColor: '#0BCA7A' }}
    >
      {bannerList.map((item: any) => {
        return (
          <View style={styles.slide} key={item.seq}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.imgUrl }} />
          </View>
        )
      })}
    </Swiper>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bannerArea: {
    width: screenWidth,
    height: 230
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleArea: {
    padding: 16
  },
  topArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  buttonArea: {
    display: 'flex',
    flexDirection: 'row'
  },
  scoreArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    color: '#99A29E'
  }
})
