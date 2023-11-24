import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../../config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const logoSource = require('../assets/Logo_Healhub.png');

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const Login = ({ setIsLogged }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
      setIsLogged(true);
      alert('Usuário logado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);

      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('E-mail ou senha não cadastrados. Verifique suas credenciais e tente novamente.');
      } else {
        setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      }
    }
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
};

export default Login;