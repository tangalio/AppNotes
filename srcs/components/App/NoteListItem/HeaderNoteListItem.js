import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const HeaderNoteListItem = ({ notes_image, notes_name, onShare, onsearch }) => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={{ marginHorizontal: 2 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 26 }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textHeader}>
                        {notes_name}
                    </Text>
                </View>

                <TouchableOpacity backgroundColor={'red'} onPress={onsearch}>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>

            </View>
            <View>
                <TouchableOpacity onPress={onShare} >
                    <Entypo name="share" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HeaderNoteListItem;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 12,
        borderBottomColor: "#E9E9E9"
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
        width: 200
    },
});