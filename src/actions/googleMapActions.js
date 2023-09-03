import axios from "axios";
import * as Location from "expo-location";
import { configs } from "../../configs";



export const fetchDirections = async (
  destination,
  mode = "driving"
) => {
  try {
    // Request permission to access the device's location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // Handle the case when location permission is not granted
      throw new Error("Location permission not granted");
    }

    // Get the current device location
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;

    // Fetch directions from the device's location to the destination
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${destination}&mode=${mode}&key=${configs.GOOGLE_MAP_API_KEY}`
    );

    if (response.data.status === "OK") {
      return response.data.routes[0].legs[0]; // Return directions data
    } else {
      // Handle error or invalid directions
      throw new Error("Error fetching directions");
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw error;
  }
};

export const fetchAddressByCoords = async (latitude, longitude) => {
  try {
    // Request permission to access the device's location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // Handle the case when location permission is not granted
      throw new Error("Location permission not granted");
    }

    // Fetch the address using reverse geocoding
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${configs.GOOGLE_MAP_API_KEY}`
    );

    if (response.data.status === "OK") {
      return response.data.results[0].formatted_address;
    } else {
      // Handle error or invalid coordinates
      throw new Error("Error fetching address");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

export const fetchCoordinatesByAddress = async (address) => {
  try {
    // Fetch coordinates using the Google Maps Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${configs.GOOGLE_MAP_API_KEY}`
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      // Handle error or invalid address
      throw new Error("Error fetching coordinates for the given address");
    }
  } catch (error) {
    console.error("Error fetching coordinates by address:", error);
    throw error;
  }
};


export const fetchGeocodingByCoords = async (latitude, longitude, apiKey) => {
  try {
    // Fetch geocoding information using the Google Maps Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${configs.GOOGLE_MAP_API_KEY}`
    );

    if (response.data.status === "OK") {
      return response.data.results;
    } else {
      // Handle error or invalid coordinates
      throw new Error(
        "Error fetching geocoding information for the given coordinates"
      );
    }
  } catch (error) {
    console.error(
      "Error fetching geocoding information by coordinates:",
      error
    );
    throw error;
  }
};