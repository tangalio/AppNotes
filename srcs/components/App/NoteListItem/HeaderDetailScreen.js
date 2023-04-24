import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderDetailScreen = ({ name, onUpdate, onBack }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
            <TouchableOpacity style={styles.updateButton} onPress={onUpdate}>
                <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    updateButton: {
        // marginLeft: 16,
        // backgroundColor: 'blue',
        // padding: 8,
        // borderRadius: 4,
    },
    updateText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default HeaderDetailScreen;
