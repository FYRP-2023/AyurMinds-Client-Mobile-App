import { StyleSheet } from "react-native";
import themes from "../../common/theme/themes";

export const style = StyleSheet.create({
  view_container: {},

  container: {
    display: "flex",
    flex: 1,
    padding: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderBottomColor: themes.Colors.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
    placeholderTextColor: themes.Colors.secondary,
    backgroundColor: themes.Colors.white,
    borderRadius: 50,
    padding: 5,
    textAlignVertical: "center",
  },
  search_view: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  chat_container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
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
    backgroundColor: "red",
    right: 0,
  },
});
