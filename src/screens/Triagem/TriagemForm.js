import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#232323',
    paddingBottom: '320px',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  input: {
    height: '90%', 
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 15, 
    backgroundColor: '#fff', 
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

const TriagemForm = () => {
  const [sintomas, setSintomas] = useState('');
  const [idade, setIdade] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const formData = { idade, sintomas };
      const history = await AsyncStorage.getItem('history');
      const updatedHistory = history ? JSON.parse(history) : [];
      updatedHistory.push(formData);
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));

      setIdade('');
      setSintomas('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  const handleBackToMain = () => {
    navigation.navigate('Main');
  };


  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
        <Text style={styles.backButtonText}> Voltar </Text>
      </TouchableOpacity>
      <View style={styles.section}>        
      <Text style={styles.label}>Idade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Qual a sua idade?"
          value={idade}
          onChangeText={(text) => setIdade(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva seus sintomas..."
          value={sintomas}
          onChangeText={(text) => setSintomas(text)}
        />


      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('HistoryPage')}
      >
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default TriagemForm;
