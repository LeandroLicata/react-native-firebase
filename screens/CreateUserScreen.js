import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import { database } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("Please provide a name");
    } else {
      try {
        await addDoc(collection(database, "users"), {
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        // alert("User saved successfully");
        props.navigation.navigate("UserList");
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred while saving user");
      }
    }
  };

  return (
    <ScrollView style={styles.constainer}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
});

export default CreateUserScreen;
