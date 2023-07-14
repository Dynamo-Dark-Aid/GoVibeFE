import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Go Vibe</Text>
          <MaterialIcons
            name="location-on"
            size={50}
            color="#2757F0"
            style={styles.icon}
          />
        </View>

        <View style={styles.containerTwo}>
          <Text style={styles.centerText}>Favorite your vibes,</Text>
          <Text style={styles.centerText}> share your vibes.</Text>
          <Text style={styles.centerText}>Discover your vibe.</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.containerThree}>
      <Text style={styles.centerText}>Welcome, {userName}</Text>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
  },
  containerTwo: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  header: {
    color: "#FFFFFF",
    fontSize: 60,
    fontFamily: "Futura-CondensedExtraBold",
    marginHorizontal: 40,
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 42,
  },
  icon: {
    top: -14,
    right: 40,
  },
  noProfileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  button: {
    borderColor: "#E8F0F2",
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginBottom: 20,
    marginHorizontal: 48,
    alignItems: "center",
  },
  buttonText: {
    color: "#E8F0F2",
    fontSize: 20,
    fontFamily: "Futura",
  },
  centerText: {
    color: "#E8F0F2",
    fontSize: 20,
    fontFamily: "Futura",
    textAlign: "center",
  },
  containerThree: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#000000",
  },
});

export default Profile;
