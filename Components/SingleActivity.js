import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Linking } from 'react-native';
import axios from 'axios';

const SingleActivity = ({ activity, addToFavorites, addToItinerary }) => {
  const { name, image, address, description } = activity; 

  const [favorites, setFavorites] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    loadFavorites();
    loadItinerary();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:3001/add-activity');
      if (response.status === 200) {
        const favoritesData = response.data;
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadItinerary = async () => {
    try {
      const response = await axios.get('http://localhost:3001/add-activity');
      if (response.status === 200) {
        const itineraryData = response.data;
        setItinerary(itineraryData);
      }
    } catch (error) {
      console.error('Error loading itinerary:', error);
    }
  };

  const saveFavorites = async () => {
    try {
      await axios.post('http://localhost:3001/favorites', favorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const saveItinerary = async () => {
    try {
      await axios.post('http://localhost:3001/itinerary', itinerary);
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  const handleDirections = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(mapsUrl);
  };

  const handleAddToFavorites = () => {
    addToFavorites(activity);
    setFavorites(prevFavorites => [...prevFavorites, activity]);
  };

  const handleAddToItinerary = () => {
    addToItinerary(activity);
    setItinerary(prevItinerary => [...prevItinerary, activity]);
  };

  const handleRemoveFromFavorites = () => {
    const updatedFavorites = favorites.filter(favorite => favorite.id !== activity.id);
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    if (favorites.length > 0) {
      saveFavorites();
    }
  }, [favorites]);

  useEffect(() => {
    if (itinerary.length > 0) {
      saveItinerary();
    }
  }, [itinerary]);

  return (
    <View>
      <Image source={image} style={{ width: 200, height: 200 }} />
      <Text>{name}</Text>
      <Text>{address}</Text>
      <Text>{description}</Text>
      <Button title="Directions" onPress={handleDirections} />
      {favorites.includes(activity) ? (
        <Button title="Remove from Favorites" onPress={handleRemoveFromFavorites} />
      ) : (
        <Button title="Add to Favorites" onPress={handleAddToFavorites} />
      )}
      <Button title="Add to Itinerary" onPress={handleAddToItinerary} />
    </View>
  );
};

export default SingleActivity;
