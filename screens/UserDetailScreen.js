import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { database } from "../database/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const UserDetailScreen = (props) => {
  const getUserById = async (id) => {
    const docRef = doc(database, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  return (
    <View>
      <Text>User Detail Screen</Text>
      <Text>{props.route.params.userId}</Text>
    </View>
  );
};

export default UserDetailScreen;
