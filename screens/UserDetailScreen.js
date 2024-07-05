import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { database } from "../database/firebase";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();
    setUser({
      ...user,
      id: docSnap.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    await deleteDoc(doc(database, "users", props.route.params.userId));
    props.navigation.navigate("UserList");
  };

  const updateUser = async () => {
    const docData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    await setDoc(doc(database, "users", props.route.params.userId), docData);
    setUser(initialState);
    props.navigation.navigate("UserList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove the User", "Are you sure?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.constainer}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="#19AC52"
          title="Update User"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete User"
          onPress={() => openConfirmationAlert()}
        />
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

export default UserDetailScreen;
