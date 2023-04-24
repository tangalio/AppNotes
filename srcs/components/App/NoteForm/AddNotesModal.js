import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    Pressable,
    ScrollView,
    Image,
} from "react-native";
import firebase from "firebase/compat";
import { Feather } from "@expo/vector-icons";
import themeColor from "../../../assets/theme/themeColor";

const AddNotesModal = ({ visible, onClose, user }) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedImg, setSelectedImg] = useState(null);
    const [img, setImg] = useState([]);
    const [title, setTitle] = useState("");

    const fetchImages = useCallback(() => {
        const imageRef = firebase.database().ref("notes/Images");
        imageRef.on("value", (snapshot) => {
            const image = snapshot.val();
            const newImages = Object.keys(image).map((id) => ({ ...image[id], id }));
            setImg(newImages);
        });
    }, []);

    useEffect(() => {
        fetchImages();
        setSelectedColor(null);
        setTitle("");
    }, [fetchImages]);

    const handleCancelPress = () => {
        onClose();
        setSelectedColor(null);
        setSelectedImg(null);
        setTitle("");
    };

    const handleConfirmPress = () => {
        if (!title || !selectedColor || !selectedImg || !user.email) {
            alert("Không được để trống các trường!");
            return;
        }

        const notesRef = firebase.database().ref("notes/Notes");
        const newNoteRef = notesRef.push();
        newNoteRef
            .set({
                notes_name: title,
                notes_color: selectedColor,
                notes_image: selectedImg,
                user_email: user.email,
            })
            .then(() => {
                alert("Thêm Tag thành công!");
                onClose();
                setSelectedColor(null);
                setSelectedImg(null);
                setTitle("");
            })
            .catch((error) => {
                console.log(error);
                alert("Lỗi khi thêm Tag!");
            });
    };

    const handleColorPress = (colorId) => {
        setSelectedColor(colorId);
    };

    const handleImagePress = (idUri) => {
        setSelectedImg(idUri);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.containerModal}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Tiêu đề"
                    />

                    <View style={styles.containerItem}>
                        <Text>Màu sắc</Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {themeColor.map((item) => (
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
                                    borderColor={"#E9E9E9"}
                                    backgroundColor={item.name}
                                >
                                    {selectedColor === item.name && (
                                        <Feather name="check" size={24} color="blue" />
                                    )}
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.containerItem}>
                        <Text style={styles.containerText}>Hình nền</Text>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {
                                img.map((item, index) => {
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => handleImagePress(item.url)}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {
                                                selectedImg === item.url
                                                    ?
                                                    <Image source={{ uri: item.url }} style={{ width: 50, height: 50, margin: 1, borderWidth: 2, borderColor: 'blue', borderRadius: 10 }} />
                                                    :
                                                    <Image source={{ uri: item.url }} style={{ width: 50, height: 50, margin: 1, borderWidth: 1, borderColor: "#E9E9E9", borderRadius: 10 }} />
                                            }
                                        </Pressable>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={handleConfirmPress} style={{ fontSize: 18, color: 'blue', padding: 10 }}>Đồng ý</Text>
                        <Text onPress={() => handleCancelPress()} style={{ fontSize: 18, color: 'red', padding: 10 }}>Hủy</Text>
                    </View>
                </View>
            </View>

        </Modal>

    )
}

export default AddNotesModal;
const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    container: {
        marginVertical: 2,
        width: 300,
        height: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: "center"
    },
    containerItem: {
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center"
    },
    containerText: {
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        width: 260,
        borderRadius: 10
    },
});