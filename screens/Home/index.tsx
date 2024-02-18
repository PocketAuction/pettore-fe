import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/AntDesign'
import { type StackNavigationProp } from '@react-navigation/stack'
import { type RootStackParamList } from '@/constants/type/navigationType'
import {
  getBannerList,
  getHotPlace,
  getNewPlace,
  getRecommendPlace,
  getTheme
} from '@/api'
import { type HotPlaceType, type NewPlaceType, type RecommendPlaceType, type ThemeType } from '@/constants/type/apiResponseType'
import { isSuccessApiCall } from '@/util/common'
import XScrollContent from '@/components/organisms/XScrollContent'
import XScrollRoundContent from '@/components/organisms/XScrollRoundContent'
import XScrollThemeContent from '@/components/organisms/XScrollThemeContent'
import styles from './styles'

export default function Home ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }): React.JSX.Element {
  const [bannerList, setBannerList] = useState<Array<{}>>([])
  const [hotPlace, setHotPlace] = useState<HotPlaceType[]>([])
  const [newPlace, setNewPlace] = useState<NewPlaceType[]>([])
  const [recommendPlace, setRecommendPlace] = useState<RecommendPlaceType[]>([])
  const [theme, setTheme] = useState<ThemeType[]>([])

  const rightIcon = <Icon name="right" size={12} color="#898ABD" />

  useEffect(() => {
    void getBannerList().then(res => {
      if (isSuccessApiCall(res.code)) {
        setBannerList(res.data)
        console.log('aa', bannerList)
      }
    })

    // console.log(bannerList, 'banner')
    void getHotPlace().then(res => {
      if (isSuccessApiCall(res.code)) {
        setHotPlace(res.data)
      }
    })

    void getNewPlace().then(res => {
      if (isSuccessApiCall(res.code)) {
        let data = res.data
        data.forEach(item => {
          const location = item.location.split(' ')
          item.location = `${location[0]} ${location[1]}`
        })
        setNewPlace(data)
      }
    })

    void getRecommendPlace().then(res => {
      if (isSuccessApiCall(res.code)) {
        setRecommendPlace(res.data)
      }
    })

    void getTheme().then(res => {
      if (isSuccessApiCall(res.code)) {
        setTheme(res.data)
      }
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bannerArea}>
          <SwiperComponent list={bannerList} />
        </View>
        <View style={styles.mainArea}>
          {/* Hot 플레이스 */}
          <View style={styles.contentsArea}>
            <View style={styles.titleArea}>
              <Text style={styles.title}>HOT 플레이스</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('HotPlace') }}>
                <Text style={styles.showMoreBtn}>전체보기 {rightIcon}</Text>
              </TouchableOpacity>
            </View>
            <XScrollContent list={hotPlace} isShowScore={true} navigation={navigation} />
          </View>
          {/* 장소 추천 */}
          <View style={styles.contentsArea}>
            <View style={styles.titleArea}>
              <Text style={styles.title}>어디로 가시나요?</Text>
            </View>
            <XScrollRoundContent list={recommendPlace} />
          </View>
          {/* 테마 추천 */}
          <View style={styles.contentsArea}>
            <View style={styles.titleArea}>
              <Text style={styles.title}>어떤 애견카페를 찾으세요?</Text>
            </View>
            <XScrollThemeContent list={theme} />
          </View>
          {/* New 플레이스 */}
          <View style={styles.contentsArea}>
            <View style={styles.titleArea}>
              <Text style={styles.title}>New 플레이스</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('NewPlace') }}>
                <Text style={styles.showMoreBtn}>전체보기 {rightIcon}</Text>
              </TouchableOpacity>
            </View>
            <XScrollContent list={newPlace} navigation={navigation} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const SwiperComponent = (list: any): React.JSX.Element => {
  // const [bannerList, setBannerList]:any = useState([]);
  //
  // useEffect(() => {
  // 	setBannerList([
  // 		{
  // 			seq: 1,
  // 			imgUrl: 'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG'
  // 		},
  // 		{
  // 			seq: 2,
  // 			imgUrl: 'https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cac274d00b12.jpg'
  // 		}
  // 	])
  // }, [])

  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      dotStyle={{ backgroundColor: '#eee' }}
      activeDotStyle={{ backgroundColor: '#0BCA7A' }}
    >
      {Array.isArray(list) && list.map((item: any) => {
        return (
          <View style={styles.slide} key={item.seq}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.imgUrl }} />
          </View>
        )
      })}
    </Swiper>
  )
}
