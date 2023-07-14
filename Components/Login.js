import React, { useState } from "react";
import axios from "axios";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginSuccess, setUserName } from "../store";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = {
      user: {
        email: email,
        password: password,
      },
    };
    axios
      .post("https://govibeapi.onrender.com/login", userData)
      .then((response) => {
        // console.log(response);
        console.log(response.data.status.data.user.name);
        if (response.status === 200) {
          dispatch(loginSuccess(true)); // Dispatch the loginSuccess action

          dispatch(setUserName(response.data.status.data.user.name)); // Dispatch the setUserName action

          navigation.navigate("Home");
          Alert.alert("Logged in successfully", response.data.message);
        }
      })
      .catch((error) => {
        Alert.alert("Try again");
        console.log(error);
      });
  };

  const handleButton = () => {
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    handleLogin();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Log in to Go Vibe</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email address"
          placeholderTextColor="#E8F0F2"
        />
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          placeholderTextColor="#E8F0F2"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleButton}>
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
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#E8F0F2",
    color: "#E8F0F2",
    height: 50,
    width: 280,
    margin: 12,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  container2: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
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
});

export default Login;
