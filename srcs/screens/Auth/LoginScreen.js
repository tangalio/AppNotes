import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Logo from '../../components/Auth/Logo';
import InputField from '../../components/Auth/InputField';
import Button from '../../components/Auth/Button';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../services/firebase/config';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = async (email, password) => {
        // Handle login logic here
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            alert(error.message)
        }
    };
    const handleRegister = () => {
        // Xử lý chuyển sang trang đăng ký tại đây
        navigation.navigate('Register');
    };

    const handleForgotPassword = () => {
        // Xử lý chuyển sang trang quên mật khẩu tại đây
        navigation.navigate('ForgotPassword');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
                <View style={styles.logoContainer}>
                    <Logo />
                    <Text style={styles.title}>Welcome to my app</Text>
                </View>
                <View style={styles.inputContainer}>
                    <InputField
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        autoCapitalize="none"
                        keyboardType="email-address"

                    />
                    <InputField
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </View>
                <Button title="Log In" onPress={() => handleLogin(email, password)} />
                <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
                    <Text style={styles.buttonTextRegister}>No account yet?</Text>
                    <Text style={styles.buttonTextRegister1}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    buttonRegister: {
        backgroundColor: '#FFF',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        height: 50,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextRegister: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonTextRegister1: {
        color: '#FF8A39',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: '#2196f3',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
