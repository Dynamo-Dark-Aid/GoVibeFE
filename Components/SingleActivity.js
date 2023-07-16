import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getActivities, removeActivity } from './slices/activitySlice';
import { addToItinerary, removeFromItinerary, displayItinerary } from './slices/itinerarySlice';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';


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

  console.log("activityItems", activity)

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
        description: activity.description,
        image: activity.photo.images.large.url
      }
    }
    dispatch(addActivity(activityData));
  };

  const handleAddToItinerary = () => {
    const itineraryData = {
      itinerary: {
        name: activity.name,
        location: activity.address,
        description: activity.description,
        image: activity.photo.images.large.url
      }
    }
    dispatch(addToItinerary(itineraryData));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeActivity(activity));
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
    <View style={styles.container}>
      {imageSource && (
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{activity.name}</Text>
          </View>
          <View style={styles.iconContainer}>
            {isActivityFavorite ? (
              <TouchableOpacity onPress={handleRemoveFromFavorites}>
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                // paddingLeft = {24}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleAddToFavorites}
              >
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                />
              </TouchableOpacity>
            )}
            {isActivityInItinerary ? (
              <TouchableOpacity onPress={handleRemoveFromItinerary}>
                <MaterialCommunityIcons
                  name="minus"
                  size={24}
                  paddingLeft={8}

                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleAddToItinerary}>
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  paddingLeft={8}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{activity.address}</Text>
        </View>
        <ScrollView style={styles.scrollBox}>
          <Text style={styles.description}>{activity.description}</Text>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleDirections}>
          <Text style={styles.buttonText}>Directions</Text>
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
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    height: height / 2.5,
    paddingBottom: 12
  },
  image: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%"
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginRight: 16
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#2757F0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 200
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: "100 %"
  },
  iconContainer: {
    flexDirection: "row",
  },
  scrollBox: {
    marginBottom: 8,
    paddingHorizontal: 0,
    width: "100%"
  },
  nameContainer: {
    flex: 1
  },
  addressContainer: {
    alignSelf: "flex-start"
  }

});
SingleActivity.navigationOptions = {
  title: "Activity Details",
};
export default SingleActivity;

