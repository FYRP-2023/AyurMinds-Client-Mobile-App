import { createStackNavigator } from "@react-navigation/stack";
import PostContent from '../screens/Social Network/PostContent';
import UserContent from "../screens/Social Network/UserContent";
import { CONTENT_TYPE_QUESTION } from "../constants/SocialNetworkConstants";

const SocialNetworkStackNavigator = createStackNavigator();

function SocialNetworkUserContentNavigator() {
    return (
        <SocialNetworkStackNavigator.Navigator>
            <SocialNetworkStackNavigator.Screen component={UserContent} name="User Content"
                options={{ headerShown: false }} />
            <SocialNetworkStackNavigator.Screen component={PostContent} name="Post Content"
                initialParams={{ contentType: CONTENT_TYPE_QUESTION }}
                options={{ headerShown: false }} />
        </SocialNetworkStackNavigator.Navigator>
    )
}

export default SocialNetworkUserContentNavigator;