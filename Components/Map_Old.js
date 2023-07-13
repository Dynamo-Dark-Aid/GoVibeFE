import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default function Map() {
  const { width, height } = Dimensions.get("window");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const LONGDELTA = 0.02 * (width / height);
  const LatLng = {
    latitude: 34.04758,
    longitude: -118.26315,
  };
  handleRegionChange = (region) => {
    setLat(region.latitude);
    setLong(region.longitude);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 34.04758,
          longitude: -118.26315,
          latitudeDelta: 0.02,
          longitudeDelta: LONGDELTA,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChange={this.handleRegionChange}
      >
        <Marker coordinate={LatLng} draggable />
      </MapView>
      <View>
        <Text>Lat: {lat}</Text>
        <Text>Long: {long}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    height: "100%"
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
