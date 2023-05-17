// Main APP.

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./components/login";
import HomeScreen from "./components/home";
import OrdersScreen from "./components/orders";
import DetailScreen from "./components/order-details";
import ConversationScreen from "./components/conversation";
import { CurrentUserContext } from "./utils/user-class";

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};


function App() {
  // Our User context object
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <NavigationContainer theme={MyTheme}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
        }}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#3a5fa4",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerShadowVisible: false,
            
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Mon espace client" }}
          />
          <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{ title: "Mes commandes" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Ventalis" }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    justifyContent: "center",
  },
});
