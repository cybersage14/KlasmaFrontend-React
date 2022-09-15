import { createContext, useReducer, useContext } from 'react';
import api from '../utils/api';
import {
  ERROR,
  ID_OF_STATUS_CLOSED,
  MESSAGE_CAMPAIGN_CREATE_SUCCESS,
  MESSAGE_CAMPAIGN_UPDATE_SUCCESS,
  MESSAGE_INVESTED_SUCCESS,
  SUCCESS
} from '../utils/constants';
import { IPost, IPostReq, IInvestment, IInvestReq, ICreatorOfPost } from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  post: IPost | null;
  posts: Array<IPost>;
  creatorOfPost: ICreatorOfPost | null;
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
  post: null,
  posts: [],
  creatorOfPost: null
};

const handlers: IHandlers = {
  SET_POST: (state: object, action: IAction) => {
    return {
      ...state,
      campaign: action.payload
    };
  },
  SET_POSTS: (state: object, action: IAction) => {
    return {
      ...state,
      campaigns: action.payload
    };
  },
  SET_CREATOR_OF_POST: (state: object, action: IAction) => {
    return {
      ...state,
      investmentOfCampaign: action.payload
    };
  },
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const PostContext = createContext({
  ...initialState,
  savePostAct: (reqData: IPostReq, id?: number) => Promise.resolve(),
  // getCampaignsByCompanyIdAct: (companyId: number) => Promise.resolve(),
  // getCampaignByIdAct: (id: number) => Promise.resolve(),
  // getAllCampaignsAct: () => Promise.resolve(),
  // closeCampaignAct: (campaignId: number) => Promise.resolve()
});

//  Provider
function PostProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openAlert } = useContext(AlertMessageContext)
  const { openLoading, closeLoading } = useContext(LoadingContext)

  //  Create or edit campaign
  const savePostAct = (reqData: IPostReq, id?: number) => {
    openLoading()
    if (id) {
      /* --------------- Edit campaign ----------------- */
      api.put(`/post/update/${id}`, reqData)
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
      api.post('/post/create', reqData)
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

  // //  Get campaigns of a company
  // const getCampaignsByCompanyIdAct = (companyId: number) => {
  //   openLoading()
  //   api.get(`/campaign/get-campaigns-by-company-id/${companyId}`)
  //     .then(response => {
  //       dispatch({
  //         type: 'SET_POSTS',
  //         payload: response.data
  //       })
  //       closeLoading()
  //     })
  //     .catch(error => {
  //       dispatch({
  //         type: 'SET_POSTS',
  //         payload: []
  //       })
  //       openAlert({
  //         severity: ERROR,
  //         message: error.response.data
  //       })
  //       closeLoading()
  //     })
  // }

  // //  Get a campaign by its id
  // const getCampaignByIdAct = (id: number) => {
  //   openLoading()
  //   api.get(`/campaign/get-campaign-by-id/${id}`)
  //     .then(response => {
  //       dispatch({
  //         type: 'SET_POST',
  //         payload: response.data.campaign
  //       })
  //       dispatch({
  //         type: 'SET_CREATOR_OF_POST',
  //         payload: response.data.investments
  //       })
  //       closeLoading()
  //     })
  //     .catch(error => {
  //       dispatch({
  //         type: 'SET_POST',
  //         payload: null
  //       })
  //       dispatch({
  //         type: 'SET_CREATOR_OF_POST',
  //         payload: []
  //       })
  //       openAlert({
  //         severity: ERROR,
  //         message: error.response.data
  //       })
  //       closeLoading()
  //     })
  // }

  // //  Get all campaigns
  // const getAllCampaignsAct = () => {
  //   openLoading()
  //   api.get('/campaign/get-all')
  //     .then(response => {
  //       console.log('>>> campaigns => ', response.data)
  //       dispatch({
  //         type: 'SET_POSTS',
  //         payload: response.data
  //       })
  //       closeLoading()
  //     })
  //     .catch(error => {
  //       dispatch({
  //         type: 'SET_POSTS',
  //         payload: []
  //       })
  //       openAlert({
  //         severity: ERROR,
  //         message: error.response.data
  //       })
  //       closeLoading()
  //     })
  // }

  // //  Close a campaign
  // const closeCampaignAct = (campaignId: number) => {
  //   openLoading()
  //   api.put(`/campaign/update-campaign-status/${campaignId}`, { id_status: ID_OF_STATUS_CLOSED })
  //     .then(response => {
  //       dispatch({
  //         type: 'SET_POST',
  //         payload: {
  //           ...state.campaign,
  //           id_status: ID_OF_STATUS_CLOSED
  //         }
  //       })
  //       closeLoading()
  //     })
  //     .catch(error => {
  //       console.log('>>>>>>>> error of closeCampaignAct => ', error)
  //       closeLoading()
  //     })
  // }

  return (
    <PostContext.Provider
      value={{
        ...state,
        savePostAct,
        // getCampaignsByCompanyIdAct,
        // getCampaignByIdAct,
        // getAllCampaignsAct,
        // closeCampaignAct
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };