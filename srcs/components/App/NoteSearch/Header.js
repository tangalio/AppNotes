import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = () => {
        navigation.navigate('Home')
    };
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <View style={{ marginHorizontal: 2 }}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 26 }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.textHeader}>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Header;
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