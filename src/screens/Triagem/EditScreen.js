// EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditScreen = () => {
  const [editedData, setEditedData] = useState({ idade: '', sintomas: '' });
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {

    const loadEditedData = async () => {
      try {
        const index = route.params?.index;
        const history = await AsyncStorage.getItem('history');
        if (history) {
          const parsedHistory = JSON.parse(history);
          const dataToEdit = parsedHistory[index] || { idade: '', sintomas: '' }
          setEditedData(dataToEdit);
        }
      } catch (error) {
        console.error('Error loading data to edit:', error);
      }
    };

    loadEditedData();
  }, [route.params?.index]);

  const handleSave = async () => {
    try {
      const index = route.params?.index;
      const history = await AsyncStorage.getItem('history');
      if (history) {
        const parsedHistory = JSON.parse(history);
        parsedHistory[index] = editedData;
        await AsyncStorage.setItem('history', JSON.stringify(parsedHistory));
        navigation.goBack(); 
      }
    } catch (error) {
      console.error('Error saving edited data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, backgroundColor: '#232323' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color:'white' }}>
        Editar Dados
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10, color:'white' }}>Idade:</Text>
        <TextInput
          style={{
            height: 50,
            width: '100%',
            borderColor: '#ddd',
            borderWidth: 1,
            marginBottom: 15,
            padding: 10,
            fontSize: 18,
            backgroundColor: '#fff',
             borderRadius:15

          }}
          placeholder="Qual a sua idade?"
          value={editedData.idade}
          onChangeText={(text) => setEditedData({ ...editedData, idade: text })}
          keyboardType="numeric"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 ,color:'white' }}>Sintomas:</Text>
        <View style={{ height: 150, width: '100%', borderColor: '#ddd', marginBottom: 15,  borderRadius:10 }}>
          <TextInput
            style={{
              height: '100%',
              padding: 10,
              fontSize: 18,
              backgroundColor: '#fff',
               borderRadius:15
            }}
            placeholder="Descreva um pouco melhor seus sintomas..."
            value={editedData.sintomas}
            onChangeText={(text) => setEditedData({ ...editedData, sintomas: text })}
            multiline
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom:'266px' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
            padding: 15,
            borderRadius: 8,
            flex: 1,
            marginRight: 8,
          }}
          onPress={handleSave}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
            Salvar Edições
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditScreen;
