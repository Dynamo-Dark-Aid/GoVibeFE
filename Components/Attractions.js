// import React from "react";
// import { StyleSheet, Image, View, Text, Dimensions } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// export default function Attractions({ attraction }) {
//   //   console.log("this is attraction component prop attraction", attraction);
//   //   console.log(attractions[0].parent_display_name);
//   //   console.log(attractions[0]);
//   //   const testlat = attractions[0].latitude;
//   //   console.log(typeof Number(attractions[0].latitude));
//   //   console.log("test log", attractions.photo.images.small.url);
//   //   console.log("attractions components called!!!!!");

//   return (
//     <>
//       <Image
//         source={{ uri: attraction?.photo?.images?.small?.url }}
//         style={styles.image}
//       />
//       <Text>{attraction.name}</Text>
//       <Text>
//         {attraction.description
//           ? attraction.description
//           : "no description for this attraction"}
//       </Text>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
// });
// //         {attractions?.map((attraction, idx) => {
//     return (
//         <View key={idx}>
//           {/* <img src={attraction.photo.images.small.url} /> */}
//           <Text>{attraction.name}</Text>
//           <Text>{attraction.description}</Text>
//         </View>
//       );
//     })}


import React from "react";
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
export default function Attractions({ attraction, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SingleActivity", { activity: attraction })}>
      <View style={styles.cardContainer}>
        {attraction.photo?.images?.small?.url ? (
          <Image
            source={{ uri: attraction.photo.images.small.url }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.textContainer}>
          <Text style={styles.attractionName}>{attraction.name}</Text>
          <Text>
            {attraction.description
              ? attraction.description
              : "No description available for this attraction"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    maxWidth: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 4
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 16,
  },
  attractionName: {
    fontSize: 18,
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
