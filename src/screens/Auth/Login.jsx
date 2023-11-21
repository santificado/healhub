import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../config';
const logoSource = require('../assets/Logo_Healhub.png');
import  firebase  from 'firebase';

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const Login = ({ setIsLogged }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

async function handleLogin() {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Main');
      setIsLogged(true);
      alert('Usuário logado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  }

  function handleCadastro() {
    navigation.navigate('Cadastro');
  }


  return (
    <View style={styles.container}>
      <LogoImage source={logoSource} resizeMode="contain" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Pressable onPress={handleCadastro}>
        <Text style={styles.buttonText}>Não tem uma conta? Cadastre-se</Text>
      </Pressable>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#232323',
    paddingBottom: 318,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 16,
  },
};

export default Login;
