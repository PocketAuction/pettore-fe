import React from 'react'
import { Modal, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconButton from '@/components/atoms/IconButton'

interface ModalBottomProps {
  visible: boolean
  children: React.ReactNode
  handleVisible: (is: boolean) => void
  callbackEvent?: () => void
}
export default function ModalBottom (props: ModalBottomProps): React.JSX.Element {
  const { children, handleVisible, visible = false, callbackEvent } = props

  const closeModal = (): void => {
    handleVisible(false)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={callbackEvent}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.closeButton}>
            <IconButton onPress={closeModal}>
              <Icon name="close" size={18}/>
            </IconButton>
          </View>
          <ScrollView>
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    width: 40,
    height: 40,
    flexDirection: 'row',
    marginBottom: 30
  }
})
