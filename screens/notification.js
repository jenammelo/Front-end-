import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Item = ({ id, title, description, notificationTime, onDelete }) => {
  const [showMore, setShowMore] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const colorAnim = new Animated.Value(0);
  const truncatedDescription = description ? description.substring(0, 20) : '';

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(colorAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    alert(`Confirmed ${title}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const buttonBackgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#3897f0', 'green'] // Instagram blue to green
  });
  const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false, };
  
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../profiles/y.jpeg')} // Update the path to your image file
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      

      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text2}>
          {description && description.length > 100 ? truncatedDescription : description}
          {description && description.length > 100 && (
            <TouchableOpacity onPress={() => setShowMore(true)}>
              
              <Text style={styles.moreText}> ...More</Text>
            </TouchableOpacity>
          )}
        </Text>
        <Text style={styles.notificationTime}>{notificationTime}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.confirmButton, { backgroundColor: buttonBackgroundColor }]}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      {showMore && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMore}
          onRequestClose={() => setShowMore(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.fullText}>{description}</Text>
              <TouchableOpacity onPress={() => setShowMore(false)}>
                <Text style={styles.buttonText2}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {showDeleteConfirm && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDeleteConfirm}
          onRequestClose={cancelDelete}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.fullText}>Are you sure you want to delete this item?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={confirmDelete} style={styles.modalButton}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelDelete} style={styles.modalButton}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const App = () => {
  const [data, setData] = useState([
    { id: '1', title: 'Educare', description: 'hackaton in a minute be in hall 103 for the hackatin test , all swe students should come with their laptops and ID cards', notificationTime: '10h' },
    { id: '2', title: 'Administration', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesday ', notificationTime: '2d' },
    { id: '3', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '3d' },
    { id: '4', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '4d' },
    { id: '5', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '1week' },
    { id: '6', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '30min' },
    { id: '7', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '10min' },
    { id: '8', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '5min' },
    { id: '9', title: 'Educare', description: 'your welcome thank you, for trust!!', notificationTime: '1min' },
    { id: '10', title: 'Educare', description: 'All HND students should be present on campus at 10:00am for a very important meeting , be on time !! and you would be resuming with CA from tuesda', notificationTime: '2025-01-01 14:45:00' },
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));

  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...item} onDelete={handleDelete} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<View style={styles.headerPlaceholder} />}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 8,
  },
  headerPlaceholder: {
    height: -5, // Adjust this value to match the height of your header
  },
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
 
    alignItems: 'center',
    justifyContent: 'space-be2tween',
    borderRadius: 2,
    
  },
  profileContainer: {
    width: 50, height: 50, 
    borderRadius: 100, overflow: 'hidden',
     justifyContent: 'center', 
     alignItems: 'center',
     position:'relative',
     right:'10',
     bottom:'29'
  },
  profileText: {
    fontSize: 27,
  },
  textContainer: {
    flex: 2,
    position: 'relative',
    bottom: '17',
    left: '13',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  notificationTime: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
    marginRight: 10,
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'blue',
    fontWeight: 'bold',
    position:'relative',
    left:'240'
  },
  moreText: {
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3897f0',
  },
  fullText: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileImage: { width: '100%', height: '100%',  borderRadius: '20',},
});

export default App;






      

