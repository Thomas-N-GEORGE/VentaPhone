// Our order detailed page

import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CurrentUserContext, User } from "../utils/user-class";

export default Detail = ({ route, navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { orderId, orderRef } = route.params;
  const [order, setOrder] = useState(null);
  const [lineItems, setLineItems] = useState(null);

  /* 
    We need to fetch order # from https://ventalis.herokuapp.com/api/orders/#
    And display details.
  */

  const getOrder = () => {
    if (currentUser !== null) {
      currentUser.apiGetOrderDetail(orderId, function (result) {
        if (result) {
          // populate useState vars;
          setOrder(result);
          setLineItems(
            result.lineitem_set.map((item) => (
              <Text key={item.product}>
                {item.product} Qté : {item.quantity} Prix {item.price}HT
              </Text>
            ))
          );
        }
      });
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
