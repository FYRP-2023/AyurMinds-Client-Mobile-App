import * as React from 'react';
import { View, StyleSheet, ToastAndroid } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import themes from "../../common/theme/themes";
import { getAxiosSocialNetworkInstance } from '../../utils/axios';
import AyurMindsApi from '../../api/apiService';
import { CONTENT_TYPE_QUESTION } from '../../constants/SocialNetworkConstants';

function PostContent() {
    const userId = useSelector((state) => state.auth.user)._id;
    const id = 0;

    const navigator = useNavigation();
    const route = useRoute();
    const { contentType } = route.params;

    const [header, setHeader] = React.useState("");

    const [body, setBody] = React.useState("");

    const onSubmit = async () => {
        await getAxiosSocialNetworkInstance()
            .post(AyurMindsApi.social_network_service.content, { id, userId, header, body, contentType });
        ToastAndroid.showWithGravity('Your content has been made publicly available.', ToastAndroid.LONG, ToastAndroid.BOTTOM,)
        navigator.goBack();
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                mode="outlined"
                theme={{ colors: { onSurfaceVariant: themes.Colors.primary, onBackground: 'white' } }}
                outlineColor={themes.Colors.primary}
                activeOutlineColor={themes.Colors.primary}
                style={{
                    width: '90%',
                    marginTop: 10
                }}
                multiline={true}
                label="Header"
                value={header}
                onChangeText={text => setHeader(text)}
            />

            <TextInput
                mode="outlined"
                theme={{ colors: { onSurfaceVariant: themes.Colors.primary, onBackground: 'white' } }}
                outlineColor={themes.Colors.primary}
                activeOutlineColor={themes.Colors.primary}
                style={{
                    width: '90%',
                    marginTop: 10
                }}
                multiline={true}
                label="Body"
                value={body}
                onChangeText={text => setBody(text)}
            />

            <Button icon={contentType === CONTENT_TYPE_QUESTION ? "comment-question-outline" : "note-text-outline"}
                mode="contained"
                onPress={() => onSubmit()}
                style={styles.item} buttonColor={themes.Colors.primary}>
                {contentType === CONTENT_TYPE_QUESTION ? "Ask" : "Post"}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        marginTop: 10,
    },
    item: {
        width: '50%',
        marginTop: 10,
        marginLeft: 5
    }
});

export default PostContent;