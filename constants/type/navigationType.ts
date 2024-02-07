export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type AuthStackParamList = {
  Login: undefined;
  Create: undefined;
  Find: {flag: string};
}

export type LoginSuccessStackParamList = {
  Home: undefined;
  Search: undefined;
  Bookmark: undefined;
  MyPage: undefined;
}

export type RootStackParamList = {
  Auth?: NavigationPropType<AuthStackParamList>;
  Index?: NavigationPropType<LoginSuccessStackParamList>;
  HotPlace: undefined;
  NewPlace: undefined;
  PlaceDetail: undefined;
};
