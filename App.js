import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import MainTabs from './src/navigation/MainTabs';

import { store, persistor } from './src/stores/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
