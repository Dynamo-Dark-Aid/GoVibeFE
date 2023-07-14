import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { logout } from "./slices/authSlice";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the loginSuccess action
  };

  console.log("User is not logged in", isLoggedIn)
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Button title="Sign in" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Create an account"
          onPress={() => navigation.navigate("SignUp")}
        />
      </View>
    );
  }

  return (
    // <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Text>Welcome, {userName}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  noProfileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
});

export default Profile;
