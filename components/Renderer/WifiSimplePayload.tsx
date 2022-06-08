import {Text, View} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';
import {NdefMessageProps} from '../../utils/Types';
import React from 'react';

const WifiSimplePayload = ({ndef}: NdefMessageProps) => {
  const credentials = Ndef.wifiSimple.decodePayload(ndef.payload);
  return (
    <View style={{marginTop: 10}}>
      <Text style={{marginBottom: 5}}>WIFI_SIMPLE</Text>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{color: 'grey', marginRight: 5}}>SSID:</Text>
        <Text style={{fontSize: 16, flex: 1}}>{credentials.ssid || '---'}</Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 5}}>
        <Text style={{color: 'grey', marginRight: 5}}>Network Key:</Text>
        <Text style={{fontSize: 16, flex: 1}}>
          {credentials.networkKey || '---'}
        </Text>
      </View>
    </View>
  );
};

export default WifiSimplePayload;
