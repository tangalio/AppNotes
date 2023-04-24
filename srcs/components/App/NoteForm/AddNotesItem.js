import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import themeColor from '../../../assets/theme/themeColor';
import { firebase } from "../../../services/firebase/config";
const AddNotesItem = ({ route }) => {
    const [notes_id, setNotes_id] = useState(route.params.notes);
    const [selectedColor, setSelectedColor] = useState(null);
    const [color, setColor] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            if (result.type === 'success') {
                const { name, type, uri } = result;
                setFile({ name, type, uri });
                console.log('File selected:', uri);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };

    const uploadPdfAndGetUrl = async (file) => {
        try {
            // Tạo tham chiếu đến tệp trên Firebase Storage
            const storageRef = storage.ref(`pdfs/${file.name}`);
            // Upload file lên Firebase Storage
            const response = await fetch(file.uri);
            const blob = await response.blob();
            // console.log("response",  fetch(file.uri));
            // console.log("blob",  response.blob());
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




    // Function to pick multiple images from gallery
    const pickImages = async () => {
        let results = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!results.canceled) {
            // Sử dụng hàm map để lặp qua từng ảnh được chọn và lưu lại địa chỉ của chúng vào mảng images
            const uris = results.assets.map(asset => asset.uri);
            setImages([...images, ...uris]);
        }
    };

    // Khởi tạo storage của Firebase
    const storage = firebase.storage();

    // Hàm để upload ảnh lên Firebase Storage và trả về URL download của ảnh
    const uploadImageAndGetUrl = async (imageUri) => {
        // Tạo reference đến file trên Firebase Storage
        const imageRef = storage.ref(`images/${new Date().getTime()}.jpg`);
        // Chuyển đổi imageUri thành blob để upload lên Firebase Storage
        const response = await fetch(imageUri);
        const blob = await response.blob();
        // Upload blob lên Firebase Storage và lấy URL download của ảnh
        await imageRef.put(blob);
        const downloadUrl = await imageRef.getDownloadURL();
        // Trả về URL download của ảnh
        return downloadUrl;
    };


    const handleCancelPress = () => {
        setTitle('')
        setContent('')
        setSelectedColor('')
        setImages([])
        setFile('')
    };

    const handleConfirmPress = async () => {
        if (!title || !selectedColor) {
            alert("Không được để trống các trường!");
            return;
        }
        try {
            setLoading(true);
            setUploading(true);
            const imageObjects = [];
            for (const imageUri of images) {
                const downloadUrl = await uploadImageAndGetUrl(imageUri);
                imageObjects.push({ uri: downloadUrl });
            }
            // console.log('imageObjects', imageObjects);
            const newImageObject = {
                title: title,
                content: content,
                color: selectedColor,
                images: imageObjects,
                file: '',
                notes_id: notes_id,
            };
            const downloadURLFILE = [];

            if (file) {
                const s = await uploadPdfAndGetUrl(file);
                downloadURLFILE.push(s);
            }
            // console.log("downloadURLFILE", downloadURLFILE);
            // const downloadURLFILE = await uploadPdfAndGetUrl(file);

            const newFileObject = {
                title: title,
                content: content,
                color: selectedColor,
                images: '',
                file: downloadURLFILE,
                notes_id: notes_id,
            };

            // Nếu imageObjects là null, vẫn cho images được add lên firebase Realtime Database
            const notesRef = firebase.database().ref('notes/NotesItem');
            const newNotesRef = notesRef.push();
            if (imageObjects.length === 0 && downloadURLFILE.length === 0) {
                await newNotesRef.set({
                    title: title,
                    content: content,
                    color: selectedColor,
                    images: '',
                    file: '',
                    notes_id: notes_id,
                });
            } else if (downloadURLFILE.length === 0) {
                await newNotesRef.set(newImageObject);
            } else if (imageObjects.length === 0) {
                await newNotesRef.set({
                    title: title,
                    content: content,
                    color: selectedColor,
                    images: '',
                    file: downloadURLFILE,
                    notes_id: notes_id,
                });
            } else {
                await newNotesRef.set({
                    title: title,
                    content: content,
                    color: selectedColor,
                    images: imageObjects,
                    file: downloadURLFILE,
                    notes_id: notes_id,
                });
            }
            handleCancelPress();
            alert("Thêm thành công!");
        } catch (error) {
            console.log(error);
        } finally {
            setUploading(false);
            setLoading(false);
        }
    };



    const handleColorPress = (colorId) => {
        setSelectedColor(colorId);

    };

    return (
        <View style={styles.containerModal}>
            {loading ? (
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>{loading ? 'Loading...' : 'Data loaded.'}</Text>
                </View>
            ) : (
                <View style={styles.container}>
                    <TextInput style={styles.textInput}
                        onChangeText={(text) => setTitle(text)}
                        value={title} placeholder="Tiêu đề" />
                    <TextInput textAlignVertical='top' multiline={true} style={styles.textInputContent}
                        onChangeText={(text) => setContent(text)}
                        value={content} placeholder="Nội dung" />

                    <View style={styles.containerItem}>
                        <Text>Màu sắc</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {
                                themeColor.map((item, index) => {
                                    return (
                                        <Pressable
                                            key={item.name}
                                            onPress={() => handleColorPress(item.name)}
                                            borderRadius={25}
                                            width={50}
                                            height={50}
                                            margin={1}
                                            justifyContent="center"
                                            alignItems="center"
                                            borderWidth={1}
                                            borderColor={'#E9E9E9'}
                                            backgroundColor={item.name}
                                        >
                                            {selectedColor === item.name && <Feather name="check" size={24} color="blue" />}
                                        </Pressable>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.containerText}>Hình ảnh</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <TouchableOpacity onPress={pickImages}>
                                <MaterialIcons name="add-photo-alternate" size={60} color="black" />
                            </TouchableOpacity>
                            {images.reverse().map((uri, index) => (
                                <Image key={index} source={{ uri }} style={{ width: 60, height: 60, marginHorizontal: 2 }} />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.containerText}>File</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                        </ScrollView>
                        <TouchableOpacity onPress={pickDocument}>
                            <MaterialCommunityIcons name="file-pdf-box" size={60} color="black" />
                        </TouchableOpacity>



                        <View style={styles.viewFile}>
                            {file ?
                                <View style={styles.containerItemPDF}>
                                    <MaterialCommunityIcons name="file-pdf-box" size={24} color="#D0564B" />
                                    <Text style={styles.textItemPDF}>{file.name}</Text>
                                </View>
                                : null}
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={handleConfirmPress} style={{ fontSize: 18, color: 'blue', padding: 10 }}>Đồng ý</Text>
                        <Text onPress={() => handleCancelPress()} style={{ fontSize: 18, color: 'red', padding: 10 }}>Hủy</Text>
                    </View>
                </View>
            )}

        </View>
    )
}

export default AddNotesItem;

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
    },
    activityIndicator: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        marginVertical: 2,
        backgroundColor: '#FFF',
        // borderWidth: 1,
        alignItems: "center"
    },
    containerItem: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    containerItemPDF: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
        paddingHorizontal: 5
    },
    containerText: {
    },
    viewFile: {
        // borderWidth: 1,
        borderRadius: 10,

    },
    viewFileText: {
        color: 'red'
    },
    textInput: {
        height: 40,
        marginVertical: 6,
        borderWidth: 2,
        padding: 10,
        width: 340,
        borderRadius: 10
    },
    textItemPDF: {
        fontSize: 12,
        fontWeight: 'bold',
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