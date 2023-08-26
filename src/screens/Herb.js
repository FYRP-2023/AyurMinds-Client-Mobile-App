import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ChatbotIcon from "../../assets/herbIcon.svg";
import themes from "../common/theme/themes";
import { Button } from "react-native-paper";
const Herb = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ChatbotIcon width={120} height={120} />
        <Text style={themes.Typography.heading}>Identify Herbs</Text>
        <Text style={themes.Typography.body_light}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor{" "}
        </Text>
      </View>
      <View style={styles.btnGroup}>
        <Button icon='upload' mode='contained' style={themes.PrimaryBtnSmall}>
          <Text style={styles.secondaryButtonText}>Upload Image</Text>
        </Button>

        <Button
          icon='camera'
          mode='contained'
          loading={false}
          style={themes.PrimaryBtnSmall}
        >
          <Text style={styles.secondaryButtonText}>Take Photo</Text>
        </Button>
      </View>
    </View>
  );
};

export default Herb;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
    gap: 10,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 150,
  },
});
