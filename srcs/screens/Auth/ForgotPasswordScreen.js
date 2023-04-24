import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../../components/Auth/InputField';
import Button from '../../components/Auth/Button';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../services/firebase/config';
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (email) => {
    // Handle resetting password logic here
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent")
        navigation.goBack();
      }).catch((e) => {
        alert(e)
      })
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <Button title="Reset Password" onPress={() => handleResetPassword(email)} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back to Login</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    width: '80%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#FF8A39',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  backText: {
    color: '#2196f3',
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
  },
});

export default ForgotPasswordScreen;
