import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React, { Component } from "react";
import themes from "../common/theme/themes";

export default class SocialMediaContainer extends Component {
  render() {
    return (
      <>
        <View style={styles.line}>
          <Text
            style={{
              color: themes.Colors.secondary,
              textAlign: "center",
              paddingHorizontal: 8,
              marginBottom: 2,
            }}
          >
            or continue with
          </Text>
        </View>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity style={styles.socialMediaArea}>
            <Image
              source={require("../../assets/facebook.svg")}
              style={styles.socialMediaIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialMediaArea}>
            <Image
              source={require("../../assets/apple.svg")}
              style={styles.socialMediaIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialMediaArea}>
            <Image
              source={require("../../assets/google.svg")}
              style={styles.socialMediaIcon}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#9BA1A6",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginTop: 50,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  socialMediaIcon: {
    width: 35,
    height: 35,
  },
  socialMediaArea: {
    border: "1px solid #9BA1A6",
    borderRadius: 10,
    padding: 8,
  },
});
