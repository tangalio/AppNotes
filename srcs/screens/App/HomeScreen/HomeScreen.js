import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../../components/App/Home/Header';
import { firebase } from '../../../services/firebase/config';
import CustomFab from '../../../components/App/NoteForm/CustomFab';
import { useNavigation } from "@react-navigation/native";
import Note from '../../../components/App/Note/Note';
import AddNotesModal from '../../../components/App/NoteForm/AddNotesModal';
const HomeScreen = () => {
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    const getEmailAndNotes = useCallback(async (snapshot) => {
        try {
            const userData = snapshot.data();
            setUser(userData);
            const email = userData.email;
            const notesRef = firebase.database().ref('notes/Notes');
            notesRef.orderByChild('user_email').equalTo(email).on('value', (snapshot) => {
                const notes = snapshot.val() || {};
                const newNotes = Object.keys(notes).map((id) => ({ ...notes[id], id }));
                setNotes(newNotes);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const userRef = firebase.firestore().collection('user').doc(currentUser.uid);
            userRef.get().then(getEmailAndNotes);
        }
    }, [getEmailAndNotes]);

    const handleSearch = () => {
        navigation.navigate('NoteSearch')
    };

    const toggleModal = () => {
        setModalVisible((prev) => !prev);
    };


    const deleteNote = (id) => {
        const database = firebase.database();
        const notesRef = database.ref('notes/Notes');
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


    return (
        <View style={styles.container}>
            <Header user_name={user?.name} handleSearch={handleSearch} />
            <Text style={styles.title}>
                List of notes
            </Text>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <Note
                        notes_id={item.id}
                        notes_color={item.notes_color}
                        notes_image={item.notes_image}
                        notes_name={item.notes_name}
                        user_email={item.user_email}
                        onDelete={handleNoteDelete}

                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
            <CustomFab onPress={toggleModal} iconColor="blue" />
            <AddNotesModal visible={modalVisible} onClose={toggleModal} user={user} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        margin: 2,
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default HomeScreen;
