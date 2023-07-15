import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from './slices/activitySlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(state => state.activity.favoriteItems);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedFavorites, setSortedFavorites] = useState(favoriteItems || []);
  const hasFavorites = sortedFavorites && sortedFavorites.length > 0;


  const handleDelete = (item) => {
    dispatch(removeFromFavorites(item));
  };

  const handleSort = (value) => {
    setSortOrder(value);

    const sorted = [...sortedFavorites]; 

    if (value === 'asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSortedFavorites(sorted);
  };

  const renderFavorite = ({ item }) => {
    const { name, image, location } = item;

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
      <Swipeable renderLeftActions={renderLeftActions} onSwipeableLeftOpen={() => handleDelete(item)}>
        <View style={styles.favoriteContainer}>
          <Image source={{ uri: image }} style={styles.favoriteImage} />
          <View style={styles.favoriteDetails}>
            <Text style={styles.favoriteName}>{name}</Text>
            <Text style={styles.favoriteAddress}>{location}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  useEffect(() => {
    setSortedFavorites(favoriteItems);
  }, [favoriteItems]);

  return (
    <View style={styles.container}>
      {hasFavorites && (
        <TouchableOpacity style={styles.sortButton} onPress={() => handleSort(sortOrder === 'asc' ? 'desc' : 'asc')}>
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      )}
      {!hasFavorites && (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>No Favorites Listed</Text>
        </View>
      )}
      {hasFavorites && (
        <FlatList
          data={sortedFavorites}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F0F0',
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
});

export default FavoritesPage;
