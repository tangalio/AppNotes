import React from 'react';
import { Pressable, ScrollView, Image, StyleSheet } from 'react-native';

const ImageNoteListItem = ({ images }) => {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingTop: 10 }}>
            {images.map((image, index) => (
                <Pressable key={index} justifyContent="center" alignItems="center" style={{ margin: 5 }}>
                    <Image source={{ uri: image.uri }} style={{ width: 50, height: 50, borderWidth: 1, borderColor: "#E9E9E9", borderRadius: 10 }} />
                </Pressable>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },

});

export default ImageNoteListItem;
