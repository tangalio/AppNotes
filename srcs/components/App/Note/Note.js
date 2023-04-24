import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Note = React.memo(({ notes_id, notes_color, notes_image, notes_name, user_email, onDelete }) => {
    const [color, setColor] = useState(notes_color);
    const [images, setImages] = useState(notes_image);
    const [title, setTitle] = useState(notes_name);
    const [notes, setNotes] = useState(notes_id);
    const [email, setEmail] = useState(user_email);
    const navigation = useNavigation();

    const handlePress = useCallback(() => {
        const data = {
            notes_id: notes,
            notes_color: color,
            notes_image: images,
            notes_name: title,
            user_email: email
        };
        navigation.navigate('NoteListScreen', { data });
    }, [notes, color, images, title, navigation]);

    const handleLongPress = () => {
        Alert.alert(
            'Xóa Notes',
            'Bạn có chắc chắn muốn xóa Note này không !',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Xóa', onPress: () => onDelete(notes) },
            ],
            { cancelable: false }
        );
    };


    return (
        <TouchableOpacity onLongPress={handleLongPress} onPress={handlePress}>
            <View style={[styles.container, { backgroundColor: color }]} >
                <View style={styles.note}>
                    <Image
                        style={styles.image}
                        source={{ uri: images }}
                    />
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
                            {title}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 2,
        borderWidth: 1,
        borderColor: "#E9E9E9",
        padding: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    note: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuContainer: {

    },
    image: {
        borderWidth: 1,
        borderColor: '#E9E9E9',
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    textContainer: {
        width: '60%',
    },
    title: {
        fontSize: 18,
        marginLeft: 8,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default Note;
