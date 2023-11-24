import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const apiKey = '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'; // Substitua pelo seu token de API OpenAI
const apiURL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

const ChatMessage = ({ type, text }) => (
  <View style={styles.messageContainer}>
    <Text style={{ fontWeight: 'bold', color: type === 'user' ? 'green' : 'red' }}>{type === 'user' ? 'Você: ' : 'Heal Hub: '}</Text>
    <Text style={styles.messageText}>{text}</Text>
  </View>
);

const ChatGPT = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');

  const handleBackToMain = () => {
    navigation.navigate('Main');
  };

  const handleSend = async () => {
    try {
      const prompt = "Answer me in portuguese, me de dicas sobre:" + textInput;
      const response = await axios.post(apiURL, {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const text = response.data.choices[0].text;
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text }]);
      setTextInput('');
      setError('');
    } catch (err) {
      setError('Erro ao enviar mensagem ao bot. Verifique sua chave de API e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToMain}>
        <Text style={styles.backButtonText}> Voltar </Text>
      </TouchableOpacity>
      <Text style={styles.title}>Chat</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messageListContent}
        renderItem={({ item }) => <ChatMessage type={item.type} text={item.text} />}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={textInput}
          onChangeText={setTextInput}
          placeholder={'Digite sua pergunta aqui'}
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#232323',
    paddingBottom: '551px',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2ecc71',
  },
  messageListContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#232323',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#2ecc71',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#232323',
    color: 'white',
  },
  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
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
});

export default ChatGPT;
