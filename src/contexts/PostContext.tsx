import { createContext, useReducer, useContext } from 'react';
import api from '../utils/api';
import {
  ERROR,
  MESSAGE_CAMPAIGN_CREATE_SUCCESS,
  MESSAGE_CAMPAIGN_UPDATE_SUCCESS,
  MESSAGE_CANT_SET_FAVORITE,
  MESSAGE_COMMENT_CREATE_SUCCESS,
  MESSAGE_COMMENT_UPDATE_SUCCESS,
  SUCCESS,
  WARNING
} from '../utils/constants';
import {
  IPost,
  IPostReq,
  ICreatorOfPost,
  IFavoriteOfPost,
  ICommentOfPost,
  ICommentOfUser,
  ICommentReq
} from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  post: IPost | null;
  posts: Array<IPost>;
  creatorOfPost: ICreatorOfPost | null;
  favoritesOfPost: Array<IFavoriteOfPost>;
  commentsOfPost: Array<ICommentOfPost>;
  commentsOfUser: Array<ICommentOfUser>;
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
  favoritesOfPost: [],
  commentsOfPost: [],
  commentsOfUser: []
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
  SET_COMMENTS_OF_POST: (state: object, action: IAction) => {
    return {
      ...state,
      commentsOfPost: action.payload
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
  handleFavoriteOfPostAct: (id_user: number, id_post: number) => Promise.resolve(),
  saveCommentAct: (reqData: ICommentReq, id?: number) => Promise.resolve()
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
        dispatch({
          type: 'SET_COMMENTS_OF_POST',
          payload: response.data.commentsOfPost
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
        dispatch({
          type: 'SET_COMMENTS_OF_POST',
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

  //  Set or remove favorite of post
  const handleFavoriteOfPostAct = (id_user: number, id_post: number) => {
    openLoading()
    api.post(`/post/handle-post-favorite`, { id_user, id_post })
      .then(response => {
        dispatch({
          type: 'SET_FAVORITES_OF_POST',
          payload: response.data
        })
        closeLoading()
      })
      .catch(error => {

        dispatch({
          type: 'SET_FAVORITES_OF_POST',
          payload: []
        })
        if (error.response.status === 403) {
          openAlert({
            severity: WARNING,
            message: MESSAGE_CANT_SET_FAVORITE
          })
        } else {
          openAlert({
            severity: ERROR,
            message: error.response.data
          })
        }
        closeLoading()
      })
  }

  //  Save a comment
  const saveCommentAct = (reqData: ICommentReq, id?: number) => {
    openLoading()
    if (id) {
      //  Update a comment
      api.put(`/post/update-comment/${id}`, reqData)
        .then(response => {
          const indexOfUpdatedComment = state.commentsOfPost.findIndex(
            (commentItem: ICommentOfPost) => commentItem.id === id
          )

          const _commentsOfPost = [...state.commentsOfPost]
          _commentsOfPost.splice(indexOfUpdatedComment, 1, response.data)

          dispatch({
            type: 'SET_COMMENTS_OF_POST',
            payload: _commentsOfPost
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
      api.post('/post/create-comment', reqData)
        .then(response => {
          console.log('>>>>>>> createdComment => ', response.data)
          dispatch({
            type: 'SET_COMMENTS_OF_POST',
            payload: [...state.commentsOfPost, response.data]
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
        handleFavoriteOfPostAct,
        saveCommentAct
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };