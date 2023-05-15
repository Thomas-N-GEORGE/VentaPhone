// Main APP.

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import OrdersScreen from "./components/orders";
import DetailScreen from "./components/order-details";
import ConversationScreen from "./components/conversation";
import { CurrentUserContext } from "./utils/user-class";

const Stack = createNativeStackNavigator();

// const user = new User();

function App() {
  // Our User context object
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <NavigationContainer>
    <CurrentUserContext.Provider value={{
        currentUser,
        setCurrentUser
      }}>
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
      </CurrentUserContext.Provider>
    </NavigationContainer>
  );
}

export default App;
