import { ethers } from 'ethers';
import { createContext, useReducer } from 'react';

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
  setProviderAndSignerAct: (provider: any) => Promise.resolve(),
});

//  Provider
function WalletProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  Action to set provider and signer
  const setProviderAndSignerAct = (provider: any) => {
    console.log('>>>>>>>> provider => ', provider)

    if (provider) {
      /* ------------- Connect wallet -------------- */
      dispatch({
        type: 'SET_PROVIDER',
        payload: provider
      })

      if (typeof process.env.REACT_APP_ADMIN_WALLET_PRIVATE_KEY === 'string') {
        const signer = new ethers.Wallet(process.env.REACT_APP_ADMIN_WALLET_PRIVATE_KEY, provider)

        dispatch({
          type: 'SET_SIGNER',
          payload: signer
        })
      }
    } else {
      /* ----------------- Disconnect wallet ------------------ */
      dispatch({
        type: 'SET_PROVIDER',
        payload: null
      })
      dispatch({
        type: 'SET_SIGNER',
        payload: null
      })
    }
  }

  return (
    <WalletContext.Provider
      value={{
        ...state,
        setProviderAndSignerAct
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };