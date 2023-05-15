// Our conversation page.

import React, { useContext, useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CurrentUserContext } from "../utils/user-class";

export default Conversation = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [data, setData] = useState(false);
  const messageInput = useRef(null);
  const [message, setMessage] = useState("");

  /* 
    We need to fetch user conversation
    from https://ventalis.herokuapp.com/api/user_conversations/
  */
  const getConversation = () => {
    if (currentUser !== null) {
      currentUser.apiGetConversation(function (result) {
        if (result) {
          // At this time, there exists only one conversation per Customer.
          setConversationId(Number(result[0].id));
          setData(result[0]["message_set"]);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    getConversation();
    return () => {};
  }, []);

  /* 
    Send message through API. 
    https://ventalis.herokuapp.com/api/messages/ 
  */
  const submit = () => {
    messageInput.current.blur();
    if (currentUser !== null) {
      currentUser.apiSendMessage(conversationId, message, function (result) {
        if (result) {
          // populate useState vars;
          setMessage("");
          getConversation();
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView behavior="padding" style={styles.form}>
        <Text>Conversation Page !</Text>
        {loading ? <Text>...loading...</Text> : <Text>LOADED !</Text>}
        {loading ? null : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Text style={styles.message}>{item.content}</Text>
            )}
          ></FlatList>
        )}
        <Text>Nouveau message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          ref={messageInput}
          placeholder="Votre message"
          autoCapitalize="none"
          autoCorrect={true}
          // autoCorrect={false}
          returnKeyType="send"
          blurOnSubmit={true}
        />
        <View>
          <Button
            onPress={() => {
              console.log("pressed");
              submit();
            }}
            title="Envoyer"
          ></Button>
        </View>
      </KeyboardAvoidingView>
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
  form: {},
  input: {
    margin: 20,
    // marginBottom: 0,
    marginTop: 5,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    width: 200,
  },
  message: {},
});
