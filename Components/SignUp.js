import React from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

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
          alert(
            "Email must be valid and password must be at least 6 characters long"
          );
        }
      });
  };
  //receive info and send to backend
  //make regular post request
  //email, name, password (signup) POST (signup)
  //name, password GET (login)

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
      />
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Create a username"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Create a password"
      />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm your password"
      />
      <Button
        style={styles.button}
        title="Register"
        onPress={handleButton}
      ></Button>
      <Text style={styles.policy}>
        By registering, you confirm that you accept our Terms of Use and Privacy
        Policy
      </Text>
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
  policy: {
    fontSize: 10,
    textAlign: "center",
    width: 200,
  },
});

export default SignUp;
