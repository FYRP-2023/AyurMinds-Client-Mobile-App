import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ChatbotIcon from "../../assets/herbIcon.svg";
import themes from "../common/theme/themes";
import { Button } from "react-native-paper";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

const Herb = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const [photo, setPhoto] = useState();
  const [finishCapture, setFinishCapture] = useState(false);

  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);
  //
  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permissions for camera not granted. Please change this in settings.
      </Text>
    );
  }
  //
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera((current) => !current);
    } else {
      Alert.alert("Access denied");
    }
  };
  //
  const takePic = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      if (newPhoto) {
        await cameraRef.current.pausePreview();
        setPhoto(newPhoto);
        setStartCamera(false);
        setFinishCapture(false);
      }
    }
  };
  //
  if (startCamera) {
    return (
      <Camera style={styles.cameraContainer} ref={cameraRef} ratio='16:9'>
        <View style={styles.cancelButtonContainer}>
          <MaterialIcons
            name='cancel'
            size={35}
            color='#FFFFFF'
            onPress={() => setStartCamera(false)}
          />
        </View>
        <View style={styles.captureButtonContainer}>
          <MaterialIcons
            name='camera'
            size={65}
            color='#FFFFFF'
            onPress={takePic}
          />
        </View>
      </Camera>
    );
  }
  //
  if (photo && !finishCapture) {
    return (
      <SafeAreaView style={styles.saveContainer}>
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          style={styles.preview}
        />
        <View style={styles.shareButtonContainer}>
          <Button
            style={styles.saveButton}
            icon={"autorenew"}
            mode='contained'
            onPress={() => {
              setPhoto(undefined);
              setStartCamera(true);
            }}
          >
            Re-try
          </Button>
          <Button
            style={styles.saveButton}
            icon={"arrow-right-circle"}
            mode='contained'
            onPress={() => {
              setStartCamera(false);
              setFinishCapture(true);
            }}
          >
            Next
          </Button>
        </View>
      </SafeAreaView>
    );
  }
  //
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.iconContainer}>
          <ChatbotIcon width={120} height={120} />
          <Text style={themes.Typography.heading}>Identify Herbs</Text>
          <Text style={themes.Typography.body_light}>
            Get to know what is your known plant is
          </Text>
        </View>
        {photo && finishCapture ? (
          <View style={styles.capturePreviewContainer}>
            <View style={{ width: "100%", height: "50%" }}>
              <SafeAreaView>
                <Image
                  source={{ uri: "data:image/jpg;base64," + photo.base64 }}
                  style={styles.capturePreview}
                />
              </SafeAreaView>
            </View>
            <View style={styles.findBtnGroup}>
              <Button
                icon='close-circle'
                mode='contained'
                style={styles.PrimaryBtnSmall}
                onPress={() => setPhoto(undefined)}
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
        ) : (
          <View style={styles.btnGroup}>
            <Button
              icon='upload'
              mode='contained'
              style={themes.PrimaryBtnSmall}
            >
              <Text style={styles.secondaryButtonText}>Upload Image</Text>
            </Button>

            <Button
              icon='camera'
              mode='contained'
              loading={false}
              style={themes.PrimaryBtnSmall}
              onPress={__startCamera}
            >
              <Text style={styles.secondaryButtonText}>Take Photo</Text>
            </Button>
          </View>
        )}
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
    padding: 20,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Urbanist-Semi-Bold",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    marginBottom: 150,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  captureButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 40,
    borderRadius: 40,
  },
  cancelButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    margin: 20,
  },
  preview: {
    width: "100%",
    height: 700,
    backgroundColor: "#FFFFFF",
  },
  capturePreviewContainer: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",
  },
  capturePreview: { objectFit: "cover", width: "100%", height: "100%" },
  saveContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  shareButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  saveButton: {
    borderRadius: 50,
    backgroundColor: "#17CE92",
  },
  findBtnGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  PrimaryBtnSmall: {
    backgroundColor: "#17CE92",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginTop: 20,
    width: 150,
    textAlign: "center",
  },
});
