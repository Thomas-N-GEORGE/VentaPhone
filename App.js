// Main APP.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import OrdersScreen from "./components/orders";
import DetailScreen from "./components/order-details";
import ConversationScreen from "./components/conversation";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "My Home page Title" }}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{ title: "All My orders" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Please Login : " }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ title: "Détails de la commande" }}
        />
        <Stack.Screen
          name="Conversation"
          component={ConversationScreen}
          options={{ title: "Conversation" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
