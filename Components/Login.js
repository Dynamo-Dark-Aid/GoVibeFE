import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Alert,
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
      <Text style={styles.title}>Go Vibe</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email address"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
      />
      <Button style={styles.button} title="Sign in" onPress={handleButton} />
      <Button
        title="Create an account"
        onPress={() => navigation.navigate("SignUp")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
