import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { database } from "../database/firebase";
import { collection, getDocs } from "firebase/firestore";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
    </ScrollView>
  );
};

export default UserList;
