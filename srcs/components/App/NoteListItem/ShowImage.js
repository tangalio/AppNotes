import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ShowImage = ({ route }) => {
    const imageUri = route.params.uri;
    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default ShowImage;
