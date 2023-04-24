import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ImageNoteListItem from './ImageNoteListItem';
import PdfNoteListItem from './PdfNoteListItem';
import { useNavigation } from "@react-navigation/native";

const NoteListItemChild = ({ item, onDelete }) => {
    const [color, setColor] = useState(item.color);
    const [content, setContent] = useState(item.content);
    const [file, setFile] = useState(item.file);
    const [images, setImages] = useState(item.images);
    const [title, setTitle] = useState(item.title);
    const [id, setId] = useState(item.id);
    const navigation = useNavigation();
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
                { text: 'Xóa', onPress: () => onDelete(id) },
            ],
            { cancelable: false }
        );
    };
    useEffect(() => {
        setColor(item.color);
        setContent(item.content);
        setFile(item.file);
        setImages(item.images);
        setTitle(item.title);
    }, [item]);
    return (
        <TouchableOpacity onLongPress={handleLongPress} onPress={() => navigation.navigate('NoteDetailScreen', { item })}>
            <View style={[styles.container, { backgroundColor: color }]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {title}
                </Text>
                <Text>
                    {content}
                </Text>
                {images && <ImageNoteListItem images={images} />}
                {file && <PdfNoteListItem file={file} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 164,
        borderWidth: 1,
        borderColor: "#E9E9E9",
        margin: 10,
        borderRadius: 10,
    },
});

export default NoteListItemChild;
