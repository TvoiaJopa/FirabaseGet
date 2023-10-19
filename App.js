import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";
import {
  firestore,
  MESSAGES,
  collection,
  onSnapshot,
  query,
  addDoc,
  serverTimestamp,
} from "./firebase/Config";
import { convertFirebaseTimeStampToJs } from "./helpers/Functions";
import { orderBy } from "@firebase/firestore";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Define your Firestore query
    const q = query(
      collection(firestore, MESSAGES),
      orderBy("created", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJs(doc.data().created),
        };
        tempMessages.push(messageObject);
      });
      setMessages(tempMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []); // Add an empty dependency array to run the effect only once

  const save = async () => {
    const messageText = newMessage.toString(); // Convert to string
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: messageText,
      created: serverTimestamp(),
    }).catch((error) => console.log(error));
    setNewMessage("");
    console.log("Message saved");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.message}>
          <Text>Hi babe</Text>
        </View>
        {messages.map((message) => (
          <View key={message.id} style={styles.message}>
            <Text style={styles.messageInfo}>{message.created}</Text>

            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        placeholder="Send message..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)} // Use onChangeText
      />
      <Button title="Send" type="button" onPress={save} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10, // Corrected this line (added the colon)
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
  },
});
