import React from 'react';
import {Text} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';
import {NdefMessageProps} from '../../utils/Types';

const RtdTextPayload = ({ndef}: NdefMessageProps) => {
  const text = Ndef.text.decodePayload(ndef.payload);
  return <Text style={{fontSize: 18}}>{text}</Text>;
};

export default RtdTextPayload;
