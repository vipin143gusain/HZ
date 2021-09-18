import { AUTH_LOGIN, REGISTER, LOADER_ON } from '../constants/index';

const INITIAL_STATE = {
  authLogin: {},
  postRegisterBtn: '',
  responseMsg: '',
  isLoading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, authLogin: action.payload };

    case LOADER_ON:
      return { ...state, isLoading: action.payload };

    case REGISTER:
      return {
        ...state,
        postRegisterBtn: action.payload,
        responseMsg: action.payload.responseMessage,
      };

    default:
      return state;
  }
}
