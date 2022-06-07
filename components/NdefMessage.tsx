import React from 'react';
import {Text} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';
import {NdefMessageProps, RenderPayloadProp} from '../utils/Types';
import {rtdValueToName, tnfValueToName} from '../utils/ValuesUtils';
import {
  RtdUriPayload,
  RtdTextPayload,
  WifiSimplePayload,
  TextBasedMimePayload,
} from './Renderer';

const NdefMessage = (props: NdefMessageProps) => {
  const {ndef} = props;
  const tnfName = tnfValueToName(ndef.tnf);
  const rtdName = rtdValueToName(ndef.type);
  return (
    <>
      <Text>tnfName: {tnfName}</Text>
      <Text>rtdName: {rtdName}</Text>
      <RenderPayload ndef={ndef} rtdName={rtdName} />
    </>
  );
};

const RenderPayload = ({ndef, rtdName}: RenderPayloadProp) => {
  if (ndef.tnf === Ndef.TNF_WELL_KNOWN) {
    if (rtdName === 'URI') {
      return <RtdUriPayload ndef={ndef} />;
    } else if (rtdName === 'TEXT') {
      return <RtdTextPayload ndef={ndef} />;
    }
  } else if (ndef.ntf === Ndef.TNF_MIME_MEDIA) {
    const mimeTypeStr = String.fromCharCode(...ndef.type);
    if (mimeTypeStr === Ndef.MIME_WFA_WSC) {
      return <WifiSimplePayload ndef={ndef} />;
    } else if (mimeTypeStr.indexOf('text') === 0) {
      return <TextBasedMimePayload ndef={ndef} mimeType={mimeTypeStr} />;
    } else {
      return <Text>{mimeTypeStr}</Text>;
    }
  }
  return null;
};

export default NdefMessage;
