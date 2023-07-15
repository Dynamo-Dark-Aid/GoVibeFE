import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getActivities, removeActivity, addToFavorites, removeFromFavorites } from './slices/activitySlice';
import { addToItinerary, removeFromItinerary, displayItinerary } from './slices/itinerarySlice';

const SingleActivity = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { activity } = route.params || {};
  const activityItems = useSelector(state => state.activity.activityItems);
  const itineraryItems = useSelector(state => state.itinerary.itineraryItems);
  const isActivityFavorite = activityItems.some(item => item.name === activity.name);
  const isActivityInItinerary = itineraryItems.some(item => item.name === activity.name);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    console.log("THIS IS ITINERARY", itineraryItems)
    dispatch(displayItinerary());
  }, [dispatch]);

  console.log("activityItems", activityItems)

  const handleDirections = () => {
    if (activity && activity.address) {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity.address
      )}`;
      Linking.openURL(mapsUrl);
    }
  };

  const handleAddToFavorites = () => {
    const activityData = {
      activity: {
        name: activity.name,
        location: activity.address,
        image: activity.image,
      }
    }
    dispatch(addToFavorites(activityData)); // Changed from addActivity
  };

  const handleAddToItinerary = () => {
    const itineraryData = {
      itinerary: {
        name: activity.name,
        location: activity.address
      }
    }
    dispatch(addToItinerary(itineraryData));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(activity)); // Changed from removeActivity
  };

  const handleRemoveFromItinerary = () => {
    dispatch(removeFromItinerary(activity));
  }

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
    <ScrollView contentContainerStyle={styles.container}>
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

        {isActivityFavorite ? (
          <TouchableOpacity style={styles.button} onPress={handleRemoveFromFavorites}>
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
        {isActivityInItinerary ? (
          <TouchableOpacity style={styles.button} onPress={handleRemoveFromItinerary}>
            <Text style={styles.buttonText}>Remove from Itinerary</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAddToItinerary}>
            <Text style={styles.buttonText}>Add to Itinerary</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
