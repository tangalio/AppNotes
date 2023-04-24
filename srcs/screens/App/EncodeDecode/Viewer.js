import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PdfReader from 'rn-pdf-reader-js';
const Viewer = ({ route }) => {
    const file = route.params.file;
    return (
        <PdfReader
            source={{
                uri: `${file}`
            }}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: '100%',
    }
});
export default Viewer;