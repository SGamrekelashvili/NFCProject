import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  Text,
} from 'react-native';
import NfcProxy from '../../utils/ProxyNFC';
import Button from '../Button';

function WifiSimpleWriter(props, ref) {
  const [ssid, setSsid] = React.useState(props.value?.ssid || '');
  const [networkKey, setNetworkKey] = React.useState(
    props.value?.networkKey || '',
  );
  const NFCProxy = new NfcProxy();

  if (ref) {
    ref.current = {
      getValue: () => ({ssid, networkKey}),
    };
  }

  const writeNdef = async () => {
    if (!ssid || !networkKey) {
      return;
    }

    await NFCProxy.writeNdef({
      type: 'WIFI_SIMPLE',
      value: {ssid, networkKey},
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{textAlign: 'center', flex: 0.5}}> SSID</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={ssid}
          onChangeText={setSsid}
        />
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{textAlign: 'center', flex: 0.5}}> Network Key</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={networkKey}
          onChangeText={setNetworkKey}
        />
      </View>
      <Button
        text="Write"
        containerStyle={{marginVertical: 10}}
        textStyle={{fontSize: 20}}
        onPress={writeNdef}
      />
    </KeyboardAvoidingView>
  );
}

export default React.forwardRef(WifiSimpleWriter);
