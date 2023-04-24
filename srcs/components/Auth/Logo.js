import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        borderRadius:5
    },
});

export default Logo;
