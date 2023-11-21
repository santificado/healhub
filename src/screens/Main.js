import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
const logoSource = require('./assets/Logo_Healhub.png');
const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const Main = () => {
  const navigation = useNavigation();

  const navigateToForms = () => {
    navigation.navigate('Triagem');
  };

  const navigateToChat = () => {
    navigation.navigate('ChatGPT');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#232323', paddingBottom: 310 }}>
     <LogoImage source={logoSource} resizeMode="contain" />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: '88px' }}>HEALHUB</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToForms}>
        <Text style={styles.buttonText}>Formulário</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToChat}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
};

export default Main;
