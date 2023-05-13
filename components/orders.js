// Our ALL orders page.

import React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, YellowBox } from "react-native";
import { ordersData } from "../fake-data/user-orders";

// Context for buttons in view.
export const OrderIdContext = React.createContext();

export default Order = ({ navigation }) => {
  /* 
    We need to fetch ALL USER ORDERS
    from https://ventalis.herokuapp.com/api/orders/#
  */
  const data = ordersData();
  //   console.log(data);

  /* Button array, one button per order to go to details. */
  const buttonsListArr = data.map((item) => (
    <Button
      title={item.ref_number}
      key={item.id}
      onPress={() =>
        /* Navigate to the Details route with params */
        navigation.navigate("Details", {
          orderId: item.id,
          orderRef: item.ref_number,
        })
      }
    />
  ));

  return (
    <View style={styles.container}>
      <Text>This is our ALL ORDERS PAGE</Text>

      <Button
        title="Go to Details"
        onPress={() => {
          /* Navigate to the Details route with params */
          navigation.navigate("Details", {
            orderId: 86,
            orderRef: "Whatever order reference",
          });
        }}
      />
      {buttonsListArr}

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
