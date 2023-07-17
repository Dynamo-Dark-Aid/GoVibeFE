import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { login } from "./slices/authSlice";

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
    dispatch(login(userData))
      .then(() => {
        navigation.navigate("Home");
        Alert.alert("Login Successful");
      })
      .catch((err) => {
        Alert.alert(err.message);
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
        <Text style={styles.title}>Login</Text>
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

        {/* <Button
          // style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
         Create an account</Button> */}
        <Button
          title="Create an Account"
          onPress={() => navigation.navigate("SignUp")}
        ></Button>
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
