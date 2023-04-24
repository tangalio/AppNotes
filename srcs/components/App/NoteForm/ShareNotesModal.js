import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { firebase } from '../../../services/firebase/config';

const ShareNotesModal = ({ noteId, onClose, visible }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const id = noteId.notes_id;
    console.log('id', id);
    const handleShare = () => {
        if (email === '') {
            setError('Please enter an email address');
            return;
        }
        const database = firebase.database();
        const sharedNotesRef = database.ref('notes/shared_notes');
        const sharedNoteRef = sharedNotesRef.push();
        const sharedNoteId = sharedNoteRef.key;

        // Add shared note to shared notes list
        sharedNoteRef.set({
            note_id: id,
            shared_with: email
        });

        // Add shared note ID to note's sharedWith field
        const notesRef = database.ref('notes/Notes');
        const noteRef = notesRef.child(id);
        noteRef.update({
            sharedWith: sharedNoteId
        });
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email address"
                    value={email}
                    onChangeText={setEmail}
                />
                {error !== '' && (
                    <Text style={styles.error}>{error}</Text>
                )}
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    shareButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ShareNotesModal;
