import { createContext, useReducer, useContext } from 'react';
import { ethers } from 'ethers';
import api from '../utils/api';
import {
  ADMIN_WALLET_ADDRESS,
  CONTRACT_ABI_OF_TOKEN,
  CONTRACT_ADDRESS_OF_TOKEN,
  ERROR,
  ID_OF_STATUS_CLOSED,
  MESSAGE_CAMPAIGN_CREATE_SUCCESS,
  MESSAGE_CAMPAIGN_UPDATE_SUCCESS,
  MESSAGE_COMMENT_UPDATE_SUCCESS,
  MESSAGE_INVESTED_BUT_NOT_TOKEN_RECEIVED,
  MESSAGE_INVESTED_SUCCESS,
  SUCCESS,
  TOKEN_DECIMAL,
  WARNING
} from '../utils/constants';
import {
  ICampaign,
  ICampaignReq,
  ICommentOfCampaign,
  ICommentReq,
  IInvestment,
  IInvestReq
} from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';
import { WalletContext } from './WalletContext';
import { AuthContext } from './AuthContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  campaign: ICampaign | null;
  campaigns: Array<ICampaign>;
  investmentsOfCampaign: Array<IInvestment>;
  commentsOfCampaign: Array<ICommentOfCampaign>
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
  campaign: null,
  campaigns: [],
  investmentsOfCampaign: [],
  commentsOfCampaign: []
};

const handlers: IHandlers = {
  SET_CAMPAIGN: (state: object, action: IAction) => {
    return {
      ...state,
      campaign: action.payload
    };
  },
  SET_CAMPAIGNS: (state: object, action: IAction) => {
    return {
      ...state,
      campaigns: action.payload
    };
  },
  SET_INVESTMENTS_OF_CAMPAIGN: (state: object, action: IAction) => {
    return {
      ...state,
      investmentOfCampaign: action.payload
    };
  },
  SET_COMMENTS_OF_CAMPAIGN: (state: object, action: IAction) => {
    return {
      ...state,
      commentsOfCampaign: action.payload
    }
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const CampaignContext = createContext({
  ...initialState,
  saveCampaignAct: (reqData: ICampaignReq, id?: number) => Promise.resolve(),
  getCampaignsByCompanyIdAct: (companyId: number) => Promise.resolve(),
  getCampaignByIdAct: (id: number) => Promise.resolve(),
  getAllCampaignsAct: () => Promise.resolve(),
  investAct: (investReq: IInvestReq) => Promise.resolve(),
  closeCampaignAct: (campaignId: number) => Promise.resolve(),
  saveCommentOfCampaignAct: (reqData: ICommentReq, id?: number) => Promise.resolve()
});

//  Provider
function CampaignProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openAlert } = useContext(AlertMessageContext)
  const { provider, signer } = useContext(WalletContext)
  const { currentUser } = useContext(AuthContext)
  const { openLoading, closeLoading } = useContext(LoadingContext)

  //  Create or edit campaign
  const saveCampaignAct = (reqData: ICampaignReq, id?: number) => {
    openLoading()
    if (id) {
      /* --------------- Edit campaign ----------------- */
      api.put(`/campaign/update/${id}`, reqData)
        .then(() => {
          openAlert({
            severity: SUCCESS,
            message: MESSAGE_CAMPAIGN_UPDATE_SUCCESS
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
      /* ----------------------------------------------- */
    } else {
      /* --------------- Create campaign --------------- */
      api.post('/campaign/create', reqData)
        .then(() => {
          openAlert({
            severity: SUCCESS,
            message: MESSAGE_CAMPAIGN_CREATE_SUCCESS
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
      /* ----------------------------------------------- */
    }
  }

  //  Get campaigns of a company
  const getCampaignsByCompanyIdAct = (companyId: number) => {
    openLoading()
    api.get(`/campaign/get-campaigns-by-company-id/${companyId}`)
      .then(response => {
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: response.data
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  //  Get a campaign by its id
  const getCampaignByIdAct = (id: number) => {
    openLoading()
    api.get(`/campaign/get-campaign-by-id/${id}`)
      .then(response => {
        dispatch({
          type: 'SET_CAMPAIGN',
          payload: response.data.campaign
        })
        dispatch({
          type: 'SET_INVESTMENTS_OF_CAMPAIGN',
          payload: response.data.investments
        })
        dispatch({
          type: 'SET_COMMENTS_OF_CAMPAIGN',
          payload: response.data.commentsOfCampaign
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_CAMPAIGN',
          payload: null
        })
        dispatch({
          type: 'SET_INVESTMENTS_OF_CAMPAIGN',
          payload: []
        })
        dispatch({
          type: 'SET_COMMENTS_OF_CAMPAIGN',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  //  Get all campaigns
  const getAllCampaignsAct = () => {
    openLoading()
    api.get('/campaign/get-all')
      .then(response => {
        console.log('>>> campaigns => ', response.data)
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: response.data
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_CAMPAIGNS',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  //  Invest to campaign
  const investAct = async (investReq: IInvestReq) => {
    openLoading()
    api.post('/campaign/invest', investReq)
      .then(async () => {
        try {
          const contract = new ethers.Contract(CONTRACT_ADDRESS_OF_TOKEN, CONTRACT_ABI_OF_TOKEN, signer)
          const transaction = await contract.transfer(
            currentUser?.wallet_address,
            String(investReq.price * 10 ** TOKEN_DECIMAL),
            { from: ADMIN_WALLET_ADDRESS }
          )
          await transaction.wait();
          openAlert({
            severity: SUCCESS,
            message: MESSAGE_INVESTED_SUCCESS
          })
          closeLoading()
        } catch (error) {
          console.log('>>>>>>>> error => ', error)
          openAlert({
            severity: WARNING,
            message: MESSAGE_INVESTED_BUT_NOT_TOKEN_RECEIVED
          })
          closeLoading()
        }
      })
      .catch(error => {
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })

  }

  //  Close a campaign
  const closeCampaignAct = (campaignId: number) => {
    openLoading()
    api.put(`/campaign/update-campaign-status/${campaignId}`, { id_status: ID_OF_STATUS_CLOSED })
      .then(response => {
        dispatch({
          type: 'SET_CAMPAIGN',
          payload: {
            ...state.campaign,
            id_status: ID_OF_STATUS_CLOSED
          }
        })
        closeLoading()
      })
      .catch(error => {
        console.log('>>>>>>>> error of closeCampaignAct => ', error)
        closeLoading()
      })
  }

  //  Save a comment of post
  const saveCommentOfCampaignAct = (reqData: ICommentReq, id?: number) => {
    openLoading()
    if (id) {
      //  Update a comment
      api.put(`/campaign/update-comment/${id}`, reqData)
        .then(response => {
          const indexOfUpdatedComment = state.commentsOfCampaign.findIndex(
            (commentItem: ICommentOfCampaign) => commentItem.id === id
          )

          const _commentsOfCampaign = [...state.commentsOfCampaign]
          _commentsOfCampaign.splice(indexOfUpdatedComment, 1, response.data)

          dispatch({
            type: 'SET_COMMENTS_OF_CAMPAIGN',
            payload: _commentsOfCampaign
          })
          openAlert({
            severity: SUCCESS,
            message: MESSAGE_COMMENT_UPDATE_SUCCESS
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
    } else {
      //  Create a comment
      api.post('/campaign/create-comment', reqData)
        .then(response => {
          console.log('>>>>>>> createdComment => ', response.data)
          dispatch({
            type: 'SET_COMMENTS_OF_CAMPAIGN',
            payload: [...state.commentsOfCampaign, response.data]
          })
          openAlert({
            severity: SUCCESS,
            message: MESSAGE_COMMENT_UPDATE_SUCCESS
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
  }

  return (
    <CampaignContext.Provider
      value={{
        ...state,
        saveCampaignAct,
        getCampaignsByCompanyIdAct,
        getCampaignByIdAct,
        getAllCampaignsAct,
        investAct,
        closeCampaignAct,
        saveCommentOfCampaignAct
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export { CampaignContext, CampaignProvider };