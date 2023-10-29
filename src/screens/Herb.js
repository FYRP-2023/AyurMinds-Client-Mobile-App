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
import { Button, Dialog, Divider } from "react-native-paper";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Herb = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const [capturePhoto, setCapturePhoto] = useState();
  const [pickedPhoto, setPickedPhoto] = useState();
  const [finishCapture, setFinishCapture] = useState(false);
  const [visibleDialogBox, setVisibleDialogBox] = useState(false);
  const [visibleHerbDetailsDialog, setVisibleHerbDetailsDialog] =
    useState(false);
  const [isPredictedHerb, setIsPredictedHerb] = useState(false);
  const [predictedData, setPredictedData] = useState();
  const [selectedHerbDetails, setSelectedHerbDetails] = useState();

  const imageToBase64 = (imageUri) => {
    return new Promise((resolve, reject) => {
      fetch(imageUri)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64data = reader.result.split(",")[1];
            resolve(base64data);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(blob);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const pickedPhotoBase64 = imageToBase64(pickedPhoto);

  const data = {
    api_key: "9RULU2qv7ZuyDdyEcsfeZxZbp8syLoHr7wpmjylet8eqUZbaue",
    images: capturePhoto
      ? [capturePhoto.base64]
      : pickedPhoto
      ? [pickedPhotoBase64.base64]
      : [],
    /* modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers */
    modifiers: ["crops_fast", "similar_images"],
    plant_language: "en",
    /* plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details */
    plant_details: ["common_names", "url", "wiki_description"],
  };

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
    axios
      .post("https://api.plant.id/v2/identify", data)
      .then((res) => {
        setPredictedData(res.data);

        setVisibleDialogBox(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setVisibleDialogBox(false);
      });
  };
  //
  const hideDialog = () => setVisibleDialogBox(false);
  //
  const hideHerbDetailsDialog = () => setVisibleHerbDetailsDialog(false);
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
                      setPredictedData(undefined);
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
      </View>

      <View style={{ backgroundColor: "#FFFFFF" }}>
        {predictedData &&
          predictedData.suggestions &&
          predictedData.suggestions.map((suggestion) => (
            // console.log(suggestion.plant_details.common_names),
            <View
              key={suggestion.id}
              style={{ margin: 10, backgroundColor: "#FFFFFF" }}
            >
              <Text style={themes.Typography.bodyNormal}>
                {suggestion.plant_name} - Probability:{" "}
                <Text style={{ color: "green" }}>
                  {Math.round(suggestion.probability * 100)}%
                </Text>
              </Text>
              {suggestion?.plant_details?.common_names && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#616161",
                    paddingTop: 6,
                    fontFamily: "Urbanist-Light",
                  }}
                >
                  ( {suggestion.plant_details.common_names.join(", ")} )
                </Text>
              )}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {suggestion.similar_images.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      source={{
                        uri: img.url,
                      }}
                      style={{
                        width: 100,
                        height: 100,
                        margin: 10,
                      }}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name='info'
                  size={20}
                  color={themes.Colors.primary}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: themes.Colors.primary,
                    padding: 6,
                    fontFamily: "Urbanist-Bold",
                  }}
                  onPress={() => {
                    setVisibleHerbDetailsDialog(true);
                    setSelectedHerbDetails(suggestion);
                  }}
                >
                  Details
                </Text>
              </View>
              <Divider />
            </View>
          ))}
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

      <Dialog
        visible={visibleHerbDetailsDialog}
        onDismiss={hideHerbDetailsDialog}
        style={{ display: "flex" }}
      >
        <Dialog.ScrollArea>
          <Dialog.Title>Plant Details</Dialog.Title>
          <ScrollView>
            <Text style={themes.Typography.bodyNormal}>
              {selectedHerbDetails?.plant_details?.wiki_description?.value}
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
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
