import * as React from 'react';
import {View, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {Menu} from 'react-native-paper';
import NfcProxy from '../../utils/ProxyNFC';
import Button from '../Button';

function RtdUriWriter(props, ref) {
  const [value, setValue] = React.useState(props.value?.value || '');
  const [prefix, setPrefix] = React.useState(props.value?.prefix || 'https://');
  const [showMenu, setShowMenu] = React.useState(false);
  const inputRef = React.useRef();
  const NFCProxy = new NfcProxy();

  if (ref) {
    ref.current = {
      getValue: () => ({value, prefix}),
    };
  }

  const writeNdef = async () => {
    inputRef.current && inputRef.current.blur();

    if (!value) {
      return;
    }

    let url = value;
    if (prefix !== '---') {
      url = prefix + value;
    }

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
          flex: 0.3,
          alignItems: 'center',
        }}>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={<Button text={prefix} onPress={() => setShowMenu(true)} />}>
          {['https://', 'http://', '---'].map(type => (
            <Menu.Item
              key={type}
              onPress={() => {
                setPrefix(type);
                setShowMenu(false);
              }}
              title={type}
            />
          ))}
        </Menu>
        <View style={{flex: 1}} />
      </View>
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

export default React.forwardRef(RtdUriWriter);
