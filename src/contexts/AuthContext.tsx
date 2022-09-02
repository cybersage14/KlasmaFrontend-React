import { createContext, useContext, useEffect, useReducer } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../utils/api';
import { ACCESS_TOKEN, ERROR, MESSAGE_SIGNUP_SUCCESS, SUCCESS } from '../utils/constants';
import {
  ISignupByGoogleData,
  ISigninByEmailData,
  ISignupByEmailData,
  IUser
} from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';
import { getItemOfLocalStorage, removeItemOfLocalStorage, setAuthToken, setItemOfLocalStorage } from '../utils/functions';

/* --------------------------------------------------------------- */

interface IInitialState {
  currentUser: IUser | null;
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
};

const handlers: IHandlers = {
  SET_CURRENT_USER: (state: object, action: IAction) => {
    return {
      ...state,
      currentUser: action.payload
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
  signoutAct: () => Promise.resolve()
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

  /** Action to sign up a user by email */
  const signupByEmailAct = (signupData: ISignupByEmailData, userType: string) => {
    openLoading()
    api.post('/auth/signup-by-email', { signupData, userType })
      .then(response => {
        let user = jwt_decode(response.data)
        setItemOfLocalStorage(ACCESS_TOKEN, response.data)
        setAuthToken(response.data)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: user
        })
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
        let user = jwt_decode(response.data)
        setItemOfLocalStorage(ACCESS_TOKEN, response.data)
        setAuthToken(response.data)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: user
        })
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
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  /** Action to sign in by email */
  const signinByEmailAct = (signinData: ISigninByEmailData, userType: string) => {
    api.post('/auth/signin-by-email', { signinData, userType })
      .then(response => {
        let user = jwt_decode(response.data)
        setItemOfLocalStorage(ACCESS_TOKEN, response.data)
        setAuthToken(response.data)
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: user
        })
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
    removeItemOfLocalStorage(ACCESS_TOKEN)
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signupByEmailAct,
        signupByGoogleAct,
        signinByEmailAct,
        signoutAct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };