// Our conversation page.

import React, { useContext, useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CurrentUserContext } from "../utils/user-class";
import { jsonDateToFrenchString } from "../utils/utils";

export default Conversation = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [loading, setLoading] = useState(true);
  const [conversationId, setConversationId] = useState(null);
  const [data, setData] = useState(false);
  const messageInput = useRef(null);
  const [message, setMessage] = useState("");
  const messageList = useRef(null);

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
          // messageList.current.scrollToEnd(); // ??
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
      <KeyboardAvoidingView behavior="height" style={styles.form}>
        {loading ? null : (
          <FlatList
            ref={messageList}
            data={data}
            renderItem={({ item }) => (
              <View key={item.id}>
                <Text
                  style={[
                    styles.message,
                    item.author === currentUser.email
                      ? { textAlign: "right", marginLeft: 50 }
                      : { textAlign: "left", marginRight: 50 },
                  ]}
                >
                  {item.content}
                </Text>
                <Text
                  style={[
                    styles.messageDate,
                    item.author === currentUser.email
                      ? { textAlign: "right", marginLeft: 50 }
                      : { textAlign: "left", marginRight: 50 },
                  ]}
                >
                  {jsonDateToFrenchString(item.date_created)}
                </Text>
              </View>
            )}
          ></FlatList>
        )}
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
            ref={messageInput}
            placeholder="Nouveau message"
            autoCapitalize="none"
            autoCorrect={true}
            // autoCorrect={false}
            returnKeyType="send"
            blurOnSubmit={true}
          />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <Pressable onPress={() => submit()} style={{ alignSelf: "center" }}>
            <Text style={[styles.button]}>Envoyer</Text>
          </Pressable>
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
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 16,
    width: 260,
  },
  message: {
    margin: 3,
    padding: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  messageDate: {
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 11,
  },
  button: {
    width: 200,
    padding: 10,
    backgroundColor: "#3a5fa4",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 20,
  },
});
