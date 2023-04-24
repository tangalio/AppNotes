import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../../../services/firebase/config'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const Decode = () => {
    const navigation = useNavigation();
    const [decode, setDecode] = useState([]);
    useEffect(() => {
        const databaseRef = firebase.database().ref('notes/Encoded');
        databaseRef.on('value', (snapshot) => {
            const decode = snapshot.val();
            const newDecode = [];
            for (let id in decode) {
                newDecode.push({ ...decode[id], id });
            }
            setDecode(newDecode);
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Decode</Text>
            <FlatList
                data={decode}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PdfDecode', { encrypted: item.encrypted })}>
                        <View style={styles.containerItemPDF}>
                            <MaterialCommunityIcons name="file-pdf-box" size={24} color="#D0564B" />
                            <Text style={styles.textItemPDF}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    containerItemPDF: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        margin: 2
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    fileUriText: {
        fontSize: 16,
        marginBottom: 10,
    },
    keyLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    keyInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    encodeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'center',
    },
    outputLabel: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5,
    },
    outputUriText: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    downloadButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'center',
    },
    decodeButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignSelf: 'center',
    },
    decodeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    resetButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    resetButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
export default Decode;
