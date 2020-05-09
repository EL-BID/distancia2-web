import axios, { AxiosInstance } from 'axios';

import CamStore from "./CamStore";

export default class RootStore {
  client: AxiosInstance
  cam: CamStore

  constructor() {
    this.cam = new CamStore(this)

    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 1000,
    });
  }
}
