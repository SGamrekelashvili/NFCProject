import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProxyNFC from '../utils/ProxyNFC';
import NdefMessage from '../components/NdefMessage';
import Button from '../components/Button';

const ReadScreen = () => {
  const [Ready, setReady] = React.useState<Boolean>(false);
  const [Data, setData] = React.useState(null);

  const ProxyNfc = new ProxyNFC();

  React.useEffect(() => {
    const init = async () => {
      const data = await ProxyNfc.init();
      setReady(data);
    };
    init();
    return () => {
      CleanUp();
    };
  }, []);

  React.useEffect(() => {
    if (Ready) {
      ReadNFC();
    }
  }, [Ready]);

  const CleanUp = async () => {
    await ProxyNfc.cleanUp();
  };

  const ReadNFC = async () => {
    const data = await ProxyNfc.readTag();
    const Payload = data.ndefMessage;
    const ndef =
      Array.isArray(Payload) && Payload.length > 0 ? Payload[0] : null;
    setData(ndef);
  };

  return (
    <View style={styles.container}>
      <Text>ReadScreen</Text>
      <Text>{`${Ready}`}</Text>
      {Data ? <NdefMessage ndef={Data} /> : <Text>---</Text>}
      <Button
        text="Read NFC One More Time"
        onPress={() => {
          setData(null);
          ReadNFC();
        }}
      />
    </View>
  );
};

export default ReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
