import {RTD_MAP, TNF_MAP} from './Types';

export const tnfValueToName = (value: number) => {
  for (let name in TNF_MAP) {
    if (value === TNF_MAP[name]) {
      return name;
    }
  }
  return null;
};

export const rtdValueToName = (value: number[]) => {
  const newValue = value.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    '',
  );
  for (let name in RTD_MAP) {
    if (newValue === RTD_MAP[name]) {
      return name;
    }
  }
  return null;
};
