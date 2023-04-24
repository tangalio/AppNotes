import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { firebase } from '../../../services/firebase/config';
import Note from '../../../components/App/Note/Note';
const NoteSearch = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [notes, setNotes] = useState([]);

    const getEmailAndNotes = useCallback(async (snapshot) => {
        try {
            const userData = snapshot.data();
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

    const searchNotes = (text) => {
        const notesRef = firebase.database().ref('notes/Notes');
        notesRef.orderByChild('notes_name').on('value', (snapshot) => {
            const notes = snapshot.val() || {};
            const newNotes = Object.keys(notes).map((id) => ({ ...notes[id], id }));
            const filteredNotes = newNotes.filter(note => note.notes_name.toLowerCase().includes(text.toLowerCase()));
            setNotes(filteredNotes);
        });
    };

    const handleSearchInputChange = (text) => {
        setSearchText(text);
        searchNotes(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleSearchInputChange}
                        value={searchText}
                        placeholder="Search notes..."
                        onSubmitEditing={() => searchNotes(searchText)}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Foundation name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.noteListContainer}>
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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        width: 240,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        marginLeft: 10,
        height: 30,
        flex: 1,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: 5,
        marginHorizontal: 10,
    },
    noteListContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default NoteSearch;