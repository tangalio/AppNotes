import React, { useState, useEffect } from 'react';
import PdfReader from 'rn-pdf-reader-js';
const PdfViewer = ({ route }) => {
    const file = route.params.file;
    const [downloadUrl, setDownloadUrl] = useState();
    useEffect(() => {
        file.map((file, index) => (
            setDownloadUrl(file.downloadUrl)
        ))
    }, []);
    return (
        <PdfReader
            source={{
                uri: `${downloadUrl}`
            }}
        />
    )
};

export default PdfViewer;