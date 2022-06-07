import {Alert, Linking, TouchableOpacity, Text} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';
import {NdefMessageProps} from '../../utils/Types';

const RtdUriPayload = ({ndef}: NdefMessageProps) => {
  const uri = Ndef.uri.decodePayload(ndef.payload);
  const goToUri = async (uri: string) => {
    try {
      await Linking.openURL(uri);
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Cannot open uri');
    }
  };

  return (
    <TouchableOpacity onPress={() => goToUri(uri)}>
      <Text style={{fontSize: 18, textDecorationLine: 'underline'}}>{uri}</Text>
    </TouchableOpacity>
  );
};
export default RtdUriPayload;
