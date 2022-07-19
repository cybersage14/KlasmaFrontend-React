export interface IPropsOfSectionTitle {
  title: string;
  description: string | undefined;
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
