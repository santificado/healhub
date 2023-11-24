import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../../../config'; // Import your Firebase app instance
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const logoSource = require('../assets/Logo_Healhub.png');

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const Cadastro = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = async () => {
    const auth = getAuth(app);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      // Handle success, e.g., navigate to the next screen
      console.log('Cadastro realizado com sucesso:', response);
      navigation.navigate('Main'); // Change this line based on your navigation setup
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      // Handle error, e.g., set an error message
      setError('Erro ao cadastrar. Verifique suas informações e tente novamente.');
    }
  };

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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
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
  cadastroButton: {
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

export default Cadastro;
