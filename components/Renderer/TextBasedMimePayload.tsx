import {Text, View} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';
import {NdefMessageProps} from '../../utils/Types';

const TextBasedMimePayload = ({ndef, mimeType}: NdefMessageProps) => {
  const text = Ndef.util.bytesToString(ndef.payload);
  return (
    <View>
      <Text style={{fontSize: 16, color: 'gray'}}>{mimeType}</Text>
      <Text style={{fontSize: 16}}>{text}</Text>
    </View>
  );
};

export default TextBasedMimePayload;
