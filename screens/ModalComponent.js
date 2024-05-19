import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";

const ModalComponent = ({ modalVisible, setModalVisible, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
		flex: 1,
		// borderWidth: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: "100%",

	},
	modalView: {
		// margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		height: "50%",
		width: "80%",
		backgroundColor: 'white',
		borderRadius: 20,
		// padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.95,
		shadowRadius: 5,
		elevation: 20,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 10,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},

});

export default ModalComponent;
