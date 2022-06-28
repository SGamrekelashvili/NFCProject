import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  SectionList,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';

const WriteScreen = ({navigation}) => {
  const DATA = [
    {
      title: 'Well Known',
      data: [
        {
          title: 'Text',
          description: 'Write text into NFC tags',
          icon: '',
          onPress: () => navigation.navigate('NdefWrite', {ndefType: 'TEXT'}),
        },
        {
          title: 'Link',
          description: 'Write web link or uri into NFC tags',
          icon: '',
          onPress: () => navigation.navigate('NdefWrite', {ndefType: 'URI'}),
        },
        {
          title: 'TEL',
          description: 'Write number into NFC tags to make phone call',
          icon: '',
          onPress: () =>
            navigation.navigate('NdefWrite', {ndefType: 'URI', scheme: 'tel:'}),
        },
        {
          title: 'SMS',
          description: 'Write number into NFC tags to send SMS',
          icon: '',
          onPress: () =>
            navigation.navigate('NdefWrite', {ndefType: 'URI', scheme: 'sms:'}),
        },
        {
          title: 'EMAIL',
          description: 'Write email into NFC tags',
          icon: '',
          onPress: () =>
            navigation.navigate('NdefWrite', {
              ndefType: 'URI',
              scheme: 'mailto:',
            }),
        },
      ],
    },
    {
      title: 'MIME',
      data: [
        {
          title: 'WiFi Simple Record',
          description: 'Connect to your WiFi AP',
          icon: '{NfcIcons.WifiIcon}',
          onPress: () =>
            navigation.navigate('NdefWrite', {ndefType: 'WIFI_SIMPLE'}),
        },
        {
          title: 'vCard / ***Need Update***',
          description:
            'Write contact records. Please beaware vCard format is not supported by iOS natively',
          icon: '',
          onPress: () => navigation.navigate('NdefWrite', {ndefType: 'VCARD'}),
        },
        {
          title: 'HCE (Supported Only On Android)',
          description: 
          'Send Info Between Androids',
          icon: '',
          onPress: () => navigation.navigate('NdefWrite', {ndefType: 'HCE'}),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <SectionList
          scrollEnabled={false}
          sections={DATA}
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={e => {
            const item = e.item;
            return (
              <>
                <Text style={{textAlign: 'center'}}>{item.title}</Text>
                <Button
                  text={item.description}
                  onPress={item.onPress}
                  containerStyle={{marginVertical: 10}}
                />
              </>
            );
          }}
          renderSectionHeader={({section}) => {
            return (
              <View style={{width: '100%', height: 20, marginVertical: 20}}>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                  {section.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});
