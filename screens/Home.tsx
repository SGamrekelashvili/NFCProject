import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const Home = ({navigation}: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Which NFC Mode You Want To Use</Text>
      <View style={styles.ButtonsContainer}>
        <Button
          text="Read Nfc Card"
          onPress={() => navigation.navigate('ReadScreen')}
        />
        <Button
          text="Write In Nfc Card"
          onPress={() => navigation.navigate('WriteScreen')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  ButtonsContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 100,
  },
});
