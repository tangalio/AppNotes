import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SettingItem from '../../../components/App/Setting/SettingItem';
import { firebase } from '../../../services/firebase/config'
const SettingScreen = () => {
    const handleLogout = () => {
        // Xử lý logout tại đây
        Alert.alert(
            'Đăng xuất',
            'Bạn có chắc chắn bạn muốn thoát ?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => firebase.auth().signOut(),
                },
            ],
            { cancelable: false },
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <SettingItem title="Account" onPress={() => console.log('Account pressed')} />
            <SettingItem title="Privacy" onPress={() => console.log('Privacy pressed')} />
            <SettingItem title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
    optionStatus: {
        fontSize: 16,
        color: '#666',
    },
});

export default SettingScreen;
