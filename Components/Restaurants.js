import React from "react";
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity } from "react-native";

export default function Restaurants({ restaurant, navigation }) {
  // console.log(restaurant)
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SingleActivity", { activity: restaurant })}>
      <View style={styles.cardContainer}>
        {restaurant.photo?.images?.small?.url ? (
          <Image
            source={{ uri: restaurant.photo.images.small.url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.textContainer}>
          <Text style={styles.attractionName}>{restaurant.name}</Text>
          {/* <Text>
            {restaurant.description
              ? restaurant.description
              : "No description available for this attraction"}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 175,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 4,
    zIndex: 2
  },
  image: {
    width: "100%",
    height: 132,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 8,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
