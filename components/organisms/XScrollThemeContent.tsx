import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'

interface itemProps {
  seq: number
  imageUrl: string
  name: string
  viewName: string
  tags: string[]
}

export default function XScrollThemeContent (props: { list: itemProps[], isShowScore?: boolean }): React.JSX.Element {
  const { list } = props

  return (
    <ScrollView contentContainerStyle={styles.xScrollContentWrap} horizontal={true} showsHorizontalScrollIndicator={false}>
      {list.map((item: itemProps) => {
        return (
          <View style={styles.contentBox} key={item.seq}>
            <ImageBackground source={{ uri: item.imageUrl }} style={styles.imgWrap}>
              <View style={styles.infoWrap}>
                <View style={styles.themeNameWrap}>
                  <Text style={styles.themeName}>&quot;{item.viewName}&quot;</Text>
                </View>
                <View style={styles.tagWrap}>
                  {item.tags.map((item: string) => {
                    return (
                      <Text style={styles.tag} key={item}>#{item}</Text>
                    )
                  })}
                </View>
              </View>
            </ImageBackground>
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
    width: 240,
    height: 170,
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden'
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    opacity: 0.9,
    backgroundColor: 'black'
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16
  },
  themeNameWrap: {
    flexBasis: 110,
    flexGrow: 1,
    flexShrink: 1
  },
  themeName: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: '600',
    color: '#fff'
  },
  tagWrap: {
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  tag: {
    marginRight: 10,
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 12,
    lineHeight: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff'
  }
})
