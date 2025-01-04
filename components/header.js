import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* First Sub-Container */}
        <View style={{...styles.subContainer, width: 5}}>
          <Text style={styles.text}>Container 1</Text>
        </View>
        
        {/* Second Sub-Container */}
        <View style={styles.subContainer}>
          <Text style={styles.text1}>Notfications</Text>
        </View>
        
        {/* Third Sub-Container */}
        <View style={styles.subContainer}>
        <Icon name="notifications" size={30} color="black" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    
   
  },
  mainContainer: {
    flexDirection: 'row', // Arrange children in a row
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 5,
    position:'absolute',
    bottom:'150',
    justifyContent: 'space-between', // Space out the sub-containers
    alignItems: 'center', // Align items in the center vertically
  },
  subContainer: {
    backgroundColor: 'white',
    padding: 18,
    marginHorizontal: 5, // Horizontal margin between sub-containers

    borderColor: 'black', // Border color
  
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 27,
    fontWeight: 'bold',
    position:'relative',
    right:'-19'
  }
});

export default App;
