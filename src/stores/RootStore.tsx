import CamStore from "./CamStore";

export default class RootStore {
  cam: CamStore

  constructor() {
    this.cam = new CamStore(this)
  }

}