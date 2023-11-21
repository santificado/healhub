import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoSource = require('../assets/Logo_Healhub.png');
const defaultProfileImage = require('../assets/default.png');

const LogoImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
  border-radius: 50px;
`;

const Label = styled.Text`
  margin-bottom: 10px;
  color: white;
`;

const Profile = ({ navigation, userEmail }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    // Load the saved image URI from AsyncStorage when the component mounts
    loadSavedImage();
  }, []);

  const loadSavedImage = async () => {
    try {
      const savedImageUri = await AsyncStorage.getItem('profileImage');
      if (savedImageUri) {
        setProfileImage({ uri: savedImageUri });
      }
    } catch (error) {
      console.error('Error loading saved image:', error);
    }
  };

  const handleLogout = () => {
    console.log('Usuário deslogado com sucesso');
    navigation.navigate('Login');
    // props.setLogedUser(""); // Certifique-se de adicionar essa propriedade se necessário
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      console.error('Permission to access media library was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      console.log('Usuário cancelou a seleção de imagem');
    } else {
      setProfileImage({ uri: result.uri });
      saveImage(result.uri);
    }
  };

  const saveImage = async (uri) => {
    try {
      await AsyncStorage.setItem('profileImage', uri);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleSave = () => {
    if (profileImage) {
      setConfirmationMessage('Imagem salva com sucesso!');
    } else {
      Alert.alert('Erro', 'Selecione uma imagem antes de salvar.');
    }
  };

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  const showConfirmationAlert = () => {
    Alert.alert('Confirmação', confirmationMessage, [
      { text: 'OK', onPress: () => setConfirmationMessage('') },
    ]);
  };

  return (
    <View style={styles.view}>
      <Label>User Profile</Label>
      <TouchableOpacity onPress={handleImagePicker}>
        <LogoImage source={profileImage ? profileImage : defaultProfileImage} />
      </TouchableOpacity>
      <Text style={styles.emailText}>{userEmail}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Fazer Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToMain} style={styles.backButton}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      {confirmationMessage ? showConfirmationAlert() : null}
    </View>
  );
};

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#232323',
    paddingBottom: '451px',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 16,
  },
  emailText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
};

export default Profile;
