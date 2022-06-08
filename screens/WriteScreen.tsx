import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WriteScreen</Text>
    </View>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
