import { createContext, useContext, useEffect, useReducer } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../utils/api';
import {
  ACCESS_TOKEN,
  COMPANY,
  ERROR,
  INDIVIDUAL,
  MESSAGE_PASSWORD_UPDATE_SUCCESS,
  MESSAGE_PROFILE_UPDATE_SUCCESS,
  MESSAGE_SIGNUP_SUCCESS,
  MESSAGE_WALLET_ADDRESS_SAVED,
  SUCCESS,
  USER_TYPE
} from '../utils/constants';
import {
  ISignupByGoogleData,
  ISigninByEmailData,
  ISignupByEmailData,
  IUser,
  IUserProfileReq,
  IUpdatePasswordReq,
  IUpdateWalletAddressReq
} from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';
import {
  getItemOfLocalStorage,
  removeItemOfLocalStorage,
  setAuthToken,
  setItemOfLocalStorage
} from '../utils/functions';
import { TUserType } from '../utils/types';

/* --------------------------------------------------------------- */

interface IInitialState {
  currentUser: IUser | null;
  userType: TUserType | '';
}

interface IAction {
  type: string;
  payload: any;
}

interface IProps {
  children: any;
}

interface IHandlers {
  [key: string]: Function;
}

/* --------------------------------------------------------------- */

let numberOfLoad = 0;

const initialState: IInitialState = {
  currentUser: null,
  userType: ''
};

const handlers: IHandlers = {
  SET_CURRENT_USER: (state: object, action: IAction) => {
    return {
      ...state,
      currentUser: action.payload
    };
  },
  SET_USER_TYPE: (state: object, action: IAction) => {
    return {
      ...state,
      userType: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const AuthContext = createContext({
  ...initialState,
  signupByEmailAct: (signupData: ISignupByEmailData, userType: string) => Promise.resolve(),
  signupByGoogleAct: (signupData: ISignupByGoogleData, userType: string) => Promise.resolve(),
  signinByEmailAct: (signinData: ISigninByEmailData, userType: string) => Promise.resolve(),
  signoutAct: () => Promise.resolve(),
  updateUserProfileAct: (reqData: IUserProfileReq, id: number) => Promise.resolve(),
  updateUserPasswordAct: (reqData: IUpdatePasswordReq, id: number) => Promise.resolve(),
  handleAccessTokenAct: (accessToken: string) => Promise.resolve(),
  resendEmailVerificationLinkAct: (id: number) => Promise.resolve(),
  updateWalletAddressAct: (reqData: IUpdateWalletAddressReq, id: number) => Promise.resolve()
});

//  Provider
function AuthProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { openAlert } = useContext(AlertMessageContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (numberOfLoad === 0) {
      let accessToken = getItemOfLocalStorage(ACCESS_TOKEN)
      if (accessToken) {
        setAuthToken(accessToken)
        let user = jwt_decode(accessToken)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: user
        })
      }
    }
    numberOfLoad += 1
  }, [])

  /** Action to set current userdata */
  const handleAccessTokenAct = (accessToken: string) => {
    let user: IUser = jwt_decode(accessToken)
    let userType = user.id_individual ? INDIVIDUAL : COMPANY

    console.log('>>>>>>>>> user => ', user);

    setItemOfLocalStorage(USER_TYPE, userType)
    setItemOfLocalStorage(ACCESS_TOKEN, accessToken)
    setAuthToken(accessToken)

    dispatch({
      type: 'SET_CURRENT_USER',
      payload: user
    })
    dispatch({
      type: 'SET_USER_TYPE',
      payload: userType
    })
  }

  /** Action to sign up a user by email */
  const signupByEmailAct = (signupData: ISignupByEmailData, userType: string) => {
    openLoading()
    api.post('/auth/signup-by-email', { signupData, userType })
      .then(response => {
        handleAccessTokenAct(response.data)

        openAlert({
          severity: SUCCESS,
          message: MESSAGE_SIGNUP_SUCCESS
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: null
        })
        dispatch({
          type: 'SET_USER_TYPE',
          payload: ''
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to sign up by google */
  const signupByGoogleAct = (signupData: ISignupByGoogleData, userType: string) => {
    api.post('/auth/signup-by-google', { signupData, userType })
      .then(response => {
        handleAccessTokenAct(response.data)

        openAlert({
          severity: SUCCESS,
          message: MESSAGE_SIGNUP_SUCCESS
        })
        closeLoading()
      })
      .catch(error => {
        console.log('>>>>>> error of signupByGoogleAct => ', error.response)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: null
        })
        dispatch({
          type: 'SET_USER_TYPE',
          payload: ''
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to sign in by email */
  const signinByEmailAct = (signinData: ISigninByEmailData, userType: string) => {
    openLoading()
    api.post('/auth/signin-by-email', { signinData, userType })
      .then(response => {
        handleAccessTokenAct(response.data)

        openAlert({
          severity: SUCCESS,
          message: MESSAGE_SIGNUP_SUCCESS
        })
        closeLoading()
      })
      .catch(error => {
        console.log('>>>>>>> error of signinByEmail => ', error)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: null
        })
        dispatch({
          type: 'SET_USER_TYPE',
          payload: ''
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to sign out */
  const signoutAct = () => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: null
    })
    dispatch({
      type: 'SET_USER_TYPE',
      payload: ''
    })
    removeItemOfLocalStorage(ACCESS_TOKEN)
    removeItemOfLocalStorage(USER_TYPE)
    setAuthToken(null)
  }

  /** Action to update a user's profile */
  const updateUserProfileAct = (reqData: IUserProfileReq, id: number) => {
    openLoading()
    api.put(`/auth/update-user-profile/${id}`, reqData)
      .then(response => {
        handleAccessTokenAct(response.data)
        openAlert({
          severity: SUCCESS,
          message: MESSAGE_PROFILE_UPDATE_SUCCESS
        })
        closeLoading()
      })
      .catch(error => {
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to update a user's password */
  const updateUserPasswordAct = (reqData: IUpdatePasswordReq, id: number) => {
    openLoading()
    api.put(`/auth/update-user-password/${id}`, reqData)
      .then(response => {
        handleAccessTokenAct(response.data)
        openAlert({
          severity: SUCCESS,
          message: MESSAGE_PASSWORD_UPDATE_SUCCESS
        })
        closeLoading()
      })
      .catch(error => {
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to resend email verification link */
  const resendEmailVerificationLinkAct = (id: number) => {
    openLoading()
    api.get(`/auth/resend-email-verification-link/${id}`)
      .then(response => {
        openAlert({
          severity: SUCCESS,
          message: response.data
        })
        closeLoading()
      })
      .catch(error => {
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to update a user's wallet address */
  const updateWalletAddressAct = (reqData: IUpdateWalletAddressReq, id: number) => {
    openLoading()
    api.put(`/auth/update-wallet-address/${id}`, reqData)
      .then(response => {
        handleAccessTokenAct(response.data)
        openAlert({
          severity: SUCCESS,
          message: MESSAGE_WALLET_ADDRESS_SAVED
        })
        closeLoading()
      })
      .catch(error => {
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signupByEmailAct,
        signupByGoogleAct,
        signinByEmailAct,
        signoutAct,
        updateUserProfileAct,
        updateUserPasswordAct,
        handleAccessTokenAct,
        resendEmailVerificationLinkAct,
        updateWalletAddressAct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };