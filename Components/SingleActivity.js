
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';


const SingleActivity = ({ addToFavorites, addToItinerary, navigation }) => {
  const route = useRoute();
  const { activity } = route.params || {};
  const [favorites, setFavorites] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const saveFavorites = async () => {
    try {
      await axios.post("https://govibeapi.onrender.com/favorites", favorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };
  const saveItinerary = async () => {
    try {

      await axios.post("https://govibeapi.onrender.com/itineraries", itinerary);

    } catch (error) {
      console.error("Error saving itinerary:", error);
    }
  };
  const handleDirections = () => {
    if (activity && activity.address) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity.address
      )}`;
      Linking.openURL(mapsUrl);
    }
  };
  const handleAddToFavorites = () => {
    console.log("this is an activity", activity);
    addToFavorites(activity);
    setFavorites((prevFavorites) => [...prevFavorites, activity]);
  };
  const handleAddToItinerary = () => {
    addToItinerary(activity);
    setItinerary((prevItinerary) => [...prevItinerary, activity]);
  };
  const handleRemoveFromFavorites = () => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== activity.id
    );
    setFavorites(updatedFavorites);
  };
  useEffect(() => {
    if (favorites.length > 0) {
      saveFavorites();
    }
  }, [favorites]);
  useEffect(() => {
    navigation.setOptions({

      title: "Activity Details",

    });
  }, []);
  useEffect(() => {
    if (itinerary.length > 0) {
      saveItinerary();
    }
  }, [itinerary]);
  if (!activity) {
    return null;
  }
  let image = null;
  if (
    activity.photo &&
    activity.photo.images &&
    activity.photo.images.large &&
    activity.photo.images.large.url
  ) {
    image = activity.photo.images.large.url;
  }
  const imageSource = image ? { uri: image } : null;
  return (
    <View style={styles.container}>
      {imageSource && (
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.address}>{activity.address}</Text>
        <Text style={styles.description}>{activity.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handleDirections}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>

        {favorites.some((favorite) => favorite.id === activity.id) ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleRemoveFromFavorites}
          >
            <Text style={styles.buttonText}>Remove from Favorites</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddToFavorites}
          >

            <Text style={styles.buttonText}>Add to Favorites</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleAddToItinerary}>
          <Text style={styles.buttonText}>Add to Itinerary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",

    height: height / 3,
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
    borderRadius: 8,

    backgroundColor: "#42A5F5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
SingleActivity.navigationOptions = {
  title: "Activity Details",
};
export default SingleActivity;

