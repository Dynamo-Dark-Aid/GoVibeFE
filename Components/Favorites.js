import React, { useEffect, useState, createRef } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Animated, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
import Swipeable, { SwipeableRef } from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { removeActivity, getActivities } from './slices/activitySlice';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const activityItems = useSelector(state => state.activity.activityItems);

  //search bar:
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);


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

  const handleSearch = () => {
    const searched = activityItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredItems(searched);
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
        {/* search bar: */}
        <ScrollView>
          <View>
            <Text style={styles.header}>Favorites</Text>
            <View style={styles.searchBar}>
              <TextInput
                onChangeText={setSearch}
                value={search}
                style={styles.bar}
                placeholder="Search by name"
              />

              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Swipeable
                key={index}
                renderLeftActions={renderLeftActions}
                onSwipeableLeftOpen={() => handleDelete(item)}
              >
                <View style={styles.favoriteContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.favoriteImage}
                  />
                  <View style={styles.favoriteDetails}>
                    <Text style={styles.favoriteName}>{item.name}</Text>
                    {/* <Text style={styles.favoriteAddress}>{item.location}</Text>
                    <Text style={styles.favoriteAddress}>{item.description}</Text> */}
                  </View>
                </View>
              </Swipeable>
            ))
          ) :
            activityItems.length > 0 ? (
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
                <Text style={styles.noFavoritesText}>No Favorites Listed</Text>
              </View>
            )}
        </ScrollView>
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
    marginTop: 16,
    marginHorizontal: 16
  },
  searchButton: {
    backgroundColor: "#2757F0",
    borderRadius: 10,
    padding: 8,

    alignItems: "center",
    width: 100,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Futura",
  },
  searchBar: {
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  bar: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: 225,
    padding: 4
  }
});

export default FavoritesPage;