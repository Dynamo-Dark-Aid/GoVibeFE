import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Share } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

const ShareItinerary = ({ itinerary }) => {
  // Function to generate a unique identifier
  const generateUniqueId = () => {
    return uuidv4();
  };

  // Function to save the shared itinerary using the unique identifier
  const saveSharedItinerary = (uniqueId, itinerary) => {
    // Placeholder implementation - replace with your own logic to save the shared itinerary
    console.log(`Saving shared itinerary with ID: ${uniqueId}`);
    console.log(itinerary);
  };

  // Function to handle the share action
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
            const uniqueId = generateUniqueId();
            saveSharedItinerary(uniqueId, itinerary);
          }
        } else if (result.action === Share.dismissedAction) {
          // Dismissed
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share Vibe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 12,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShareItinerary;
