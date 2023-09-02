import { StyleSheet } from "react-native";
import themes from "../../common/theme/themes";

export const style = StyleSheet.create({
  view_container: {},

  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
  },
  input: {
    height: 40,
    width: "100%",
    // borderBottomColor: themes.Colors.primary,
    // borderBottomWidth: 1,
    marginBottom: 10,
    placeholderTextColor: themes.Colors.secondary,
    backgroundColor: themes.Colors.white,
    borderRadius: 50,
    padding: 5,
    textAlignVertical: "center",
    alignItems:"center"
  },
  search_view: {
    marginLeft: 20,
    marginRight: 20,
  },
  chat_container: {
    flex: 1,
    // marginVertical:50,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    // alignItems: "left",
    backgroundColor: "#FFF",
    justifyContent: "center",
    height: 60,
    marginBottom: 10,
    borderBottomColor: themes.Colors.primary,
  },
  rowBack: {
    // alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    marginBottom: 10,
    height: 50,
  },
  backRightBtn: {
    // alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
  chatView: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    display: "flex",
  },
  chatContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 16,
    borderColor: "#000",
    borderWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  imageName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  latestMessage: {
    color: "gray",
    marginLeft:5
  },
});
