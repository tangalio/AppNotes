import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
class CustomFab extends Component {
    render() {
        const { onPress, iconColor } = this.props;

        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
                    <Ionicons name="add" size={30} color="black" />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        marginHorizontal: '50%',
        alignItems: 'center',


    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#E9E9E9",
    },
    icon: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 5,
        color: '#fff',
        fontSize: 14,
    },
});

export default CustomFab;
