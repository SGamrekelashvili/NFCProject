import {Platform, Alert} from 'react-native';
import NfcManager, {
  NfcTech,
  Ndef,
  NfcEvents,
  NfcError,
} from 'react-native-nfc-manager';

class ErrSuccess extends Error {}

// const withInfoConsoler = fn => {
//   async function wrapper() {
//     try {
//       console.log({Message: 'Ready To Scan NFC'});
//       const resp = await fn.apply(null, arguments);
//       console.log({Message: 'Complected'});
//       return resp;
//     } catch (ex) {
//       console.log({Message: 'ERROR', errorMessage: ex});
//       throw ex;
//     } finally {
//       console.log({Message: 'ERROR'});
//     }
//   }
//   return wrapper;
// };

interface error {
  ex: NfcError.UserCancel | NfcError.Timeout | Error;
}

const handleException = (ex: error) => {
  if (ex instanceof NfcError.UserCancel) {
    console.log({Message: 'User Cancel NFC'});
  } else if (ex instanceof NfcError.Timeout) {
    Alert.alert('NFC Session Timeout');
  } else {
    console.warn(ex);
    if (Platform.OS === 'ios') {
      NfcManager.invalidateSessionWithErrorIOS(`${ex}`);
    } else {
      console.log({Message: 'NFC Error', errorMessage: ex});
      Alert.alert('NFC Error', `${ex}`);
    }
  }
};

export default class NfcProxy {
  async init() {
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
  }

  async LaunchTagEvent() {
    if (await this.init()) {
      return NfcManager.getLaunchTagEvent();
    } else {
      return await this.init();
    }
  }

  async isEnabled() {
    return NfcManager.isEnabled();
  }

  async goToNfcSetting() {
    return NfcManager.goToNfcSetting();
  }

  readNdefOnce() {
    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise<void>(resolve => {
      let tagFound = null;

      NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        tagFound = tag;
        resolve(tagFound);

        if (Platform.OS === 'ios') {
          NfcManager.setAlertMessageIOS('NDEF tag found');
        }

        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, error => {
        if (error) {
          handleException(error);
        }

        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }

  async readTag() {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }
    } catch (ex) {
      // for tag reading, we don't actually need to show any error
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return tag;
  }

  async writeNdef({type, value}) {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write some NDEF',
      });

      let bytes = null;
      if (type === 'TEXT') {
        bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
      } else if (type === 'URI') {
        bytes = Ndef.encodeMessage([Ndef.uriRecord(value)]);
      } else if (type === 'WIFI_SIMPLE') {
        bytes = Ndef.encodeMessage([Ndef.wifiSimpleRecord(value)]);
      }

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;
      }
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  async customTransceiveNfcA(commands) {
    let result = false;
    const responses = [];

    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      for (const {type, payload} of commands) {
        let resp = null;
        if (type === 'command') {
          resp = await NfcManager.nfcAHandler.transceive(payload);
        } else if (type === 'delay') {
          await delay(payload);
        }
        responses.push(resp);
      }

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return [result, responses];
  }

  async eraseNfcA({format = false} = {}) {
    let result = false;

    try {
      await NfcManager.requestTechnology([NfcTech.NfcA]);

      const cmdReadCC = [0x30, 0x03];
      const [e1, ver, size, access] = await NfcManager.nfcAHandler.transceive(
        cmdReadCC,
      );

      const blocks = (size * 8) / 4;

      for (let i = 0; i < blocks; i++) {
        const blockNo = i + 0x04; // user block starts from 0x04
        const cmdWriteZero = [0xa2, blockNo, 0x0, 0x0, 0x0, 0x0];
        await NfcManager.nfcAHandler.transceive(cmdWriteZero);
      }

      if (format) {
        const cmdNdefFormat = [0xa2, 0x04, 0x03, 0x00, 0xfe, 0x00];
        await NfcManager.nfcAHandler.transceive(cmdNdefFormat);

        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('Success');
        }

        result = true;
      } else {
        result = false;
      }
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  async customTransceiveIsoDep(commands) {
    let result = false;
    const responses = [];

    try {
      await NfcManager.requestTechnology([NfcTech.IsoDep]);

      for (const {type, payload} of commands) {
        let resp = null;
        if (type === 'command') {
          resp = await NfcManager.isoDepHandler.transceive(payload);
        } else if (type === 'delay') {
          await delay(payload);
        }
        responses.push(resp);
      }

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }

      result = true;
    } catch (ex) {
      handleException(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return [result, responses];
  }

  async cleanUp() {
    await NfcManager.cancelTechnologyRequest().catch(() => 0);
  }
}

// ------------------------
//  Utils
// ------------------------
const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export {ErrSuccess};
