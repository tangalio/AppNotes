import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const ImageListItem = ({ images }) => {
    const navigation = useNavigation();
    const halfLength = Math.ceil(images.length / 2);
    const firstHalf = images.slice(0, halfLength);
    const secondHalf = images.slice(halfLength);

    const renderColumn = (column) => {
        return (
            <View style={styles.column}>
                {column.map((item, index) => (
                    <TouchableOpacity key={`image-${index}`} onPress={() => navigation.navigate('ShowImage', { uri: item.uri })}>
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    </TouchableOpacity>

                ))}
            </View>
        );
    };

    return (
        <View style={styles.imageContainer}>
            {renderColumn(firstHalf)}
            {renderColumn(secondHalf)}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    imageTitle: {
        marginTop: 5,
        fontSize: 12,
    },
});

export default ImageListItem;
