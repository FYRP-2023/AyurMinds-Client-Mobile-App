const themes = {
  Colors: {
    primary: "#17CE92",
    secondary: "#9BA1A6",
    text: "#000000",
    status: {
      success: "##17CE92",
      error: "#E93E3E",
      info: "#21B8E8",
    },
  },
  //
  Typography: {
    heading: {
      fontSize: 24,
      color: "#071421",
      fontWeight: 700,
      padding: 6,
      letterSpacing: 2,
      // fontFamily: "Trebuchet MS', sans-serif",
    },
    subHeading: {
      fontSize: 18,
      color: "#616161",
      fontWeight: 500,
      padding: 6,
    },
    title: {
      fontSize: 16,
      color: "616161",
      fontWeight: 400,
      padding: 6,
    },
    body: {
      fontSize: 15,
      color: "616161",
      fontWeight: 400,
      padding: 6,
    },
    fontFamily: "Arial",
  },
  //
  Spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  //
  BorderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  //
  BoxShadow: {
    elevation1: {
      elevation: 1,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  },
  //
  PrimaryBtnSmall: {
    backgroundColor: " #17CE92",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    width: "10rem",
    textAlign: "center",
  },
  PrimaryBtnLarge: {
    backgroundColor: "#17CE92",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
    textAlign: "center",
    elevation: 5,
    shadowColor: "#17CE92",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
  },
  SecondaryBtnLarge: {
    backgroundColor: "#D9E7E2",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
    textAlign: "center",
  },
};

export default themes;
