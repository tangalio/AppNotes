import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native';
import CryptoES from 'crypto-es';
import { useNavigation } from "@react-navigation/native";
import urlRegex from 'url-regex';
const PdfViewer = ({ route }) => {
    const encrypted = route.params.encrypted;
    const [apiKey, setApiKey] = useState('');
    const navigation = useNavigation();

    const handleDecode = async () => {
        if (!encrypted || !apiKey) {
            Alert.alert(!encrypted ? 'Select file' : 'Enter key');
            return;
        }
        const decrypted = CryptoES.AES.decrypt(encrypted, apiKey).toString(CryptoES.enc.Utf8);
        const isUrl = urlRegex({ exact: true }).test(decrypted)
        if (isUrl) {
            navigation.navigate('Viewer', { file: decrypted });
            handleReset();
        } else {
            Alert.alert('Invalid key');
        }
    };

    const handleReset = () => {
        setApiKey('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter API Key"
                onChangeText={(text) => setApiKey(text)}
                value={apiKey}
            />
            <TouchableOpacity style={styles.decodeButton} onPress={handleDecode}>
                <Text style={styles.buttonText}>Decode</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    pdf: {
        flex: 1,
        width: '100%',
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
});

export default PdfViewer;
