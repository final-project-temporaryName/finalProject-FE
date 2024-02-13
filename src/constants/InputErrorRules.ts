import { ERROR_MSG } from './InputErrorMsg';

export const nicknameRules = {
  required: ERROR_MSG.emptyNickname,
  pattern: {
    value: /^(?=.*[a-zA-Z0-9가-힣 ])[a-zA-Z0-9가-힣 ]{2,10}$/,
    message: ERROR_MSG.invalidNickname,
  },
};