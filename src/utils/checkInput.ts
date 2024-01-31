import { voidEtc, voidUrl } from '@/constants/InputErrorMsg';
import { SetStateAction } from 'react';

export const validateEtc = (type: string, value: string) => {
  let errMsg = '';
  if (type === 'imgUrl' && value === '') {
    errMsg = voidUrl;
    return errMsg;
  } else if (type === 'etc' && value === '') {
    errMsg = voidEtc;
    return errMsg;
  }
  return errMsg;
};

export const validateSignInput = (
  type: string,
  value: string,
  setErrorMessage: (value: SetStateAction<string>) => void,
) => {
  const errorMsg = validateEtc(type, value);
  if (errorMsg) {
    setErrorMessage(errorMsg);
  }
};
