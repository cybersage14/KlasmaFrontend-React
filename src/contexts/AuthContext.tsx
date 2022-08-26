import { createContext, useContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';
import api from '../utils/api';
import { ERROR, MESSAGE_SIGNUP_SUCCESS, SUCCESS } from '../utils/constants';
import { ISigninData, IUser } from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';
import { setItemOfLocalStorage } from '../utils/functions';

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
  signupByEmailAct: (userdata: IUser) => Promise.resolve(),
  signupByGoogleAct: (userdata: IUser) => Promise.resolve(),
  signinByEmailAct: (signinData: ISigninData) => Promise.resolve()
});

//  Provider
function AuthProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { openAlert } = useContext(AlertMessageContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  /** Action to sign up a user by email */
  const signupByEmailAct = (userdata: IUser) => {
    openLoading()
    api.post('/auth/signup-by-email', userdata)
      .then(response => {
        let user = jwt_decode(response.data)
        setItemOfLocalStorage('accessToken', response.data)
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
        console.log('>>>>>> error of signupByEmailAct => ', error.response)
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
  const signupByGoogleAct = (userdata: IUser) => {
    api.post('/auth/signup-by-google', userdata)
      .then(response => {
        let user = jwt_decode(response.data)
        setItemOfLocalStorage('accessToken', response.data)
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
  const signinByEmailAct = (sigininData: ISigninData) => {
    api.post('/auth/signin-by-email', sigininData)
      .then(response => {
        let user = jwt_decode(response.data)
        setItemOfLocalStorage('accessToken', response.data)
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signupByEmailAct,
        signupByGoogleAct,
        signinByEmailAct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };