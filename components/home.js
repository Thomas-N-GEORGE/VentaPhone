// Our Hone page

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from "react-native";

export default Home = ({ navigation }) => {

  /* 
    We need to fetch user # details
    from https://ventalis.herokuapp.com/api/users/#
    and also user's employee first name.
    BUT not sure where to pass them...
    And display details.
  */

  const fakeUser = {
    'first_name': 'Thomas',
    'last_name': 'George',
    'employeeFirstName' : 'Julie',
  }

  return (
    <View style={styles.container}>
      <Text>This is our HOME PAGE.</Text>
      <Text>Mon conseiller : {fakeUser.employeeFirstName}</Text>
      <Button
        title="Login ?"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="All Orders"
        onPress={() => navigation.navigate('Orders')}
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
