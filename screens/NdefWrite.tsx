import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Ndef, NfcTech} from 'react-native-nfc-manager';
import RtdTextWriter from '../components/Renderer/RtdTextWriter';
import RtdUriShortcutWriter from '../components/Renderer/RtdUriShortcutWriter';
import RtdUriWriter from '../components/Renderer/RtdUriWriter';
import WifiSimpleWriter from '../components/Renderer/WifiSimpleWriter';
import VCardWriter from '../components/Renderer/VCardWriter';
import HCEWrite from '../components/Renderer/HCEWrite';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const NdefWrite = (props: HomeScreenProps) => {
  const {params} = props.route;

  const handlerRef = React.useRef();

  function getNdefType() {
    const payload = params.savedRecord?.payload;
    if (payload && payload.tech === NfcTech.Ndef) {
      if (payload.tnf === Ndef.TNF_WELL_KNOWN) {
        if (payload.rtd === Ndef.RTD_TEXT) {
          return 'TEXT';
        } else if (payload.rtd === Ndef.RTD_URI) {
          return 'URI';
        }
          else if (payload.rtd === "HCE"){
            return "HCE"
          }
      } else if (payload.tnf === Ndef.TNF_MIME_MEDIA) {
        if (payload.mimeType === Ndef.MIME_WFA_WSC) {
          return 'WIFI_SIMPLE';
        } else if (payload.mimeType === 'text/vcard') {
          return 'VCARD';
        }
        else if (payload.rtd === "HCE"){
          return "HCE"
        }
      }
    }

    return params.ndefType;
  }
  const ndefType = getNdefType();

  function getSavedValue() {
    return params.savedRecord?.payload?.value;
  }

  const RenderNdefWriter = () => {
    const value = getSavedValue();
    if (ndefType === 'TEXT') {
      return <RtdTextWriter ref={handlerRef} value={value} />;
    } else if (ndefType === 'URI') {
      const scheme = value?.scheme || params.scheme;
      if (scheme) {
        return (
          <RtdUriShortcutWriter
            ref={handlerRef}
            value={value}
            scheme={scheme}
          />
        );
      }
      return <RtdUriWriter ref={handlerRef} value={value} />;
    } else if (ndefType === 'WIFI_SIMPLE') {
      return <WifiSimpleWriter ref={handlerRef} value={value} />;
    } else if (ndefType === 'VCARD') {
      return <VCardWriter ref={handlerRef} value={value} />;
    }else if (ndefType === 'HCE'){
      return <HCEWrite ref={handlerRef} value={value} />
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <RenderNdefWriter />
    </View>
  );
};

export default NdefWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
