import { ethers } from 'ethers';
import { createContext, useEffect, useReducer } from 'react';

/* --------------------------------------------------------------- */

interface IInitialState {
  provider: any;
  signer: any;
}

interface IAction {
  type: string,
  payload: any
}

interface IProps {
  children: any
}

interface IHandlers {
  [key: string]: Function,
}

/* --------------------------------------------------------------- */
let numberOfLoad = 0

const initialState: IInitialState = {
  provider: null,
  signer: null
};

const handlers: IHandlers = {
  SET_PROVIDER: (state: object, action: IAction) => {
    return {
      ...state,
      provider: action.payload
    };
  },
  SET_SIGNER: (state: object, action: IAction) => {
    return {
      ...state,
      signer: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WalletContext = createContext({
  ...initialState,
  setProviderAct: (provider: any) => Promise.resolve(),
});

//  Provider
function WalletProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (numberOfLoad === 0) {
      if (typeof process.env.REACT_APP_ADMIN_WALLET_PRIVATE_KEY === 'string') {
        const signer = new ethers.Wallet(process.env.REACT_APP_ADMIN_WALLET_PRIVATE_KEY)
        console.log('>>>>>>>> signer => ', signer)

        dispatch({
          type: 'SET_SIGNER',
          payload: signer
        })
      }
    }
    numberOfLoad += 1
  }, [])

  //  Action to set provider and signer
  const setProviderAct = (provider: any) => {
    console.log('>>>>>>>> provider => ', provider)
    dispatch({
      type: 'SET_PROVIDER',
      payload: provider
    })
  }

  return (
    <WalletContext.Provider
      value={{
        ...state,
        setProviderAct
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };