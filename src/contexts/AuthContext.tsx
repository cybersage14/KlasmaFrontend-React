import { createContext, useContext, useReducer } from 'react';
import api from '../utils/api';
import { IUser } from '../utils/interfaces';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  user: IUser | null;
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
  user: null,
};

const handlers: IHandlers = {
  SET_USER: (state: object, action: IAction) => {
    return {
      ...state,
      user: action.payload
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
  signinAct: () => Promise.resolve()
});

//  Provider
function AuthProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const signupByEmailAct = (userdata: IUser) => {
    openLoading()
    api.post('/auth/signup-by-email', userdata)
      .then(response => {
        console.log('>>>>>> response.data => ', response.data)
        closeLoading()
      })
      .catch(error => {
        console.log('>>>>>> error of signupByEmailAct => ', error.response)
        closeLoading()
      })
  }

  const signupByGoogleAct = (userdata: IUser) => {

  }

  const signinAct = () => {

  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signupByEmailAct,
        signupByGoogleAct,
        signinAct
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };