import React from 'react'
import { Modal, View, StyleSheet } from 'react-native'

interface ModalBottomProps {
  children: React.ReactNode
}
export default function ModalBottom (props: ModalBottomProps): React.JSX.Element {
  const { children } = props
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        console.log('Modal has been closed.')
      }}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 10
  }
})
