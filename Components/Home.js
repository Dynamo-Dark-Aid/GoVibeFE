import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Profile from "./Profile";
import Itinerary from "./Itinerary";
import Favorites from "./Favorites";
import Map from "./Map";

const Tab = createBottomTabNavigator();

function Home() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#414849",
                    border: "none",
                    paddingBottom: 8,
                    paddingTop: 8,
                    // borderRadius: 30,
                    // margin: 4,
                },
                tabBarActiveTintColor: "#86B6FF",
                tabBarInactiveTintColor: "white",
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    headerShown: false,
                    tabBarLabel: "Map",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="map-marker"
                            color={color}
                            size={size}
                            style={styles.icon}

                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    // headerShown: false,
                    tabBarLabel: "Favorites",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name="heart"
                            color={color}
                            size={22}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Itinerary"
                component={Itinerary}
                options={{
                    headerShown: false,
                    tabBarLabel: "Today's Vibe",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name="map-marker-path"
                            color={color}
                            size={22}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name="account"
                            color={color}
                            size={22}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    tabLabel: {
        // marginTop: 8,
        color: "white",
        fontSize: 12,
    },
});

export default Home;
