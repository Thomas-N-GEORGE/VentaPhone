// Our Hone page

import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { CurrentUserContext } from "../utils/user-class";

export default Home = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  console.log("user in HOME PAGE : ", currentUser);

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
