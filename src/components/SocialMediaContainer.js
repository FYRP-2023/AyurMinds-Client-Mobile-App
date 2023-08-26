import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import themes from "../common/theme/themes";
import FaceBookIcon from "../../assets/facebook.svg";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";

const SocialMediaContainer = () => {
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
          <GoogleSvg width={35} height={35} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaArea}>
          <AppleSvg width={35} height={35} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialMediaArea}>
          <FaceBookIcon width={35} height={35} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SocialMediaContainer;

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#9BA1A6",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
    marginTop: 20,
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
