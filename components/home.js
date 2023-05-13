// Our Hone page

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from "react-native";

export default Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>This is our HOME PAGE.</Text>
      <Button
        title="Login ?"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Contacter mon conseiller"
        onPress={() => navigation.navigate('Conversation')}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
