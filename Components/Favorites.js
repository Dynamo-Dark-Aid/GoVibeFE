import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, SafeAreaView } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { removeActivity, getActivities } from './slices/activitySlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  // const [sortOrder, setSortOrder] = useState('asc');
  // const [sortedFavorites, setSortedFavorites] = useState(favoriteItems || []);
  // const hasFavorites = sortedFavorites && sortedFavorites.length > 0;
  const activityItems = useSelector(state => state.activity.activityItems);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch])

  console.log("THIS FIRED", activityItems)

  const handleDelete = (item) => {
    dispatch(removeActivity(item));
  };

  // const handleSort = (value) => {
  //   setSortOrder(value);

  //   const sorted = [...sortedFavorites]; 

  //   if (value === 'asc') {
  //     sorted.sort((a, b) => a.name.localeCompare(b.name));
  //   } else {
  //     sorted.sort((a, b) => b.name.localeCompare(a.name));
  //   }

  //   setSortedFavorites(sorted);
  // };

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
            renderLeftActions={renderLeftActions}
            onSwipeableLeftOpen={() => handleDelete(item)}
          >
            <View style={styles.favoriteContainer}>
              <Image source={{ uri: item.image }} style={styles.favoriteImage} />
              <View style={styles.favoriteDetails}>
                <Text style={styles.favoriteName}>{item.name}</Text>
                {/* <Text style={styles.favoriteAddress}>{item.location}</Text> */}
                {/* <Text style={styles.favoriteAddress}>{item.description}</Text> */}
                {/* <Text>Adding this to commit changes</Text> */}
              </View>
            </View>
          </Swipeable>
        ))
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>No Favorites Listed</Text>
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
    padding:8,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginBottom: 10,
    borderColor: 'black', // Add this line
    borderWidth: 1, // Add this line for 1 pixel black border, adjust as needed
    borderRadius: 5, // Optional, if you want rounded corners
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  header: {
    color: "black",
    fontSize: 50,
    fontFamily: "Futura-CondensedExtraBold",
    margin: 16
},
});

export default FavoritesPage;