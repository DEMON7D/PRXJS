import {IItem} from './IItem';

export interface ISearchResult {

  response: {
    listings: IItem[];
    locations: [
      {
        title: string
      }
      ];
    page: number;
    status_code: string;
    total_pages: number;
  };
}
