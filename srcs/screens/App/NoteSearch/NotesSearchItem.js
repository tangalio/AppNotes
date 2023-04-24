import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import NoteListItemChild from '../../../components/App/NoteListItem/NoteListItemChild';
import { firebase } from '../../../services/firebase/config';
const NotesSearchItem = ({ route }) => {
    const { notes_id } = route.params.id;
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [notesItem, setNotesItem] = useState([]);
    useEffect(() => {
        const databaseRef = firebase.database().ref('notes/NotesItem');
        databaseRef.orderByChild('notes_id').equalTo(notes_id).on('value', (snapshot) => {
            const notesItem = snapshot.val();
            if (notesItem) {
                const newNotesItem = Object.keys(notesItem).map((id) => ({ ...notesItem[id], id }));
                setNotesItem(newNotesItem);
            } else {
                setNotesItem([]);
            }
        });
    }, [notes_id]);
    const searchNotes = (text) => {
        const notesRef = firebase.database().ref('notes/NotesItem');
        notesRef.orderByChild('notes_id').equalTo(notes_id).on('value', (snapshot) => {
            const notes = snapshot.val() || {};
            const newNotes = Object.keys(notes).map((id) => ({ ...notes[id], id }));
            const filteredNotes = newNotes.filter(note => note.title.toLowerCase().includes(text.toLowerCase()));
            setNotesItem(filteredNotes);
        });
    };
    // console.log("notesItem",notesItem);

    const handleSearchInputChange = (text) => {
        setSearchText(text);
        searchNotes(text);
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                onChangeText={handleSearchInputChange}
                value={searchText}
                placeholder="Search notes..."
                onSubmitEditing={() => searchNotes(searchText)}
            />
            <FlatList
                data={notesItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <NoteListItemChild item={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        paddingHorizontal: 10,
    },
});

export default NotesSearchItem;