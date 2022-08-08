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
