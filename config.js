import { initializeApp } from 'firebase/app'
import {
  getReactNativePersistence,
  initializeAuth, getAuth
} from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyDj0coLMetdxKVXGUYGG9g_T1Kmm70rQUA",
  authDomain: "gs-healhub.firebaseapp.com",
  projectId: "gs-healhub",
  storageBucket: "gs-healhub.appspot.com",
  messagingSenderId: "218552184987",
  appId: "1:218552184987:web:f6878e13708240e4a2163e",
  measurementId: "G-N3FHTFSQJQ"
};
 

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});