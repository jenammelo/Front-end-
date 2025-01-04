import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';

const App = () => {
  const [children, setChildren] = useState([
    { id: 1, text: 'Short text' }, 
    { id: 2, text: 'Another short text' }, 
    { id: 3, text: 'This is a much longer text that will require more space and should eventually show the "More" option' }
  ]);
  const [selectedText, setSelectedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const addChild = () => {
    const newId = children.length + 1;
    setChildren([...children, { id: newId, text: `Container ${newId} with dynamic content that expands` }]);
  };

  const handleMorePress = (text) => {
    setSelectedText(text);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {children.map(child => (
            <View key={child.id} style={styles.subContainer}>
              <Text style={styles.text}>
                {child.text.length > 30 ? `${child.text.substring(0, 30)}... ` : child.text}
                {child.text.length > 30 && (
                  <Text style={styles.moreText} onPress={() => handleMorePress(child.text)}>More</Text>
                )}
              </Text>
            </View>
          ))}
          <TouchableOpacity onPress={addChild} style={styles.button}>
            <Text style={styles.buttonText}>Add Container</Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{selectedText}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  
  
    position:'relative',
    bottom:'11',
    height:'50%'
    
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  
   position:'absolute',
 
   width:'100%',
   paddingTop: 60, // Add padding to avoid overlap with the fixed header paddingBottom: 60,

  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping of sub-containers
    width: '100%',
    height:'300%',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-start', // Align children to start
  

  },
  subContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 5, // Margin between sub-containers
    borderWidth: 1, // Solid border
    borderColor: 'black', // Border color
    borderRadius: 5, // Border radius
    alignItems: 'center',
    maxWidth: '55%', // Ensure the container does not exceed half the width of main container
    
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
