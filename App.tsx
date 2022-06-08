import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WriteScreen, ReadScreen, Home} from './screens';
import NdefWrite from './screens/NdefWrite';
import {Provider as PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const options = {};

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="WriteScreen" component={WriteScreen} />
            <Stack.Screen name="ReadScreen" component={ReadScreen} />
            <Stack.Screen name="NdefWrite" component={NdefWrite} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default App;
