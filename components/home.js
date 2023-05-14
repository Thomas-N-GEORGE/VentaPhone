// Our Hone page

import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { CurrentUserContext } from "../utils/user-class";

export default Home = ({ navigation }) => {
  /* 
    We need to fetch user # details
    from https://ventalis.herokuapp.com/api/users/#
    and also user's employee first name.
    BUT not sure where to pass them...
    And display details.
  */
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  console.log("user in HOME PAGE : ", currentUser);

  const fakeUser = {
    first_name: "Thomas",
    last_name: "George",
    employeeFirstName: "Julie",
  };

  return (
    <View style={styles.container}>
      <Text>This is our HOME PAGE.</Text>
      {currentUser !== null ? (
        <View>
          <Text>Bienvenue, {currentUser.first_name} </Text>
          <Text>
            Votre conseiller Ventalis: {currentUser.employeeFirstName}
          </Text>
        </View>
      ) : (
        <Text>Vous n'êtes pas connecté(e).</Text>
      )}
      <Button title="Login ?" onPress={() => navigation.navigate("Login")} />
      <Button
        title="All Orders"
        onPress={() => navigation.navigate("Orders")}
      />
      <Button
        title="Contacter mon conseiller"
        onPress={() => navigation.navigate("Conversation")}
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
