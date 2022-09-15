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
import { IPost, IPostReq, ICreatorOfPost, IFavoriteOfPost } from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  post: IPost | null;
  posts: Array<IPost>;
  creatorOfPost: ICreatorOfPost | null;
  favoritesOfPost: Array<IFavoriteOfPost>
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
  creatorOfPost: null,
  favoritesOfPost: []
};

const handlers: IHandlers = {
  SET_POST: (state: object, action: IAction) => {
    return {
      ...state,
      post: action.payload
    };
  },
  SET_POSTS: (state: object, action: IAction) => {
    return {
      ...state,
      posts: action.payload
    };
  },
  SET_CREATOR_OF_POST: (state: object, action: IAction) => {
    return {
      ...state,
      creatorOfPost: action.payload
    };
  },
  SET_FAVORITES_OF_POST: (state: object, action: IAction) => {
    return {
      ...state,
      favoritesOfPost: action.payload
    };
  },
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const PostContext = createContext({
  ...initialState,
  savePostAct: (reqData: IPostReq, id?: number) => Promise.resolve(),
  getPostsByUserIdAct: (userId: number) => Promise.resolve(),
  getPostByIdAct: (id: number) => Promise.resolve(),
  getAllPostsAct: () => Promise.resolve(),
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

  //  Get a user's posts
  const getPostsByUserIdAct = (userId: number) => {
    openLoading()
    api.get(`/post/get-posts-by-user-id/${userId}`)
      .then(response => {
        dispatch({
          type: 'SET_POSTS',
          payload: response.data
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_POSTS',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  //  Get a post by its id
  const getPostByIdAct = (id: number) => {
    openLoading()
    api.get(`/post/get-post-by-id/${id}`)
      .then(response => {
        dispatch({
          type: 'SET_POST',
          payload: response.data.post
        })
        dispatch({
          type: 'SET_CREATOR_OF_POST',
          payload: response.data.creatorOfPost
        })
        dispatch({
          type: 'SET_FAVORITES_OF_POST',
          payload: response.data.favoritesOfPost
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_POST',
          payload: null
        })
        dispatch({
          type: 'SET_CREATOR_OF_POST',
          payload: []
        })
        dispatch({
          type: 'SET_FAVORITES_OF_POST',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

  //  Get all posts
  const getAllPostsAct = () => {
    openLoading()
    api.get('/post/get-all')
      .then(response => {
        dispatch({
          type: 'SET_POSTS',
          payload: response.data
        })
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_POSTS',
          payload: []
        })
        openAlert({
          severity: ERROR,
          message: error.response.data
        })
        closeLoading()
      })
  }

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
        getPostsByUserIdAct,
        getPostByIdAct,
        getAllPostsAct,
        // closeCampaignAct
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };