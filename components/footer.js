import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Footer;
