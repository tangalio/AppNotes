import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../../../services/firebase/config';
import HeaderNoteListItem from '../../../components/App/NoteListItem/HeaderNoteListItem';
import CustomFab from '../../../components/App/NoteForm/CustomFab';
import NoteListItemChild from '../../../components/App/NoteListItem/NoteListItemChild';
import ShareNotesModal from '../../../components/App/NoteForm/ShareNotesModal';
const NoteListScreen = ({ navigation, route }) => {
    const [notesItem, setNotesItem] = useState([]);
    const { notes_id } = route.params.data;
    const id = route.params.data;
    const [modalShareVisible, setModalShareVisible] = useState(false);
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

    const deleteNote = (id) => {
        const database = firebase.database();
        const notesRef = database.ref('notes/NotesItem');
        notesRef.child(id).remove()
            .then(() => {
                console.log('Note deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting note:', error);
            });
    }
    const handleNoteDelete = (id) => {
        deleteNote(id)
    };
    const handleShare = () => {
        setModalShareVisible((prev) => !prev);
    };
    const handlesearch = () => {
        navigation.navigate('NotesSearchItem', { id })
    };
    return (
        <View style={styles.container}>
            <HeaderNoteListItem {...route.params.data} onShare={handleShare} onsearch={handlesearch} />
            <FlatList
                data={notesItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <NoteListItemChild onDelete={handleNoteDelete} item={item} />
                )}
            />
            <CustomFab onPress={() => navigation.navigate('AddNotesItem', { notes: notes_id })} iconColor={'blue'} />
            <ShareNotesModal noteId={id} onClose={handleShare} visible={modalShareVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default NoteListScreen;
