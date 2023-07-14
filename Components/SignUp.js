import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    const userData = {
      user: {
        name: name,
        email: email,
        password: password,
      },
    };

    axios
      .post("https://govibeapi.onrender.com/signup", userData)
      .then((response) => {
        navigation.navigate("Login");
        Alert.alert("Signed up successfully", response.data.message);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          Alert.alert(
            "Email must be valid and password must be at least 6 characters long"
          );
        }
      });
  };

  const handleButton = () => {
    if (!email || !name || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    handleSignUp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        placeholderTextColor="#E8F0F2"
      />
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Create a username"
        placeholderTextColor="#E8F0F2"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Create a password"
        placeholderTextColor="#E8F0F2"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm your password"
        placeholderTextColor="#E8F0F2"
      />

      <View>
        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.policy}>
          By registering, you confirm that you accept our Terms of Use and
          Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "#E8F0F2",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    width: 280,
    margin: 12,
    padding: 10,
    color: "#E8F0F2",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
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
    marginHorizontal: 38,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#E8F0F2",
    fontSize: 20,
    fontFamily: "Futura",
  },
  policy: {
    fontSize: 10,
    textAlign: "center",

    color: "#E8F0F2",
  },
});

export default SignUp;
