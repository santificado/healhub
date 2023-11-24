import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Import expo-sharing

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('history');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    loadHistory();

    const unsubscribe = navigation.addListener('focus', () => {
      loadHistory();
    });

    return unsubscribe;
  }, [navigation, reloadData]);

  const handleDelete = async (index) => {
    const updatedHistory = [...history];
    updatedHistory.splice(index, 1);

    try {
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
      setHistory([...updatedHistory]);
      setSelectedItem(null);
      setReloadData(true); // Set the reload flag to true
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (index) => {
    navigation.navigate('EditScreen', { index });
  };

  const handleGeneratePDF = async () => {
    const pdfContent = history.map((item, index) => (
      `Registro ${index + 1}:\nIdade: ${item.idade}\nSintomas: ${item.sintomas}\n\n`
    )).join('');

    try {
      const { uri } = await Print.printToFileAsync({ html: pdfContent });

      // Move the file to a persistent directory
      const destinationUri = `${FileSystem.documentDirectory}historico.pdf`;
      await FileSystem.moveAsync({ from: uri, to: destinationUri });

      console.log('PDF generated successfully:', destinationUri);

      // Share the PDF using expo-sharing
      await Sharing.shareAsync(destinationUri, { mimeType: 'application/pdf', dialogTitle: 'Compartilhar PDF' });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleBack = () => {
    navigation.navigate('Triagem');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.historyItem, selectedItem === index && styles.selectedItem]}
            onPress={() => setSelectedItem(index)}
          >
            <View>
              <Text style={styles.historyText}>Idade {item.idade}</Text>
              <Text style={styles.historyText}>Sintomas {item.sintomas}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {selectedItem !== null && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(selectedItem)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(selectedItem)}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.generatePDFButton} onPress={handleGeneratePDF}>
        <Text style={styles.buttonText}>Gerar PDF</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Voltar para Triagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#232323',
    height: '100%',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#2ecc71',
  },
  historyText: {
    fontSize: 16,
    marginBottom: 8,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  generatePDFButton: {
    marginTop: 20,
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HistoryPage;
