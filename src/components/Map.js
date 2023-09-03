import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import themes from "../common/theme/themes";
import { fetchAddressByCoords, fetchCoordinatesByAddress, fetchDirections } from "../actions/googleMapActions";
// const a = {
//   address_components: [
//     { long_name: "PWMC+84X", short_name: "PWMC+84X", types: [Array] },
//     { long_name: "Panadura", short_name: "Panadura", types: [Array] },
//     { long_name: "Kalutara", short_name: "Kalutara", types: [Array] },
//     { long_name: "Western Province", short_name: "WP", types: [Array] },
//     { long_name: "Sri Lanka", short_name: "LK", types: [Array] },
//   ],
//   formatted_address: "PWMC+84X, Panadura, Sri Lanka",
//   geometry: {
//     location: { lat: 6.733363, lng: 79.92034559999999 },
//     location_type: "GEOMETRIC_CENTER",
//     viewport: { northeast: [Object], southwest: [Object] },
//   },
//   place_id: "ChIJceUraz9P4joRBzYzE5RzLRQ",
//   types: ["establishment", "food", "point_of_interest", "restaurant"],
// };
const Map = ({data}) => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [locationEnabled, setLocationEnabled] = useState(true);

  useEffect(() => {
    (async () => {
  try {
    // Check if location services are enabled
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (isEnabled) {
      // Request permission to access the device's location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // Get the current location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        // Handle the case when location permission is not granted
        setLocationEnabled(false);
      }
    } else {
      // Handle the case when location services are disabled
      setLocationEnabled(false);
    }
  } catch (error) {
    console.log("🚀 ~ file: Map.js:20 ~ error:", error)
    
  }
    })();
  }, []);
 const [placeaddress, setPlaceaddress] = useState(null);

  useEffect(() => {
    const getPlace = async()=>{
        try {
            const [latitude, longitude] = data.cordinate.split(", ");
            const res = await fetchAddressByCoords(latitude, longitude);
            setPlaceaddress(res);
        } catch (error) {
            console.log("🚀 ~ file: Map.js:55 ~ getPlace ~ error:", error)
        }
    }
getPlace()

  }, [])

  useEffect(() => {
    const getPlace = async()=>{
        try {
            const [latitude, longitude] = data.cordinate.split(", ");
            const res = await fetchDirections(latitude, longitude);
            setPlaceaddress(res);
        } catch (error) {
            console.log("🚀 ~ file: Map.js:55 ~ getPlace ~ error:", error)
        }
    }
getPlace()

  }, [])
  

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 5,
          width: "100%",
        }}
      >
        <View
          style={{
            padding: 10,

            width: "30%",
          }}
        >
          <Text style={{ ...themes.Typography.body }}>
            {placeaddress}
          </Text>
        </View>
        <View
          style={{
            padding: 10,

            width: "30%",
          }}
        >
          <Text style={{ ...themes.Typography.body }}>Distence</Text>
        </View>
        <View
          style={{
            padding: 10,

            width: "35%",
          }}
        >
          <Text style={{ ...themes.Typography.body }}>
            {locationEnabled ? (
              <MapView style={styles.map} region={region}>
                <Marker coordinate={region} title="Your Location" />
              </MapView>
            ) : (
              <View style={styles.locationDisabledContainer}>
                <Text style={styles.locationDisabledText}>
                  Location services are disabled. Please enable them to use this
                  feature.
                </Text>
                <TouchableOpacity
                  style={styles.enableLocationButton}
                  onPress={() => Location.requestForegroundPermissionsAsync()}
                >
                  <Text style={styles.enableLocationButtonText}>
                    Enable Location Services
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  map: {
    width: 100,
    height: 100,
  },
  locationDisabledContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationDisabledText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  enableLocationButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  enableLocationButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Map;
