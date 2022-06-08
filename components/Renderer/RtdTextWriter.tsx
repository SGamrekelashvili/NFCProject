import React from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import NfcProxy from '../../utils/ProxyNFC';
import Button from '../Button';

interface Props {
  value: string | undefined;
}
function RtdTextWriter(props: Props, ref: any) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState(props.value || '');
  const NFCProxy = new NfcProxy();
  if (ref) {
    ref.current = {
      getValue: () => value,
    };
  }

  const writeNdef = async () => {
    inputRef.current && inputRef.current.blur();

    if (!value) {
      return;
    }

    await NFCProxy.writeNdef({type: 'TEXT', value});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center'}}>Input Text</Text>
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

      <Button
        text="Write"
        containerStyle={{marginVertical: 10}}
        textStyle={{fontSize: 20}}
        onPress={writeNdef}
      />
    </KeyboardAvoidingView>
  );
}

export default React.forwardRef(RtdTextWriter);
