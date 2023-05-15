// Our user class module.

import React from "react";
import { Alert } from "react-native";
import { API_URL, API_TOKEN_URL } from "./constants";

// Context for whole app.
export const CurrentUserContext = React.createContext(null);

export class User {
  constructor(
    user_id = null,
    email = null,
    password = null,
    role = null,
    token = null,
    first_name = null,
    last_name = null,
    reg_number = null,
    conversation_set = null,
    employeeFirstName = null
  ) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.token = token;
    this.first_name = first_name;
    this.last_name = last_name;
    this.reg_number = reg_number;
    this.conversation_set = conversation_set;
    this.employeeFirstName = employeeFirstName;
  }

  resetAllUserFields = () => {
    // Reset all the fields of User object.
    this.user_id = null;
    this.email = null;
    this.password = null;
    this.role = null;
    this.token = null;
    this.first_name = null;
    this.last_name = null;
    this.reg_number = null;
    this.conversation_set = null;
    this.employeeFirstName = null;
  };

  apiLoginUser = async (callback) => {
    /** Here we have to make a serie of calls to API
     * to fetch all the necessary user info for the app.
     * */
    try {
      console.log("at top of apiLoginUser : ", this.email, this.password);

      /*******************/
      /* 1. Fetch token. */
      /*******************/
      const response1 = await fetch(API_TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.email,
          password: this.password,
        }),
      });

      // Now that we have made our first call attempt to API,
      // we reset password for security, just to be sure.
      this.password = null;

      const json1 = await response1.json();
      console.log("json1 in login : ", json1);

      // Abort if username / password no good.
      if ("non_field_errors" in json1) {
        this.resetAllUserFields();
        Alert.alert("Identifiant et/ou mot de passe incorrect(s)");
        return callback(false);
      }

      // Continue with valid credentials, populate the fields we got.
      this.user_id = json1.user_id;
      this.email = json1.email;
      this.role = json1.role;
      this.token = json1.token;

      /***********************/
      /* 2. fetch user info. */
      /***********************/
      const url2 = API_URL + `users/${this.user_id}/`;
      const response2 = await fetch(url2, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
      });

      const json2 = await response2.json();
      console.log("json2 in login : ", json2);

      // Abort if we have wrong user role.
      if (json2.role !== "CUSTOMER") {
        this.resetAllUserFields();
        Alert.alert("Identifiant et/ou mot de passe incorrect(s)");
        return callback(false);
      }

      // Continue  with valid CUSTOMER role, populate more user fields.
      this.first_name = json2.first_name;
      this.last_name = json2.last_name;
      this.reg_number = json2.reg_number;
      this.conversation_set = json2.conversation_set;

      /**************************************************/
      /* 3. Fetch employee reg # from customer account. */
      /**************************************************/
      const url3 = API_URL + `customeraccounts/?customer=${this.email}`;
      const response3 = await fetch(url3, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
      });
      const json3 = await response3.json();
      console.log("json3 in login : ", json3);

      // Here we get an array :
      const employeeReg = json3[0]["employee_reg"];

      /*********************************/
      /* 4. Fetch employee first name. */
      /*********************************/
      const url4 = API_URL + `users/?reg_number=${employeeReg}`;
      const response4 = await fetch(url4, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
      });
      const json4 = await response4.json();
      console.log("json4 in login : ", json4);

      // Here we get an array :
      this.employeeFirstName = json4[0]["first_name"];

      console.log("this from apiCompleteUser : ", this);
      // And finally return "complete" user.
      return callback(this);

      /************/
    } catch (error) {
      console.log(error);
      this.resetAllUserFields();
      Alert.alert("Un problème est survenu durant la connexion distante.");
      return callback(false);
    }
  };

  apiGetOrders = async (callback) => {
    /* Fetch user related orders from API. */
    /* https://ventalis.herokuapp.com/api/user_orders/ */
    try {
      console.log("IN apiGetOrders.");
      const url = API_URL + "user_orders/";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
      });

      const json = await response.json();
      console.log("json in apiGetOrders : ", json);
      return callback(json);
      /************/
    } catch (error) {
      console.log(error);
      Alert.alert("Un problème est survenu durant la connexion distante.");
      return callback(false);
    }
  };

  // "orederId is not a function..." Not solved yet.
  // apiGetOrderDetail = async (orderId, callback) => {
  //   /* Fetch specific order from API. */
  //   /* https://ventalis.herokuapp.com/api/whole_orders/# */
  //   console.log("IN GetOrderDetail, orderId = ", orderId);
  //   try {
  //     const url = API_URL + `whole_orders/${orderId}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `token ${this.token}`,
  //       },
  //     });

  //     const json = await response.json();
  //     console.log("json in apiGetOrderDetail : ", json);
  //     return callback(json);
  //     /************/
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Un problème est survenu durant la connexion distante.");
  //     return callback(false);
  //   }
  // };

  apiGetConversation = async (callback) => {
    /* Fetch related user conversation from API. */
    /* https://ventalis.herokuapp.com/api/user_conversations/ */
    try {
      const url = API_URL + "user_conversations/";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
      });

      const json = await response.json();
      console.log("json in apiGetConversation : ", json);
      // At this time, there exists only one conversation per Customer.
      return callback(json);
      /************/
    } catch (error) {
      console.log(error);
      Alert.alert("Un problème est survenu durant la connexion distante.");
      return callback(false);
    }
  };

  apiSendMessage = async (message, callback) => {
    /* Send message through API. */
    /* https://ventalis.herokuapp.com/api/messages/ */
    try {
      const url = API_URL + "messages/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `token ${this.token}`,
        },
        body: JSON.stringify({
          content: message,
        }),
      });

      const json = await response.json();
      console.log("json in apiSend Message : ", json);
      // if (response.statusText !== "OK") {
      // throw new Error('Un problème est survenu durant la connexion distante.');
      // }
      return callback(json);
      /************/
    } catch (error) {
      console.log(error);
      Alert.alert("Un problème est survenu durant la connexion distante.");
      return callback(false);
    }
  };
}
