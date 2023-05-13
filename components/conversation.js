// Our conversation page.

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const url = "https://ventalis.herokuapp.com/api/user_conversations/";
const token = "";

export default Conversation = ({ navigation }) => {
  /* 
    We need to fetch ALL USER ORDERS
    from https://ventalis.herokuapp.com/api/user_conversations/
  */

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(false);

  const callAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      });
      const json = await response.json();
      // Here we get an array :
      // console.log("json : ", json);
      setData(json[0]["message_set"]);
      console.log("data : ", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Un problème est survenu durant la connexion distante.");
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Conversation Page !</Text>
      {loading ? <Text>...loading...</Text> : <Text>LOADED !</Text>}
      {loading ? null : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Text style={styles.message}>{item.content}</Text>
          )}
        ></FlatList>
      )}
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
  message: {},
});
