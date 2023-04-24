import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ImageListItem from '../../../components/App/NoteListItem/ImageListItem';
import PdfNoteListItem from '../../../components/App/NoteListItem/PdfNoteListItem';
import HeaderDetailScreen from '../../../components/App/NoteListItem/HeaderDetailScreen';
import { firebase } from '../../../services/firebase/config';
const NoteDetailScreen = ({ route }) => {
    const navigation = useNavigation();
    const note = route.params.item;

    const [color, setColor] = useState(note.color);
    const [content, setContent] = useState(note.content);
    const [file, setFile] = useState(note.file);
    const [images, setImages] = useState(note.images);
    const [title, setTitle] = useState(note.title);
    const handleUpdate = () => {
        const updatedNote = {
            title,
            content,
            file,
            images,
            color,
        };
        const databaseRef = firebase.database().ref('notes/NotesItem');
        databaseRef.child(`${note.id}`).update(updatedNote)
            .then(() => {
                console.log('Note updated successfully');
                // Update note with new data
                const updatedNoteData = { ...note, ...updatedNote };
                navigation.setParams({ item: updatedNoteData });
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Error updating note:', error);
            });
    }

    const handleBack = () => {
        navigation.goBack()
    }
    return (
        <ScrollView style={styles.container}>
            <HeaderDetailScreen name="My Screen" onUpdate={handleUpdate} onBack={handleBack} />
            <View style={styles.containerTextInput}>
                <TextInput style={styles.textInput}
                    onChangeText={(text) => setTitle(text)}
                    value={title} placeholder="Tiêu đề" />
                <TextInput textAlignVertical='top' multiline={true} style={styles.textInputContent}
                    onChangeText={(text) => setContent(text)}
                    value={content} placeholder="Nội dung" />
            </View>
            {images && <ImageListItem key="image-list-item" images={images} />}
            {file && (
                <TouchableOpacity onPress={() => navigation.navigate('PdfViewer', { file })}>
                    <PdfNoteListItem file={file} />
                </TouchableOpacity>
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerTextInput: {
        alignItems: "center",
        justifyContent: "center"
    },
    textInput: {
        height: 40,
        marginVertical: 6,
        borderWidth: 2,
        padding: 10,
        width: 340,
        borderRadius: 10
    },
    textInputContent: {
        height: 120,
        marginVertical: 6,
        borderWidth: 2,
        padding: 10,
        width: 340,
        borderRadius: 10,
        textAlignVertical: 'top',
    }
});

export default NoteDetailScreen;
