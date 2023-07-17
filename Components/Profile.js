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
import Login from "./Login";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const activityItems = useSelector((state) => state.activity.activityItems);
  const itineraryItems = useSelector((state) => state.itinerary.itineraryItems);
  const completedCount = useSelector((state) => state.user.completedCount);

  const favoriteVibesCount = activityItems.length;
  const currentVibesCount = itineraryItems.length;

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the loginSuccess action
  };

  console.log("User is not logged in", isLoggedIn);
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <SafeAreaView style={styles.containerThree}>
      <Text style={styles.centerText}>Welcome, {userName}</Text>
      <Text style={styles.centerText}>
        You have {favoriteVibesCount} favorite vibes.
      </Text>
      <Text style={styles.centerText}>
        You have {currentVibesCount} vibes for today.
      </Text>
      <Text style={styles.centerText}>
        Total vibes Completed: {completedCount}
      </Text>

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
