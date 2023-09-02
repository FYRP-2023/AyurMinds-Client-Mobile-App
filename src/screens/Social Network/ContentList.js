import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert, ToastAndroid } from "react-native";
import { Button, Card, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { getAxiosSocialNetworkInstance } from "../../utils/axios";
import AyurMindsApi from "../../api/apiService";
import { CONTENT_TYPE_QUESTION, CONTENT_TYPE_USER, FILTER_CRITERIA_ASCENDING } from "../../constants/SocialNetworkConstants";
import themes from "../../common/theme/themes";

function ContentList({ contentType }) {
    const userId = "1111";

    const [isRefreshing, setIsRefreshing] = useState(false);

    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        fetchContentList();
    }, []);

    if (isRefreshing) {
        return (<ActivityIndicator marginTop={50} animating={true} color={MD2Colors.greenA700} />)
    }

    const fetchContentList = async () => {
        try {
            if (contentType === CONTENT_TYPE_USER) {
                const response = await getAxiosSocialNetworkInstance()
                    .get(AyurMindsApi.social_network_service.content,
                        { params: { UserId: userId } });
                console.dir(response.data);
                setContentList(response.data);
            } else {
                const response = await getAxiosSocialNetworkInstance()
                    .get(AyurMindsApi.social_network_service.content,
                        { params: { ContentType: contentType, DateSortType: FILTER_CRITERIA_ASCENDING } });
                console.dir(response.data);
                setContentList(response.data);
            }

            setIsRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const renderContentList = () => {
        if (contentList.length === 0) {
            return (
                <Text variant="bodyLarge" style={styles.container}>No Content</Text>
            );
        }

        return (
            <FlatList
                refreshing={isRefreshing}
                onRefresh={() => {
                    fetchContentList();
                    setIsRefreshing(true);
                }}
                data={contentList}
                renderItem={renderContent}
                keyExtractor={content => content.id}
            />
        )
    }

    const renderContent = ({ item: content }) => {
        return (
            <Card key={content.id} style={styles.item} mode="contained">
                <Card.Title title={content.header} subtitle={!content.isDeleted ? '' : '(Deleted Content)'} subtitleStyle={{ color: "#ff0000", fontSize: 10 }}
                    titleVariant="titleMedium" />
                <Card.Content>
                    <Text variant="bodyMedium">{content.body}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained-tonal" style={styles.button} buttonColor={themes.Colors.primary} textColor="#ffffff" icon="comment">{content.contentType === CONTENT_TYPE_QUESTION ? 'Answers' : 'Responses'}</Button>
                    {contentType === CONTENT_TYPE_USER && !content.isDeleted ?
                        <Button mode="contained-tonal" style={styles.button} buttonColor={themes.Colors.secondary} textColor="#ffffff" icon="note-edit">Edit</Button> : <></>}
                    {contentType === CONTENT_TYPE_USER && !content.isDeleted ?
                        <Button mode="contained-tonal" style={styles.button} buttonColor="#ff0000" textColor="#ffffff" icon="delete" onPress={() => showDeleteContentWarning(content.id)}>Delete</Button> : <></>}
                </Card.Actions>
            </Card>
        )
    }

    const showDeleteContentWarning = (contentId) => {
        Alert.alert(
            "Are you sure?",
            "You are about to delete a publicly available content. This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => deleteContent(contentId),
                },
            ],
            { cancelable: true }
        );
    }

    const deleteContent = async (contentId) => {
        await getAxiosSocialNetworkInstance()
            .delete(AyurMindsApi.social_network_service.content.concat("/").concat(contentId));
        setIsRefreshing(true);
        ToastAndroid.showWithGravity('Your content has been deleted from public.', ToastAndroid.LONG, ToastAndroid.BOTTOM,)
    }

    return (
        <>
            {renderContentList()}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 15,
        marginTop: 10,
    },
    item: {
        backgroundColor: "#ffffff",
        margin: 10
    },
    button: {
        height: 40,
    }
});

export default ContentList;
