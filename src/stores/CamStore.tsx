import { observable, action, runInAction, computed } from 'mobx'

import RootStore from "./RootStore";
import { Cam } from 'interfaces/Cam';
import { State, InvalidInput } from "interfaces/Common";

export default class CamStore {
  private rootStore: RootStore
  @observable state: State = State.INITIAL
  @observable message: string = ''
  @observable errorDetails: InvalidInput = {}
  @observable cams: Cam[] = []
  @observable instance?: Cam

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action
  listCams = async() => {
    const { client } = this.rootStore
    this.state = State.PENDING

    try {
      const response = await client.get<Cam[]>('/cams/')

      runInAction(() => {
        this.state = State.DONE
        this.message = ''
        this.errorDetails = {}
        this.cams = response.data
      })

    } catch(error) {
      console.log(error)
      // const firstError: ErrorDetail = error.graphQLErrors[0]
      runInAction(() => {
        this.state = State.DONE
        // this.message = firstError.message
        // this.errorDetails = firstError.extensions?.invalidArgs || {}
        this.cams = []
      })
    }
  }

  @computed
  get stateIsPending() {
    return this.state === State.PENDING
  }
}
