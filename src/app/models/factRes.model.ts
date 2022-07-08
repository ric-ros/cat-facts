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

interface IUser {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
}
export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public token?: string,
    public password?: string,
    public isDeleting?: boolean
  ) {}
}

export class Alert {
  constructor(data: Partial<Alert>) {
    Object.assign(this, data);
  }

  public id?: string;
  public type?: AlertType;
  public message?: string;
  public autoClose?: boolean;
  public keepAfterRouteChange?: boolean;
  public fade?: boolean;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
