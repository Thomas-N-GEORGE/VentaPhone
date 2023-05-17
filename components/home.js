// Our Hone page

import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CurrentUserContext } from "../utils/user-class";

export default Home = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {currentUser !== null ? (
          <View>
            <Text style={styles.subTitle}>
              Bienvenue, {currentUser.first_name}{" "}
            </Text>
            <View style={styles.spacer}></View>
            <View style={styles.spacer}></View>
            <Text style={styles.subTitle}>
              Votre conseiller Ventalis: {currentUser.employeeFirstName}
            </Text>
          </View>
        ) : (
          <Text>Vous n'êtes pas connecté(e).</Text>
        )}

        <View style={styles.spacer}></View>
        <Pressable onPress={() => navigation.navigate("Conversation")}>
          <Text style={[styles.button]}>Contacter mon conseiller</Text>
        </Pressable>
        <View style={styles.spacer}></View>
        <View style={styles.spacer}></View>
        <Pressable onPress={() => navigation.navigate("Orders")}>
          <Text style={[styles.button]}>Voir mes commandes</Text>
        </Pressable>
        <View style={styles.spacer}></View>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.button, { marginTop: 150, padding: 10, fontSize: 15, backgroundColor: "#067079" }]}>
            Se connecter avec un autre compte
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  button: {
    width: 300,
    padding: 20,
    backgroundColor: "#3a5fa4",
    color: "white",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 8,
  },
  spacer: {
    height: 20,
  },
});
