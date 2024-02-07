import { type Iresponse } from '@/api'

// 메인 > 배너
export interface BannerListType {
  bannerSeq:	number
  clickUrl:	string
  clickYn:	'Y' | 'N'
  imageUrl:	string
  orderNum:	number
}
export interface IBannerListResponse extends Iresponse {
  data: BannerListType[]
}

// 메인 > 핫 플레이스
export interface HotPlaceType {
  imageUrl: string
  location: string
  placeName: string
  placeSeq: number
  score: number
}

export interface IHotPlaceResponse extends Iresponse {
  data: HotPlaceType[]
}

// 메인 > 어디로 갈까요
export interface RecommendPlaceType {
  name: string
  url: string
}

export interface IRecommendPlaceResponse extends Iresponse {
  data: RecommendPlaceType[]
}

// 메인 > 뉴 플레이스
export interface NewPlaceType {
  imageUrl: string
  location: string
  placeName: string
  placeSeq: number
  score: number
}
export interface INewPlaceResponse extends Iresponse {
  data: NewPlaceType[]
}

// 메인 > 테마 추천
export interface ThemeType {
  imageUrl: string
  name: string
  seq: number
  tags: string[]
  viewName: string
}

export interface IThemeResponse extends Iresponse {
  data: ThemeType[]
}

// 지역 코드 응답 값
export interface locationCodeType {
  children: []
  name: string
}
export interface ILocationCodeResponse extends Iresponse {
  data: locationCodeType[]
}
