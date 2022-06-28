import React from 'react';
import { Alert } from 'react-native';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import HCESession, { NFCContentType, NFCTagType4 } from 'react-native-hce';
import Button from '../Button';
let simulation;

interface Props {
  value: string | undefined;
}
function HCEWrite(props: Props, ref: any) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState<string>(props.value || '');

  const startSimulation = async (text:string) => {
      const tag = new NFCTagType4(NFCContentType.Text, text);
      simulation = await (new HCESession(tag)).start();
      console.log(simulation)
      if(simulation){
        Alert.alert("Done","Done")
      }
  }
  

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

  startSimulation(value);
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center'}}>Input Text TO HCE</Text>
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

export default React.forwardRef(HCEWrite);
