import * as React from 'react';
import {Platform} from 'react-native';
import {View, Alert, KeyboardAvoidingView, Text, TextInput} from 'react-native';
import NfcProxy from '../../utils/ProxyNFC';
import Button from '../Button';

function VCardWriter(props, ref) {
  const [name, setName] = React.useState(props.value?.name || '');
  const [org, setOrg] = React.useState(props.value?.org || '');
  const [tel, setTel] = React.useState(props.value?.tel || '');
  const [email, setEmail] = React.useState(props.value?.email || '');
  const NFCProxy = new NfcProxy();

  if (ref) {
    ref.current = {
      getValue: () => ({name, org, tel, email}),
    };
  }

  const writeNdef = async () => {
    if (!name || (!tel && !email)) {
      Alert.alert(
        'Invalid Input',
        'Must provide "Name" and either "Tel" or "Email"',
      );
      return;
    }

    await NFCProxy.writeNdef({
      type: 'VCARD',
      value: {name, org, tel, email},
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
        <Text style={{textAlign: 'center', flex: 0.5}}> Name</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={name}
          onChangeText={setName}
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
        <Text style={{textAlign: 'center', flex: 0.5}}> Organization</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={org}
          onChangeText={setOrg}
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
        <Text style={{textAlign: 'center', flex: 0.5}}> Number</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={tel}
          onChangeText={setTel}
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
        <Text style={{textAlign: 'center', flex: 0.5}}> Email</Text>
        <TextInput
          style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            padding: 10,
            width: '70%',
          }}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Button text="Write" textStyle={{fontSize: 20}} onPress={writeNdef} />
    </KeyboardAvoidingView>
  );
}

export default React.forwardRef(VCardWriter);
