import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import themes from "../common/theme/themes";
import { Button, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const SingleHerb = () => {
  return (
    <View style={styles.container}>
      <Divider />
      <Text style={themes.Typography.subHeading}>Predicted Herb Details</Text>
      <View style={{ gap: 10 }}>
        <View style={styles.itemContainer}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRMjmhRZQUsVGaa4Hk-1GKFMMqdQyud03Uce1X8P4JernCTmJchStK03kXL-NS04Qk4m9cpGd_8akXG-KK-4CA",
            }}
          />
          <View style={styles.itemDetails}>
            <View>
              <Text style={themes.Typography.body2Normal}>Herb Name</Text>
              <Text style={themes.Typography.bodyNormal}>
                Herb Name details
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Ionicons
                name='information-circle'
                size={18}
                color={themes.Colors.primary}
              />
              <Text
                style={{
                  ...themes.Typography.bodyNormal,
                  color: themes.Colors.primary,
                }}
              >
                Details
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRMjmhRZQUsVGaa4Hk-1GKFMMqdQyud03Uce1X8P4JernCTmJchStK03kXL-NS04Qk4m9cpGd_8akXG-KK-4CA",
            }}
          />
          <View style={styles.itemDetails}>
            <View>
              <Text style={themes.Typography.body2Normal}>Herb Name</Text>
              <Text style={themes.Typography.bodyNormal}>
                Herb Name details
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Ionicons
                name='information-circle'
                size={18}
                color={themes.Colors.primary}
              />
              <Text
                style={{
                  ...themes.Typography.bodyNormal,
                  color: themes.Colors.primary,
                }}
              >
                Details
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRMjmhRZQUsVGaa4Hk-1GKFMMqdQyud03Uce1X8P4JernCTmJchStK03kXL-NS04Qk4m9cpGd_8akXG-KK-4CA",
            }}
          />
          <View style={styles.itemDetails}>
            <View>
              <Text style={themes.Typography.body2Normal}>Herb Name</Text>
              <Text style={themes.Typography.bodyNormal}>
                Herb Name details
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <Ionicons
                name='information-circle'
                size={18}
                color={themes.Colors.primary}
              />
              <Text
                style={{
                  ...themes.Typography.bodyNormal,
                  color: themes.Colors.primary,
                }}
              >
                Details
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.findBtnGroup}>
        <Button
          icon='close-circle'
          mode='contained'
          style={styles.PrimaryBtnSmall}
        >
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Button>
        <Button
          icon='leaf-circle'
          mode='contained'
          style={styles.PrimaryBtnSmall}
        >
          <Text style={styles.secondaryButtonText}>Find</Text>
        </Button>
      </View>
    </View>
  );
};

export default SingleHerb;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "space-evenly",
  },
  findBtnGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  PrimaryBtnSmall: {
    backgroundColor: "#17CE92",
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
    width: 150,
    textAlign: "center",
  },
});
