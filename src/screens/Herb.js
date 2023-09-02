import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import ChatbotIcon from "../../assets/herbIcon.svg";
import themes from "../common/theme/themes";
import { Button, Dialog } from "react-native-paper";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import SingleHerb from "./SingleHerb";

const Herb = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState();
  const [pickedPhoto, setPickedPhoto] = useState();
  const [finishCapture, setFinishCapture] = useState(false);
  const [visibleDialogBox, setVisibleDialogBox] = useState(false);
  const [isPredictedHerb, setIsPredictedHerb] = useState(false);

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
        setCapturePhoto(newPhoto);
        setPickedPhoto(undefined);
        setStartCamera(false);
        setFinishCapture(false);
      }
    }
  };
  //
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedPhoto(result.assets[0].uri);
      setCapturePhoto(undefined);
    }
    if (result.canceled) {
      setPickedPhoto(undefined);
      setCapturePhoto(undefined);
    }
  };
  //
  const predictHerbDetails = async () => {
    setVisibleDialogBox(true);
    //pass the herb image to the model
    setIsPredictedHerb(true);
  };
  //
  const hideDialog = () => setVisibleDialogBox(false);
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
  if (capturePhoto && !finishCapture) {
    return (
      <SafeAreaView style={styles.saveContainer}>
        <Image
          source={{ uri: "data:image/jpg;base64," + capturePhoto.base64 }}
          style={styles.preview}
        />
        <View style={styles.shareButtonContainer}>
          <Button
            style={styles.saveButton}
            icon={"autorenew"}
            mode='contained'
            onPress={() => {
              setCapturePhoto(undefined);
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View>
          <View style={styles.iconContainer}>
            <ChatbotIcon width={120} height={120} />
            <Text style={themes.Typography.heading}>Identify Herbs</Text>
            <Text style={themes.Typography.body_light}>
              Get to know what is your known plant is
            </Text>
          </View>
          {(capturePhoto && finishCapture) || pickedPhoto ? (
            <View style={styles.capturePreviewContainer}>
              <View style={{ width: "100%", height: 200 }}>
                <SafeAreaView>
                  {capturePhoto ? (
                    <Image
                      source={{
                        uri: "data:image/jpg;base64," + capturePhoto.base64,
                      }}
                      style={styles.capturePreview}
                    />
                  ) : (
                    <Image
                      source={{ uri: pickedPhoto }}
                      style={styles.capturePreview}
                    />
                  )}
                </SafeAreaView>
              </View>
              {!isPredictedHerb && (
                <View style={styles.findBtnGroup}>
                  <Button
                    icon='close-circle'
                    mode='contained'
                    style={styles.PrimaryBtnSmall}
                    onPress={() => {
                      setCapturePhoto(undefined);
                      setPickedPhoto(undefined);
                    }}
                  >
                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                  </Button>
                  <Button
                    icon='leaf-circle'
                    mode='contained'
                    style={styles.PrimaryBtnSmall}
                    onPress={predictHerbDetails}
                    // loading={true}
                  >
                    <Text style={styles.secondaryButtonText}>Find</Text>
                  </Button>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.actionBtnGroup}>
              <Button
                icon='upload'
                mode='contained'
                style={themes.PrimaryBtnSmall}
                onPress={pickImage}
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
        {isPredictedHerb && <SingleHerb />}
      </View>
      <Dialog visible={visibleDialogBox} onDismiss={hideDialog}>
        <Dialog.Content>
          <View
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <ActivityIndicator size='large' color={themes.Colors.primary} />
            <Text style={themes.Typography.title}>
              Plant image is processing...{" "}
            </Text>
          </View>
        </Dialog.Content>
      </Dialog>
    </ScrollView>
  );
};

export default Herb;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 20,
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
  actionBtnGroup: {
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
