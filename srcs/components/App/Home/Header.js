import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const Header = ({ user_name, handleSearch }) => {
    return (
        <View style={styles.containerHeader}>
            <View style={styles.containerSearch}>
                <TouchableOpacity onPress={handleSearch}>
                    <View style={styles.search}>
                        <AntDesign name="search1" size={24} color="black" />
                        <Text style={styles.input}>Tìm kiếm ghi chú ...</Text>
                    </View>
                </TouchableOpacity>
                <Image style={styles.avatar} source={require('../../../assets/img/img/translate.png')} />
            </View>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Hello, {user_name}!</Text>
                    <Text style={styles.description}>Let's write memorable things</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatarHeader} source={require('../../../assets/img/img/study.jpg')} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        height: 170,
        backgroundColor: "#F6F6F6",
        borderBottomRadius: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 6,
        marginVertical: 1,
        backgroundColor: '#F6F6F6'
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        width: 240,
    },
    input: {
        marginLeft: 10,
        color: "#9ca3af",
        flex: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 2,
    },
    userInfo: {
        width: '50%',
        backgroundColor: "#F6F6F6",
    },
    avatarContainer: {
        width: '50%',
        backgroundColor: "#F6F6F6",
    },
    username: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        fontWeight: "bold",
        fontSize: 14,
    },
    avatarHeader: {
        width: '100%',
        height: 110
    },
});

export default Header;
