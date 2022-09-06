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
  first_name: string;
  last_name: string;
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
  thumbnail: string;
  medias: Array<string>;
  id_company: number;
  id_status: number;
  created_at: string;
  updated_at: string;
}

export interface ICampaignReq {
  title: string;
  description?: string;
  goal_price: number;
  thumbnail?: string;
  medias?: Array<string>;
  id_company?: number;
  faqs?: Array<IFaq>;
}
