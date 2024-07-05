import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { database } from "../database/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ListItem, Avatar } from "@rneui/themed";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    fetchUsers();
  }, [users]);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
