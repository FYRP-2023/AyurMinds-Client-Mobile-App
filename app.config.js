export default {
  expo: {
    name: "Ayur Minds",
    slug: "Ayur Minds",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#2DDA91",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#2DDA91",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      googleMapsApiKey: "AIzaSyDVrRktQwOIwxvcK5JxGka8smIqJBGmY4U",
      eas: {
        projectId: "f0cfb282-deec-4d44-ac1a-7705fe1a2c4f",
      },
    },
  },
};
