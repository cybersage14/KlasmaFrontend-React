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
  key: number;
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
