import React, { useEffect, useState, useRef, createRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, Animated, Share } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SwipeableRef } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { displayItinerary, displayArchivedItinerary, removeFromItinerary, archiveItinerary } from './slices/itinerarySlice';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { clearItineraryItems } from './slices/itinerarySlice';

const Itinerary = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const itineraryItems = useSelector(state => state.itinerary.itineraryItems);
  const [option, setOption] = useState("currentItinerary");
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const swipeableRef = useRef({});


  const [deletedItemId, setDeletedItemId] = useState(null);
  const [archivedItemId, setArchivedItemId] = useState(null);
  const [isSwipeableOpen, setIsSwipeableOpen] = useState(false);
  const [openSwipeableId, setOpenSwipeableId] = useState(null);

  useEffect(() => {
    if (isLoggedIn && option === "currentItinerary") {
      console.log("currentItinerary should be displayed")
      dispatch(displayItinerary());
    } else if (isLoggedIn && option === "archivedItinerary") {
      console.log("archivedItinerary should be displayed")
      dispatch(displayArchivedItinerary());
      dispatch(clearItineraryItems());
    }
  }, [dispatch, isLoggedIn, option]);

  const handleDelete = (item) => {
    dispatch(removeFromItinerary(item));
    setOpenSwipeableId(item.id);
  };

  const handleArchive = (item) => {
    dispatch(archiveItinerary(item));
    setOpenSwipeableId(item.id);
  }


  useEffect(() => {
    if (openSwipeableId) {
      swipeableRef.current[openSwipeableId]?.close?.();
      setOpenSwipeableId(null);
    }
  }, [openSwipeableId])

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

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        <Animated.Text style={[styles.completeText, { transform: [{ scale }] }]}>
          Complete
        </Animated.Text>
      </View>
    );
  };

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.leftActions}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    );
  };

  const toggleMenu = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <>
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => toggleMenu()}>
        <MaterialCommunityIcons
          name="chevron-down-circle"
          size={44}
          color={"#414849"}
        />
      </TouchableOpacity>

      {dropdownOpen ?

        <View style={styles.modal}>
          <Button
            title="Current Itinerary"
            onPress={() => {
              setOption("currentItinerary");
              setDropdownOpen(!dropdownOpen);
            }}
          />
          <Button
            title="Past Itinerary Items"
            onPress={() => {
              setOption("archivedItinerary");
              setDropdownOpen(!dropdownOpen);
            }}
          />
        </View>
        : null}
      </View>

      {isLoggedIn && itineraryItems.length > 0 ? (
        option === "currentItinerary" ? (
          itineraryItems.map((item, index) => (
            <Swipeable
              key={item.id}
              ref={ref => (swipeableRef.current[item.id] = ref)}
              renderRightActions={renderRightActions}
              renderLeftActions={renderLeftActions}
              onSwipeableLeftOpen={() => handleDelete(item)}
              onSwipeableRightOpen={() => handleArchive(item)}
            >
              <View style={styles.activityContainer}>
                <Image source={{ uri: item.image }} style={styles.activityImage} />
                <View style={styles.activityDetails}>
                  <Text style={styles.activityName}>{item.name}</Text>
                  <Text style={styles.activityAddress}>{item.location}</Text>
                  <Text style={styles.activityAddress}>{item.description}</Text>
                </View>
              </View>
            </Swipeable>
          ))
        ) : (
          itineraryItems.map((item, index) => (
            <View style={styles.activityContainer} key={item.id}>
              <Image source={{ uri: item.image }} style={styles.activityImage} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityName}>{item.name}</Text>
                <Text style={styles.activityAddress}>{item.location}</Text>
                <Text style={styles.activityAddress}>{item.description}</Text>
              </View>
            </View>
          ))
        )
      ) : (
        <View style={styles.noVibeContainer}>
          <Text style={styles.noVibeText}>No Vibe Created</Text>
        </View>
      )}

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share Vibe</Text>
      </TouchableOpacity>
    </>
  )
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
  leftActions: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#FF0000',
  },
  rightActions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    backgroundColor: '#32CD32',
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

