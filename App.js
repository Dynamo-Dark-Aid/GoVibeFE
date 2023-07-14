import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./Components/Welcome";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SingleActivity from "./Components/SingleActivity";
import Attractions from "./Components/Attractions";
import Map from "./Components/Map";
import store from "./Components/slices/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTransparent: true,
              headerTitle: "",
            }}
          />


          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTransparent: true,
              headerTitle: "",
            }}
          />

          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Attractions" component={Attractions} />
          <Stack.Screen name="SingleActivity" component={SingleActivity} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
