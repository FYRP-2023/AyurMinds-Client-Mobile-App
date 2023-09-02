import { StyleSheet, View } from "react-native";
import { Button } from 'react-native-paper';
import themes from "../../common/theme/themes";
import { CONTENT_TYPE_ARTICLE, CONTENT_TYPE_QUESTION, CONTENT_TYPE_USER } from "../../constants/SocialNetworkConstants"
import ContentList from "./ContentList";
import { useNavigation } from "@react-navigation/native";

function UserContent() {
    const navigator = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Button icon="comment-question-outline" mode="contained"
                    onPress={() => navigator.navigate("Post Content", { contentType: CONTENT_TYPE_QUESTION })}
                    style={styles.item} buttonColor={themes.Colors.primary}>
                    Ask a Question
                </Button>

                <Button icon="note-text-outline" mode="contained"
                    onPress={() => navigator.navigate("Post Content", { contentType: CONTENT_TYPE_ARTICLE })}
                    style={styles.item} buttonColor={themes.Colors.primary}>
                    Post an Article
                </Button>
            </View>

            <ContentList contentType={CONTENT_TYPE_USER} />
        </>
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
        marginLeft: 5
    }
});

export default UserContent;
