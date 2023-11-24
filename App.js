import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/screens/Main';
import Login from './src/screens/Auth/Login';
import Cadastro from './src/screens/Auth/Cadastro';
import Profile from './src/screens/Profile/Profile';
import ChatGPT from './src/screens/Chat/ChatGPT';
import TriagemForm from './src/screens/Triagem/TriagemForm';
import HistoryPage from './src/screens/Triagem/HistoryPage';
import EditScreen from './src/screens/Triagem/EditScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTransparent: true,
          headerShown: false,
          contentStyle: { backgroundColor: '#232323' },
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="ChatGPT" component={ChatGPT} />
        <Stack.Screen name="HistoryPage" component={HistoryPage} />
        <Stack.Screen name="Triagem" component={TriagemForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
