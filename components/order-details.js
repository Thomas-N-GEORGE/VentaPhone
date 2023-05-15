// Our order detailed page

import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CurrentUserContext, User } from "../utils/user-class";
import { API_URL, API_TOKEN_URL } from "../utils/constants";

export default Detail = ({ route, navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { orderId, orderRef } = route.params;
  const [order, setOrder] = useState(null);
  const [lineItems, setLineItems] = useState(null);

  /* 
    We need to fetch order # from https://ventalis.herokuapp.com/api/orders/#
    And display details.
  */
  const getOrder = async () => {
    if (currentUser !== null) {
      try {
        const url = API_URL + `whole_orders/${orderId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `token ${currentUser.token}`,
          },
        });

        const json = await response.json();
        console.log("json in getOrder : ", json);
        // populate useState vars;
        setOrder(json);
        setLineItems(
          json.lineitem_set.map((item) => (
            <Text key={item.product}>
              {item.product} Qté : {item.quantity} Prix {item.price}HT
            </Text>
          ))
        );
        /************/
      } catch (error) {
        console.log(error);
        Alert.alert("Un problème est survenu durant la connexion distante.");
      }
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={styles.container}>
      {order !== null ? (
        <View>
          <Text>Référence : {order.ref_number}</Text>
          <Text>Créée le : {order.date_created}</Text>
          <Text>STATUT : {order.status}</Text>
          <Text>Dernier COMMENTAIRE : {order.comment_set[0].content}</Text>
          <Text>Conseiller : {currentUser.employeeFirstName}</Text>
          <Text>PRODUITS : </Text>
          {lineItems}
          <Text>Prix total HT : {order.total_price}</Text>
          <Text>TVA : {order.vat_amount}</Text>
          <Text>Montant TTC : {order.incl_vat_price}</Text>
        </View>
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
