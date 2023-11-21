import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import auth  from '../../../config';
const logoSource = require('../assets/Logo_Healhub.png');
import firebase from 'firebase';

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const Cadastro = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [password, setPassword] = useState('');
  const [app, setApp] = useState(null);

  async function handleCadastro() {
    try {
      // Use the createUserWithEmailAndPassword method from the imported firebase object
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
    }
  }

  function handleLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <LogoImage source={logoSource} resizeMode="contain" />
      <Text style={styles.title}>Cadastro</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Pressable onPress={handleLogin}>
        <Text style={styles.buttonText}>Já tem uma conta? Entre</Text>
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
    paddingBottom: '318px',
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

export default Cadastro;
