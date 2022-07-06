export interface FactRes {
  status: {
    verified: boolean;
    sentCount: number;
  };
  _id: string;
  user: string;
  text: string;
  __v: number;
  source: string;
  updatedAt: Date;
  type: string;
  createdAt: Date;
  deleted: boolean;
  used: boolean;
  img?: string;
}

export interface CatRes {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
}
