import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NfcProxy from '../../utils/ProxyNFC';
import Button from '../Button';

const InputLabel = {
  'sms:': 'Number',
  'tel:': 'Number',
  'mailto:': 'Email',
};

function RtdUriShortcutWriter(props, ref) {
  const scheme = props.scheme;
  const [value, setValue] = React.useState(props.value?.value || '');
  const inputRef = React.useRef();
  const NFCProxy = new NfcProxy();

  if (ref) {
    ref.current = {
      getValue: () => ({value, scheme}),
    };
  }

  const writeNdef = async () => {
    inputRef.current && inputRef.current.blur();

    if (!value) {
      return;
    }

    const url = scheme + value;
    await NFCProxy.writeNdef({type: 'URI', value: url});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>Scheme {scheme}</Text>
        <View style={{flex: 1}} />
      </View>
      <Text style={{textAlign: 'center'}}>{InputLabel[scheme]}</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          height: 40,
          padding: 10,
          width: '70%',
        }}
        autoFocus={true}
      />

      <Button text="WRITE" textStyle={{fontSize: 20}} onPress={writeNdef} />
    </KeyboardAvoidingView>
  );
}

export default React.forwardRef(RtdUriShortcutWriter);
