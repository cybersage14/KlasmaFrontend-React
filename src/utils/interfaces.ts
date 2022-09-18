export interface IPropsOfSectionTitle {
  title: string;
  description?: string;
}

export interface IInvestDataItem {
  title: string;
  goal: number;
  raised: number;
  thumbnail: string;
}

export interface IPropsOfInvestCard {
  key?: number;
  dataItem: IInvestDataItem;
}

export interface ISxProps {
  sx?: any;
}

export interface IGrowData {
  title: string;
  description: string;
  image: string;
}

export interface IRentData {
  name: string;
  icon: string;
}

export interface ILearnMoreData {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface ITeammateData {
  name: string;
  position: string;
  avatar: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
}

export interface IAlertMessage {
  severity: string;
  message: string;
}

export interface ISigninByEmailData {
  email: string;
  password: string;
}

export interface ISigninByGoogleData {
  googleId: string;
}

export interface ISignupByEmailData {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  password: string;
}

export interface ISignupByGoogleData {
  firstName?: string;
  lastName?: string;
  googleId: string;
  avatar: string;
}

export interface IFile {
  path: string;
  size: string | number;
  [key: string]: any;
}

export interface IUser {
  id_individual?: number;
  id_company?: number;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  bio: string;
  date_of_birth: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address: string;
  phone: string;
  avatar: string;
  phone_verified?: number;
  id_user: number;
  email: string;
  google_id: string | null;
  email_verified: number;
  wallet_address: string;
  id_user_type: number;
}

export interface IFaq {
  id?: number;
  question: string;
  answer: string;
  id_status?: number;
}

export interface ICampaign {
  id: number;
  title: string;
  description: string;
  goal_price: number;
  raised_price: number;
  thumbnail: string;
  medias: Array<string>;
  id_company: number;
  company_name: string;
  id_status: number;
  created_at: string;
  updated_at: string;
  faqs: Array<IFaq>;
  close_at: string;
}

export interface ICampaignReq {
  title: string;
  description?: string;
  goal_price: number;
  thumbnail?: string;
  medias?: Array<string>;
  id_company?: number;
  faqs?: Array<IFaq>;
  close_at?: Date;
}

export interface IInvestment {
  id: number;
  id_user: number;
  price: number;
  transaction_id: string;
  created_at: string;
  updated_at: string;
  email: string;
}

export interface IInvestReq {
  id_user: number;
  price: number;
  fee: number;
  id_campaign: number;
  transaction_id: string;
}

export interface IPostReq {
  title: string;
  description?: string;
  thumbnail?: string;
  medias?: Array<string>;
  tags?: Array<string>;
  created_by?: number;
}

export interface IPost {
  id: number;
  title: string;
  description: string;
  tags: Array<string>;
  id_status: number;
  thumbnail: string;
  medias: Array<string>;
  created_by: number;
  created_at: string;
  updated_at: string;
  number_of_favorites: number;
}

export interface ICreatorOfPost {
  avatar: string;
  name: string;
}

export interface IFavoriteOfPost {
  id: number;
  id_post: number;
  id_user: number;
}

export interface ICommentOfPost {
  id: number;
  content: string;
  id_post: number;
  id_status: number;
  created_by: number;
  creator_name: string;
  creator_avatar: string;
  created_at: string;
  updated_at: string;
  number_of_favorites: number;
}

export interface ICommentOfUser {
  id: number;
  content: string;
  id_post: number;
  post_title: string;
  id_status: number;
  created_at: string;
  updated_at: string;
  number_of_favorites: string;
}

export interface ICommentOfCampaign {
  id: number;
  content: string;
  id_campaign: number;
  id_status: number;
  created_by: number;
  creator_name: string;
  creator_avatar: string;
  created_at: string;
  updated_at: string;
  number_of_favorites: number;
}

export interface ICommentReq {
  content: string;
  id_campaign?: number;
  id_post?: number;
  created_by?: number;
}

export interface IUserProfileReq {
  avatar: string;
  company_name?: string;
  first_name?: string;
  last_name?: string;
  bio: string;
  phone: string;
  date_of_birth: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
}

export interface IUpdatePasswordReq {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdateWalletAddressReq {
  wallet_address: string;
  id_user_type: number;
}
