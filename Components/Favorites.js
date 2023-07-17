import React, { useEffect, useState, createRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import Swipeable, { SwipeableRef } from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { removeActivity, getActivities } from './slices/activitySlice';

const FavoritesPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const activityItems = useSelector(state => state.activity.activityItems);

  const swipeableRef = createRef();
  const [deletedItemId, setDeletedItemId] = useState(null);
  const [isSwipeableOpen, setIsSwipeableOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getActivities());
    }
  }, [dispatch, isLoggedIn]);

  const handleDelete = (item) => {
    dispatch(removeActivity(item));
    setDeletedItemId(item.id);
    setIsSwipeableOpen(true);
  };

  useEffect(() => {
    if (isSwipeableOpen) {
      swipeableRef.current.close();
      setIsSwipeableOpen(false);
    }
  }, [isSwipeableOpen]);

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
  return (
    <>
      <SafeAreaView>
        <View>
          <Text style={styles.header}>Favorites</Text>
        </View>
        {activityItems.length > 0 ? (
          activityItems.map((item, index) => (
            <Swipeable
              key={index}
              ref={item.id === deletedItemId ? swipeableRef : null}
              renderLeftActions={renderLeftActions}
              onSwipeableLeftOpen={() => handleDelete(item)}
            >
              <View style={styles.favoriteContainer}>
                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                <View style={styles.favoriteDetails}>
                  <Text style={styles.favoriteName}>{item.name}</Text>
                  {/* <Text style={styles.favoriteAddress}>{item.address}</Text>
                  <Text style={styles.favoriteAddress}>{item.description}</Text> */}
                </View>
              </View>

            </Swipeable>
          ))
        ) : (
          <View style={styles.noFavoritesContainer}>
            <Text style={styles.noFavoritesText}>No vibes favorited!</Text>
          </View>
        
        )}
      </SafeAreaView>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    marginHorizontal: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  favoriteImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  favoriteDetails: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteAddress: {
    fontSize: 14,
    color: 'gray',
  },
  leftActions: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#FF0000',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Futura"
  },
  sortButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  noFavoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    marginHorizontal: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  noFavoritesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    color: "black",
    fontSize: 50,
    fontFamily: "Futura-CondensedExtraBold",
    margin: 16
  },
});

export default FavoritesPage;