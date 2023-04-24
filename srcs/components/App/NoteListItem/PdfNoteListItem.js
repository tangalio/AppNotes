import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const PdfNoteListItem = ({ file }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="file-pdf-box" size={24} color="#D0564B" />
            {
                file.map((file, index) => (

                    <Text key={index} style={styles.textItemPDF}>{file.fileName}</Text>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
        paddingHorizontal: 5,
        marginVertical: 2,
        marginHorizontal: 2,
        borderWidth: 1,
        borderColor: "#E9E9E9",
    },
    textItemPDF: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default PdfNoteListItem;
