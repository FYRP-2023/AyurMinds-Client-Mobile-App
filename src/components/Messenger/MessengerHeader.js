import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const MessengerHeader = (props) => {

  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={{ marginLeft: 16 }}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default MessengerHeader;
