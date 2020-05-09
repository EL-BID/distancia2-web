import RootStore from "./RootStore";

export default class CamStore {
  root: RootStore

  constructor(rootStore: RootStore) {
    this.root = rootStore
  }
}