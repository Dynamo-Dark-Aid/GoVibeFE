import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Picker } from '@react-native-picker/picker';

const FavoritesPage = ({ favorites, removeFavorite }) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedFavorites, setSortedFavorites] = useState(favorites || []);
  const hasFavorites = sortedFavorites.length > 0;

  const handleDelete = (item) => {
    removeFavorite(item);
  };

  const handleSort = (value) => {
    setSortOrder(value);

    const sorted = [...favorites];

    if (value === 'asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSortedFavorites(sorted);
  };

  const renderFavorite = ({ item }) => {
    const { name, image, address } = item;

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
            <Text style={styles.favoriteAddress}>{address}</Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      {hasFavorites && (
        <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      )}
      {hasFavorites && isSortOpen && (
        <View style={styles.sortContainer}>
          <Picker
            style={styles.sortPicker}
            selectedValue={sortOrder}
            onValueChange={(value) => handleSort(value)}
          >
            <Picker.Item label="A-Z" value="asc" />
            <Picker.Item label="Z-A" value="desc" />
          </Picker>
        </View>
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
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  sortPicker: {
    flex: 1,
    height: 40,
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
