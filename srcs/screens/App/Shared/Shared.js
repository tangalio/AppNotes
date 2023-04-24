import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { firebase } from '../../../services/firebase/config';
import Note from '../../../components/App/Note/Note';
const Shared = () => {
    const currentUser = firebase.auth().currentUser;
    const userRef = useMemo(() => firebase.firestore().collection('user').doc(currentUser.uid), [currentUser]);
    const [sharedNotes, setSharedNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const notesRef = useRef(firebase.database().ref('notes/Notes'));
    const getSharedNotes = useCallback((snapshot) => {
        try {
            const userData = snapshot.data();
            const userEmail = userData.email;
            const sharedNotesRef = firebase.database().ref('notes/shared_notes');
            sharedNotesRef
                .orderByChild('shared_with')
                .equalTo(userEmail)
                .on('value', (snapshot) => {
                    const notes = snapshot.val() || {};
                    const newNotes = Object.keys(notes).map((id) => ({ ...notes[id], id }));
                    setSharedNotes(newNotes);
                });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        userRef.get().then(getSharedNotes);
    }, [userRef, getSharedNotes]);

    useEffect(() => {
        notesRef.current.on('value', (snapshot) => {
            const notes = snapshot.val() || {};
            const newNotes = Object.keys(notes)
                .filter((id) => sharedNotes.some((note) => note.note_id === id))
                .map((id) => ({ ...notes[id], id }));
            setNotes(newNotes);
        });

        return () => notesRef.current.off('value');
    }, [sharedNotes]);

    return (
        <View>
            <Text style={styles.title}>
                List of notes
            </Text>
            {notes.length === 0 ? (
                <Text style={styles.noData}>No data</Text>
            ) : (
                <FlatList
                    data={notes}
                    renderItem={({ item }) => (
                        <Note
                            notes_id={item.id}
                            notes_color={item.notes_color}
                            notes_image={item.notes_image}
                            notes_name={item.notes_name}
                            user_email={item.user_email}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            )}


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        margin: 2,
        fontWeight: 'bold',
        fontSize: 18,
    },
    noData: {
        margin: 16,
        fontSize: 16,
        textAlign: 'center',
    },
});
export default Shared;
