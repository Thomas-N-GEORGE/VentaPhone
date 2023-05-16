// Our order detailed page

import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CurrentUserContext, User } from "../utils/user-class";
import { jsonDateToFrenchString, statusToString } from "../utils/utils";

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
              <Text key={item.product} style={{ textAlign: "right" }}>
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
    <ScrollView>
      <View style={styles.container}>
        {order !== null ? (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              Référence : {order.ref_number}
            </Text>
            <Text>Créée le : {jsonDateToFrenchString(order.date_created)}</Text>
            <View style={styles.spacer}></View>
            <Text style={{ fontWeight: "bold" }}>
              STATUT : {statusToString(order.status)}
            </Text>

            <Text>
              Commentaire de votre conseiller {currentUser.employeeFirstName} :
            </Text>
            <Text style={[styles.text, { textAlign: "left" }]}>
              {order.comment_set[0].content}
            </Text>
            <View style={styles.spacer}></View>
            <Text style={{ fontWeight: "bold" }}>PRODUITS : </Text>
            {lineItems}
            <View style={styles.spacer}></View>
            <View style={styles.spacer}></View>
            <Text style={styles.price}>
              Prix total HT : {order.total_price} €
            </Text>
            <Text style={styles.price}>
              TVA : {order.vat_amount} €
            </Text>
            <Text style={[styles.price, {fontSize: 16}]}>
              Montant TTC : {order.incl_vat_price} €
            </Text>
          </View>
        ) : (
          <Text>Vous n'êtes pas connecté(e)</Text>
        )}
        <StatusBar style="auto" />
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
  spacer: {
    height: 20,
  },
  price: {
    fontWeight: "bold",
    textAlign: "right",
  },
});
