// Our ALL orders page.

import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { CurrentUserContext } from "../utils/user-class";
import { jsonDateToFrenchString, statusToString } from "../utils/utils";

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
        if (result) {
          // console.log("result in getOrders, from order page :", result);
          // button list display
          setOrderDetailBtnList(
            result.map((item) => (
              <View key={item.id} style={styles.test}>
                <Pressable
                  // key={item.id}
                  onPress={() =>
                    navigation.navigate("Details", {
                      orderId: item.id,
                      orderRef: item.ref_number,
                    })
                  }
                >
                <View style={[styles.button]} >
                  <Text style={[styles.btnText, {fontWeight: "bold"}]}>Réf. {item.ref_number}</Text>
                  <Text style={styles.btnText}>créée le {jsonDateToFrenchString(item.date_created)}</Text>
                  <Text style={styles.btnText}>{item.incl_vat_price}€ TTC,  statut : {statusToString(item.status)}</Text>
                  </View>
                </Pressable>
              </View>
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
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {currentUser !== null ? (
          orderDetailBtnList
        ) : (
          <Text>Vous n'êtes pas connecté(e)</Text>
        )}
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
  button: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    color: "#3a5fa4",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3a5fa4",
  },
  btnText: {
    color: "#3a5fa4",
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
  },
  spacer: {
    height: 20,
  },
  test: {
    padding: 5,
  },
});
