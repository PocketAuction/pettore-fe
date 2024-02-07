export type ValueOf<T> = T[keyof T];

export type NavigationPropType<T> = {
  screen?: keyof T;
  params?: ValueOf<T>;
};

export type childrenType = {
  children: React.ReactNode
};

export type userType = {
  email: string,
  password: string,
};