// Our order detailed page

import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default Detail = ({ route, navigation }) => {
  // get params
  const { orderId, orderRef } = route.params;

  /* 
    We need to fetch order # from https://ventalis.herokuapp.com/api/orders/#
    And display details.
  */

  return (
    <View style={styles.container}>
      <Text>
        ORDER id {orderId} , ref {orderRef}
      </Text>
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
