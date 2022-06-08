import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProxyNFC from '../utils/ProxyNFC';
import NdefMessage from '../components/NdefMessage';

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
      console.warn('yes');
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
    </View>
  );
};

export default ReadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
