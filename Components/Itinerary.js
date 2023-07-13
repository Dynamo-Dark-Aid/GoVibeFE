import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, Share } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Itinerary = ({ itinerary, removeActivity }) => {
  const handleDelete = (item) => {
    removeActivity(item);
  };

  const handleShare = () => {
    const message = 'A Vibe Has Been Shared With You!';
    Share.share({
      message,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared with activity type
          } else {
            // Shared
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const loadItinerary = async () => {
    try {
      const response = await axios.get('https://govibeapi.onrender.com/add-activity');
      if (response.status === 200) {
        const itineraryData = response.data;
        setItinerary(itineraryData);
      }
    } catch (error) {
      console.error('Error loading itinerary:', error);
    }
  };
  const renderActivity = ({ item }) => {
    const { name, image, address } = item;

    const renderRightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity style={styles.completeContainer}>
          <Animated.Text style={[styles.completeText, { transform: [{ scale }] }]}>
            Complete
          </Animated.Text>
        </TouchableOpacity>
      );
    };

    const renderLeftActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });

      return (
        <TouchableOpacity style={styles.deleteContainer} onPress={() => handleDelete(item)}>
          <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable renderRightActions={renderRightActions} renderLeftActions={renderLeftActions}>
        <View style={styles.activityContainer}>
          <Image source={{ uri: image }} style={styles.activityImage} />
          <View style={styles.activityDetails}>
            <Text style={styles.activityName}>{name}</Text>
            <Text style={styles.activityAddress}>{address}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {itinerary && itinerary.length > 0 ? (
        <FlatList
          data={itinerary}
          renderItem={renderActivity}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.noVibeContainer}>
          <Text style={styles.noVibeText}>No Vibe Created</Text>
        </View>
      )}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share Vibe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },
  activityImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  activityDetails: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityAddress: {
    fontSize: 14,
    color: 'gray',
  },
  completeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#32CD32',
  },
  completeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    backgroundColor: '#FF0000',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 4,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noVibeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVibeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default Itinerary;
