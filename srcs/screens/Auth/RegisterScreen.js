import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import Logo from '../../components/Auth/Logo';
import InputField from '../../components/Auth/InputField';
import Button from '../../components/Auth/Button';
import { firebase } from '../../services/firebase/config';
import LoadingScreen from '../../components/Auth/LoadingScreen';
import { AntDesign } from '@expo/vector-icons';
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async (name, email, password, confirmPassword) => {
        try {
            if (!name || !email || !password || !confirmPassword) {
                alert('Xin vui lòng điền đầy đủ thông tin !');
                return;
            }

            if (password !== confirmPassword) {
                alert('mật khẩu không trùng khớp !');
                return;
            }

            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ !');
                return;
            }

            setIsLoading(true);

            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // Đăng ký thành công
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://notes1-b39a3.firebaseapp.com',
                    })
                        .then(() => {
                            alert('Gửi email xác minh !');
                            // navigation.goBack();
                        })
                        .catch((error) => {
                            alert(error.message);
                        })
                        .then(() => {
                            firebase.firestore().collection('user')
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name,
                                    email,
                                })
                                .then(() => {
                                    setName('');
                                    setEmail('');
                                    setPassword('');
                                    setConfirmPassword('');
                                })
                                .catch((error) => {
                                    alert(error.message);
                                });
                        })
                        .catch((error) => {
                            alert(error.message);
                        });
                })
                .catch((error) => {
                    alert('E-mail đã được đăng ký !');
                });

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <View style={styles.container}>
            {isLoading ? (<LoadingScreen />) : (
                <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Logo />
                        <Text style={styles.title}>Welcome to my app</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <InputField
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                            autoCapitalize="words"
                        />
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
                        <InputField
                            label="Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Enter your confirm password"
                            secureTextEntry
                        />
                    </View>
                    {/* <Button title="Register" onPress={handleLogin} /> */}
                    <Button title="Register" onPress={() => registerUser(name, email, password, confirmPassword)} />
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonTextLogin}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </ImageBackground>
            )}

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
    buttonLogin: {
        // marginTop: 20,
    },
    buttonTextLogin: {
        color: '#2196f3',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
        zIndex: 1,
    },
});

export default RegisterScreen;
