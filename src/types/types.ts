import { AxiosError } from "axios";

export interface IContact {
  id: string;
  name: string;
  phone: string;
}

export interface IState {
  contacts: {
    items: Array<IContact>;
    loading: boolean;
    error: AxiosError;
  };
  filter: string;
}

export interface IContactObj extends IContact {
  onHandleDeleteContact: (name: string) => void;
}
