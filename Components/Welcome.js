import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TextAnimation from "./TextAnimation";

const Welcome = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Go Vibe
                    <MaterialIcons
                        name="location-on"
                        size={50}
                        color="#2757F0"
                        iconStyle={styles.icon} />
                </Text>
                <Text style={styles.body}>Discover <TextAnimation /></Text>
                <Text style={styles.body}>right around the corner.</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>Let's Go</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "space-between",
    },
    header: {
        color: "#FFFFFF",
        fontSize: 50,
        fontFamily: "Futura-CondensedExtraBold",
        marginHorizontal: 40,
        marginBottom: 20,
        marginTop: 50
    },
    body: {
        color: "#FFFFFF",
        fontSize: 25,
        fontFamily: "Futura-CondensedExtraBold",
        marginHorizontal: 40,

    },
    button: {
        borderColor: "#E8F0F2",
        borderWidth: 2,
        borderRadius: 10,
        padding: 8,
        marginBottom: 20,
        marginHorizontal: 48,
        alignItems: "center"
    },
    buttonText: {
        color: "#E8F0F2",
        fontSize: 20,
        fontFamily: "Futura",
    },
    icon: {
        margin: 30,
    },

});

export default Welcome;





// import React from "react";
// import { Button, ImageBackground } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput, StyleSheet, Text, View, Alert, Image } from "react-native";
// import { TouchableOpacity } from "react-native";

// const Welcome = ({ navigation }) => {
//     return (
//         <View style={styles.container}>
//             <Image style={styles.image} source={require("../Assets/logo3.png")} />

//             <TouchableOpacity>
//                 <Button
//                     style={styles.button}
//                     title="Lets Go!"
//                     onPress={() => navigation.navigate("Home")}
//                 />
//                 <Button
//                     style={styles.button}
//                     title="Login"
//                     onPress={() => navigation.navigate("Login")}
//                 />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignContent: "center",
//         backgroundColor: "#000000",
//         height: "100%",
//     },
//     image: {
//         position: "absolute",
//         right: 150,
//         top: 150,
//     },
//     button: {
//         margin: 1,
//         backgroundColor: "white",
//         borderRadius: 5
//     },
// });

// export default Welcome;
