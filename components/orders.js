// Our ALL orders page.

import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, YellowBox } from "react-native";
import { ordersData } from "../fake-data/user-orders";
import { CurrentUserContext, User } from "../utils/user-class";

// Context for buttons in view.
export const OrderIdContext = React.createContext();

export default Order = ({ navigation }) => {
  /* 
    We need to fetch ALL USER ORDERS
    from https://ventalis.herokuapp.com/api/orders/#
  */
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [orderDetailBtnList, setOrderDetailBtnList] = useState(null);

  const getOrders = () => {
    if (currentUser !== null) {
      currentUser.apiGetOrders(function (result) {
        console.log("get orders Called.");
        if (result) {
          console.log("result in getOrders, from order page :", result);
          // button list display
          setOrderDetailBtnList(
            result.map((item) => (
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
            ))
          );
        } else {
        }
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is our ALL ORDERS PAGE</Text>
      {currentUser !== null ? (
        orderDetailBtnList
      ) : (
        <Text>Vous n'êtes pas connecté(e)</Text>
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
});
