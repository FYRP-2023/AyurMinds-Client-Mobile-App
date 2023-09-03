import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Alert, ToastAndroid, Keyboard, View } from "react-native";
import { useSelector } from "react-redux";
import { Overlay } from "@rneui/themed";
import { Card, ActivityIndicator, MD2Colors, IconButton, Divider, Text, TextInput } from 'react-native-paper';
import { getAxiosSocialNetworkInstance } from "../../utils/axios";
import AyurMindsApi from "../../api/apiService";
import themes from "../../common/theme/themes";
import { CONTENT_TYPE_USER, FILTER_CRITERIA_ASCENDING } from "../../constants/SocialNetworkConstants";

function ContentList({ contentType }) {
    const userId = useSelector((state) => state.auth.user)._id;
    const responseId = "0";

    const [isContentsRefreshing, setIsContentsRefreshing] = useState(false);
    const [isResponsesRefreshing, setIsResponsesRefreshing] = useState(false);
    const [responsesVisible, setResponsesVisible] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [responseList, setResponseList] = useState([]);
    const [body, setBody] = useState('');
    const [contentId, setContentId] = useState('');

    useEffect(() => {
        fetchContentList();
    }, []);

    useEffect(() => {
        if (responsesVisible && contentId) {
            fetchResponseList();
        }
    }, [responsesVisible, contentId])

    const fetchContentList = async () => {
        try {
            setIsContentsRefreshing(true);
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

            setIsContentsRefreshing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchResponseList = async () => {
        if (contentId) {
            try {
                setIsResponsesRefreshing(true);
                const response = await getAxiosSocialNetworkInstance()
                    .get(AyurMindsApi.social_network_service.response,
                        { params: { contentId: contentId } });
                setResponseList(response.data);
                setIsResponsesRefreshing(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const renderContentList = () => {
        return (
            <FlatList
                refreshing={isContentsRefreshing}
                onRefresh={() => {
                    fetchContentList();
                }}
                data={contentList}
                renderItem={renderContent}
                keyExtractor={content => content.id}
                ListEmptyComponent={
                    <Text variant="bodyLarge" style={styles.container}>Welcome! You are the first one here to post something relating to health domain today. Thank you for joining with us.</Text>
                }
            />
        )
    }

    const renderResponseList = () => {
        return (
            <FlatList
                refreshing={isResponsesRefreshing}
                onRefresh={() => {
                    fetchResponseList();
                }}
                data={responseList}
                renderItem={renderResponse}
                keyExtractor={response => response.id}
                ListEmptyComponent={
                    <Text variant="bodyLarge" style={styles.container}>No one here. Can you please start the discussion?</Text>
                }
            />
        )
    }

    const renderContent = ({ item: content }) => {
        return (
            <Card key={content.id} style={styles.item} mode="contained">
                <Card.Title title={content.header} subtitle={!content.isDeleted ? '' : '(Deleted)'} subtitleStyle={{ color: "#ff0000", fontSize: 10 }}
                    titleStyle={{ color: "#000000", fontSize: 18, marginTop: 5, marginBottom: 15 }} titleVariant="titleMedium" titleNumberOfLines={5} />
                <Card.Content>
                    <Divider />
                    <Text variant="bodyMedium" style={{ marginTop: 10 }}>{content.body}</Text>
                </Card.Content>
                <Card.Actions>
                    <IconButton mode="contained-tonal" iconColor={themes.Colors.primary} containerColor="#ffffff" icon="comment" onPress={() => showResponsesOverlay(content.id)} />
                    {contentType === CONTENT_TYPE_USER && !content.isDeleted ?
                        <IconButton mode="contained-tonal" iconColor="#0000ff" containerColor="#ffffff" icon="note-edit" /> : <></>}
                    {contentType === CONTENT_TYPE_USER && !content.isDeleted ?
                        <IconButton mode="contained-tonal" iconColor="#ff0000" containerColor="#ffffff" icon="delete" onPress={() => showDeleteContentWarning(content.id)} /> : <></>}
                </Card.Actions>
            </Card>
        )
    }

    const renderResponse = ({ item: response }) => {
        return (
            <Card key={response.id} style={styles.responseCard} mode="contained">
                <Card.Content style={styles.responseContent}>
                    <Text variant="bodyMedium" style={{ marginTop: 10 }}>{response.body}</Text>
                </Card.Content>
                <Card.Actions>
                    {response.userId === userId && !response.isDeleted ?
                        <IconButton mode="contained-tonal" icon="delete" iconColor="#ff0000" containerColor="white" onPress={() => showDeleteContentWarning(response.id)} /> :
                        <IconButton mode="contained-tonal" icon="thumb-up" iconColor="#0000ff" containerColor="white" />
                    }
                </Card.Actions>
            </Card>
        )
    }

    const showResponsesOverlay = (contentId) => {
        setContentId(contentId);
        setResponsesVisible(true);
    };

    const showDeleteContentWarning = (contentId) => {
        Alert.alert(
            "Are you sure?",
            "You are about to delete a publicly available content. This action cannot be undone.",
            [
                {
                    text: "Cancel"
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
        if (contentId) {
            await getAxiosSocialNetworkInstance()
                .delete(AyurMindsApi.social_network_service.content.concat("/").concat(contentId));
            fetchContentList();
            ToastAndroid.showWithGravity('Your content has been deleted from public.', ToastAndroid.LONG, ToastAndroid.BOTTOM,)
        } else {
            await getAxiosSocialNetworkInstance()
                .delete(AyurMindsApi.social_network_service.content.concat("/").concat(contentId));
            fetchResponseList();
            ToastAndroid.showWithGravity('Your comment has been deleted from public.', ToastAndroid.LONG, ToastAndroid.BOTTOM,)
        }
    }

    const saveRespnse = async () => {
        if (body) {
            await getAxiosSocialNetworkInstance()
                .post(AyurMindsApi.social_network_service.response, { responseId, userId, contentId, body });
            Keyboard.dismiss();
            setBody('');
            ToastAndroid.showWithGravity('Your thoughts has been made publicly available.', ToastAndroid.LONG, ToastAndroid.BOTTOM,)
            fetchResponseList();
        }
    }

    return (
        <>
            {isContentsRefreshing ?? <ActivityIndicator marginTop={50} animating={true} color={MD2Colors.greenA700} />}
            {renderContentList()}
            <Overlay
                isVisible={responsesVisible}
                onBackdropPress={() => {
                    setResponsesVisible(false);
                    setContentId('');
                    setResponseList([]);
                }}
                overlayStyle={{ padding: 10, height: '75%', width: '80%', backgroundColor: '#e1e1e1', borderRadius: 10 }}
            >
                {isResponsesRefreshing ?? <ActivityIndicator marginTop={50} animating={true} color={MD2Colors.greenA700} />}
                {renderResponseList()}
                {contentType !== CONTENT_TYPE_USER ?
                    <View style={styles.inputContainer}>
                        <Divider style={{ marginBottom: 10 }} />
                        <View>
                            <TextInput
                                placeholder='What are your thoughts...'
                                placeholderTextColor='#bdbdbd'
                                underlineColor='none'
                                activeUnderlineColor='none'
                                selectionColor={themes.Colors.primary}
                                cursorColor={themes.Colors.primary}
                                style={styles.input}
                                multiline
                                onChangeText={(value) => setBody(value)}
                                value={body}
                                right={
                                    <TextInput.Icon icon='comment' color={themes.Colors.primary} onPress={saveRespnse} />
                                }
                            />
                        </View>
                    </View> : <></>}
            </Overlay>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 20,
        marginTop: '50%',
    },
    item: {
        backgroundColor: "#ffffff",
        margin: 10
    },
    responseCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        alignSelf: 'stretch',
        marginBottom: 10,
        marginTop: 10
    },
    responseContent: {
        marginTop: -20,
        marginBottom: -20,
    },
    inputContainer: {
        paddingTop: 10,
        margin: 10,
    },
    input: {
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
    },
});

export default ContentList;
