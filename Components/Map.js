import React, { useEffect, useState, useDispatch, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Button, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "../googlePlacesConfig";
import Attractions from "../Components/Attractions";
import { getTrailsData } from "./api/TrailsApi";
import { getRestaurantData } from "./api/Restaurants";
import { getPlacesData } from "./api/AttractionsApi";
import * as Location from 'expo-location';
import Restaurants from "./Restaurants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Map({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const mapRef = useRef(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [mapLayout, setMapLayout] = useState(false);
  const [attractions, setAttractions] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [trails, setTrails] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [boundary, setBoundary] = useState({});
  // const [modalVisible, setModalVisible] = useState(false);
  const [option, setOption] = useState("attractions");
  const [dropdownOpen, setDropdownOpen] = useState(false)

  //map loading when api calls testing:
  const [loading, setLoading] = useState(false);

  // change little bit about handleOption function:
  const handleOption = async () => {
    setLoading(true);

    if (option === "attractions") {
      await activityData(boundary);
    }
    if (option === "restaurants") {
      await restaurantdata(boundary);
    }
    if (option === "trails") {
      await traildata();
    }

    setLoading(false);
  };



  const traildata = async () => {
    try {
      const data = await getTrailsData(lat, long)
      setTrails(data)
      setRestaurants([])
      setAttractions([])
      mapRef.current.fitToCoordinates(Object.values(data).map(trail => ({ latitude: Number(trail.lat), longitude: Number(trail.lon) })), {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  const restaurantdata = async (boundary) => {
    try {
      const data = await getRestaurantData(boundary)
      setRestaurants(data)
      setTrails([])
      setAttractions([])
      mapRef.current.fitToCoordinates(Object.values(data).map(restaurant => ({ latitude: Number(restaurant.latitude), longitude: Number(restaurant.longitude) })), {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  const activityData = async (boundary) => {
    try {
      const data = await getPlacesData(boundary)
      setAttractions(data)
      setTrails([])
      setRestaurants([])
      mapRef.current.fitToCoordinates(Object.values(data).map(activity => ({ latitude: Number(activity.latitude), longitude: Number(activity.longitude) })), {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  const trailIds = Object.keys(trails)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const LONGDELTA = 0.02 * (width / height);

  const handleRegionChange = (region) => {
    setLat(region.latitude);
    setLong(region.longitude);
  };

  const handleRegionChangeComplete = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    setLat(latitude);
    setLong(longitude);
    setBoundary({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
  };

  const handleMapLayout = () => {
    setMapLayout(true);
  };

  const attractionsMarkers = () => {
    return attractions?.map((attraction, idx) => {
      return attraction.longitude && attraction.latitude ? (
        <Marker
          title={attraction.name}
          description={attraction.description}
          key={idx}
          coordinate={{
            latitude: Number(attraction.latitude),
            longitude: Number(attraction.longitude),
          }}
        ></Marker>
      ) : null;
    });
  };

  const restaurantsMarkers = () => {
    return restaurants?.map((restaurant, idx) => {
      return restaurant.longitude && restaurant.latitude ? (
        <Marker
          key={idx}
          title={restaurant.name}
          description={restaurant.description ? restaurant.description : "no description"}
          pinColor="green"
          coordinate={{
            latitude: Number(restaurant.latitude),
            longitude: Number(restaurant.longitude)
          }}>

        </Marker>
      ) : null
    })
  }

  console.log('====>', trails)
  const trailMarkers = () => {
    return trailIds?.map((trailId, idx) => {
      const trail = trails[trailId];
      return (
        <Marker
          key={idx}
          title={trail.name}
          description={trail.description}
          pinColor='black'
          coordinate={{
            latitude: Number(trail.lat),
            longitude: Number(trail.lon)
          }}
        >
        </Marker>
      )
    })
  }

  const toggleMenu = () => {
    setDropdownOpen(!dropdownOpen)
  }



  return (
    <View style={styles.container}>

      {loading ? <ActivityIndicator style={styles.loadingSpinner} /> : null}
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        region={
          mapLayout
            ? {
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: LONGDELTA,
            }
            : null
        }
        loadingEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        zoomControlEnabled={true}
        followsUserLocation={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        onLayout={handleMapLayout}
      >
        {attractionsMarkers()}
        {restaurantsMarkers()}
        {trailMarkers()}
        {/* {searchResultMarker()} */}
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleOption()}>
          <Text style={styles.buttonText} >Go Vibe</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.dropdownContainer}>

        <TouchableOpacity onPress={() => toggleMenu()}>
          <MaterialCommunityIcons
            name="chevron-down-circle"
            size={44}
            color={"#414849"}
          // backgroundColor="white"
          // border="black"
          />
        </TouchableOpacity>

        {dropdownOpen ?


          <View style={styles.modal}>
            <Button
              title="Attractions"
              onPress={() => {
                setOption("attractions");
                setDropdownOpen(!dropdownOpen);
              }}
            />
            <Button
              title="Restaurants"
              onPress={() => {
                setOption("restaurants");
                setDropdownOpen(!dropdownOpen);
              }}
            />
            <Button
              title="Trails"
              onPress={() => {
                setOption("trails");
                setDropdownOpen(!dropdownOpen);
              }}
            />
          </View>
          : null}
      </View>


      <View>
      </View>

      <View style={styles.overlay}>
        <ScrollView
          horizontal={true}
          snapToAlignment="center"
          contentContainerStyle={styles.scrollContainer}>
          {attractions ? (
            <View style={styles.results} >
              {attractions.map((attraction, idx) => {
                return <Attractions key={idx} navigation={navigation} attraction={attraction} />;
              })}
            </View>
          ) : null}
          {trailIds.map((trailId, idx) => {
            const trail = trails[trailId]
            return <Text key={idx}>{trail.name}, {trail.description}</Text>
          })}
          {restaurants ? (
            <View style={styles.results} >
              {restaurants.map((restaurant, idx) => {
                return <Restaurants key={idx} navigation={navigation} restaurant={restaurant} />;
              })}
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    top: "10%",
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  button: {
    borderColor: "#2757F0",
    backgroundColor: "#2757F0",
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    marginBottom: 20,
    marginHorizontal: 48,
    alignItems: "center",
    width: 200
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Futura",
  },
  map: {
    flex: 1
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    zIndex: 3,
  },
  loadingSpinner: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 2,
    color: "black",
  },
  dropdownContainer: {
    position: 'absolute',
    top: "10%",
    right: 40,
    alignSelf: "flex-end",
    justifyContent: "center",
    zIndex: 2,
  },
  modal: {
    width: 250,
    height: 150,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});





//                 ****** MIGHT ADD LATER FOR GOOGLE PLACES AUTOCOMPLETE SEARCH ********

// const searchResultMarker = () => {
//   return searchResult?.geometry?.location ? (
//     <Marker
//       coordinate={{
//         latitude: searchResult.geometry?.location.lat,
//         longitude: searchResult.geometry?.location.lng,
//       }}
//     ></Marker>
//   ) : null;
// };

{/* <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        autoFocus={false}
        returnKeyType={"search"}
        listViewDisplayed="auto"
        fetchDetails={true}
        renderDescription={(row) => row.description}
        onFail={(error) => console.error(error)}
        // currentLocation={true}
        onPress={(data, details = null) => {
          // Use the selected place data
          setSearchResult(details);
          // console.log(data, details);
          // console.log("searchResult ----------------->", searchResult);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
      /> */}




{/* <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll}>
          {attractions ? (
            <View style={styles.results}>
              {attractions.map((attraction, idx) => {
                return <Attractions key={idx} navigation={navigation} attraction={attraction} />;
              })}
            </View>
          ) : null
          }
        </ScrollView>
      </View> */}

    //   <View style={styles.modalContainer}>
    //   <TouchableOpacity onPress={() => setModalVisible(true)}>
    //     <MaterialCommunityIcons
    //       name="plus-circle"
    //       size={44}
    //       color={"#414849"}
    //     />
    //   </TouchableOpacity>
    //   <Modal
    //     style={styles.modal}
    //     animationType="fade"
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       setModalVisible(!modalVisible);
    //     }}
    //   >
    //     <View style={styles.modalResults}>
    //       <View style={styles.modal}>
    //         <Button
    //           title="Attractions"
    //           onPress={() => {
    //             setOption("attractions");
    //             setModalVisible(!modalVisible);
    //           }}
    //         />
    //         <Button
    //           title="Restaurants"
    //           onPress={() => {
    //             setOption("restaurants");
    //             setModalVisible(!modalVisible);
    //           }}
    //         />
    //         <Button
    //           title="Trails"
    //           onPress={() => {
    //             setOption("trails");
    //             setModalVisible(!modalVisible);
    //           }}
    //         />
    //       </View>
    //     </View>
    //   </Modal>
    // </View>