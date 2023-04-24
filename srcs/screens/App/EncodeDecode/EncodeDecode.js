import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import CryptoES from 'crypto-es';
import { firebase } from '../../../services/firebase/config'
import { MaterialIcons } from '@expo/vector-icons';
import DownloadFileOptions from 'react-native-fs'
export default function EncodeDecode() {
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEncoded, setIsEncoded] = useState(false);
    const [outputUri, setOutputUri] = useState(null);
    const [file, setFile] = useState(null);
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
    // console.log('decode', decode);
    const handleFilePick = async () => {


        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            if (result.type === 'success') {
                const { name, type, uri } = result;
                setFile({ name, type, uri });
                // console.log('result', result);
            }
        } catch (err) {
            console.log('Error:', err);
        }

    };
    const uploadPdfAndGetUrl = async (file) => {
        try {
            // Tạo tham chiếu đến tệp trên Firebase Storage
            const storage = firebase.storage();
            const storageRef = storage.ref(`pdfs/${file.name}`);
            // Upload file lên Firebase Storage
            const response = await fetch(file.uri);
            const blob = await response.blob();
            await storageRef.put(blob);
            // Lấy URL tải xuống của file vừa upload
            const downloadUrl = await storageRef.getDownloadURL();
            const fileName = file.name;
            // Trả về URL tải xuống của file
            return { fileName, downloadUrl };
        } catch (error) {
            console.error(error);
        }
    };

    const handleEncode = async () => {
        try {
            if (!file || !key) {
                Alert.alert(!file ? 'Select file' : 'Enter key');
                return;
            }
            setIsLoading(true);
            const Encode = await uploadPdfAndGetUrl(file);
            const name = Encode.fileName;
            const uri = Encode.downloadUrl;
            const encrypted = CryptoES.AES.encrypt(uri, key).toString();
            const notesRef = firebase.database().ref('notes/Encoded');
            const newNotesRef = notesRef.push();
            await newNotesRef.set({
                name: name,
                encrypted: encrypted
            });

            setIsLoading(false);
            setIsEncoded(true);
            Alert.alert('Thành công', 'Tập tin đã được mã hóa thành công!', [{ text: 'OK', onPress: handleReset }]);
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Error', 'Đã xảy ra lỗi khi mã hóa tệp.');
        }
    };

    const handleReset = () => {
        setFile(null);
        setKey('');
        setIsLoading(false);
        setIsEncoded(false);
        setOutputUri(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>File Encoder</Text>
            <TouchableOpacity style={styles.button} onPress={handleFilePick}>
                <MaterialIcons name="attach-file" size={24} color="black" />
                <Text style={styles.buttonText}>Select File</Text>
            </TouchableOpacity>
            {
                file ? <Text style={styles.fileUriText}>Selected file: {file.name}</Text> : null
            }
            <Text style={styles.keyLabel}>Enter key:</Text>
            <TextInput
                style={styles.keyInput}
                onChangeText={setKey}
                value={key}
                placeholder="Enter key"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.encodeButton} onPress={handleEncode} disabled={isLoading}>
                <Text style={styles.buttonText}>Encode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
    resetButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    }
});