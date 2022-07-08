export interface FactRes {
  id?: number;
  fact: string;
  length: number;
  img?: string;
}
export interface FactsRes {
  current_page: number;
  data: FactRes[];
  first_page_url: string;
  from: number;
  last_page: string;
  last_page_url: string;
  links: [
    {
      url?: string;
      label: string;
      active: boolean;
    }
  ];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

export interface CatRes {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
}
