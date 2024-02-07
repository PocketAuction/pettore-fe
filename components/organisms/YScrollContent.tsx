import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import {IconButton} from "react-native-paper";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

type itemProps = {
  placeSeq: number,
  imageUrl: string,
  placeName: string,
  bookmark?: boolean,
  score?: string,
  location: string
}

export default function YScrollContent(props: {list: itemProps[], isShowScore?: boolean}) {
  const { list, isShowScore = false } = props;
  const onClickBookmark = (placeSeq:number, index:number) : void => {
    console.log(list[index].bookmark)
  }

  return (
    <ScrollView>
      <View style={styles.contentArea}>
        {list.map((item: any, index) => {
          return (
            <View style={styles.contentBox} key={item.placeSeq}>
              <View style={styles.imgWrap}>
                <Image style={styles.img} source={{uri: item.imageUrl}} />
                <View style={styles.bookmarkIcon}>
                  <IconButton
                    icon={item.bookmark ? 'bookmark' : 'bookmark-outline'}
                    size={24}
                    iconColor={item.bookmark ? '#0BCA7A' : '#fff'}
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
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  contentArea: {
    padding: 25
  },
  contentBox: {
    width: '100%',
    marginBottom: 15,
    borderStyle: 'solid',
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 4
  },
  imgWrap: {
    width: '100%',
    height: 148,
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
    height: 'auto',
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
    alignItems: 'center',
  },
  icon: {
    paddingRight: 5,
  },
  score: {
    paddingRight: 5,
    fontSize: 10,
    fontWeight: '500'
  },
  location: {
    fontSize: 10,
    color: '#808080'
  },
});

