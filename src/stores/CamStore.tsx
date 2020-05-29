import { observable, action, runInAction, computed } from 'mobx'
import { groupBy } from 'lodash'

import RootStore from "./RootStore";
import { CamChannel, CamRecord } from 'interfaces/Cam';
import { State, InvalidInput, Paginator } from "interfaces/Common";
import { PlotData } from 'plotly.js';

export default class CamStore {
  private rootStore: RootStore
  @observable state: State = State.INITIAL
  @observable message: string = ''
  @observable errorDetails: InvalidInput = {}
  @observable cams: CamChannel[] = []
  @observable lastDate?: string
  @observable instance?: CamChannel

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action
  listCams = async() => {
    const { client } = this.rootStore
    this.state = State.PENDING
    this.lastDate = undefined

    try {
      const response = await client.get<Paginator<CamChannel>>('/cams/')

      runInAction(() => {
        this.state = State.DONE
        this.message = ''
        this.errorDetails = {}
        this.cams = response.data.results
      })

    } catch(error) {
      console.log(error.message)
      runInAction(() => {
        this.state = State.DONE
        this.message = 'No se pudo conectar al servidor'
        this.errorDetails = {error: ['true']}
        this.cams = []
      })
    }
  }

  @action
  listRecords = async(channelId?: number) => {
    const { client } = this.rootStore
    let params = {}
    // this.state = State.PENDING
    if (this.lastDate !== undefined) {
      params['date__gt'] = this.lastDate
    }
    if (channelId !== undefined) {
      params['channel__id'] = channelId
    }

    try {
      const response = await client.get<Paginator<CamRecord>>('/records/', { params })
      const treeRecords = groupBy(response.data.results, 'channel_name')

      runInAction(() => {
        // this.state = State.DONE
        this.message = ''
        this.errorDetails = {}

        if(channelId === undefined) {
          const temp = [...this.cams]

          Object.entries(treeRecords).forEach(([channel_name, records]) => {
            const byName = (channel: CamChannel) => channel.name === channel_name;
            const indexCam = temp.findIndex(byName)
            if (indexCam < 0) {
              console.error('No se consigue el canal ' + channel_name)
              return
            }

            temp[indexCam].records = [...records, ...(temp[indexCam].records || [])]
            temp[indexCam].last_record = records[0]

            const recordsLength = temp[indexCam].records?.length || 0
            if (recordsLength > 100) {
              temp[indexCam].records?.splice(100 - recordsLength)
            }
          })
          this.cams = temp

        } else {
          if (treeRecords[this.instance?.name as string] !== undefined) {
            (this.instance as CamChannel).records = [
              ...treeRecords[this.instance?.name as string],
              ...(this.instance?.records || [])
            ]

            const recordsLength = (this.instance as CamChannel).records?.length || 0
            if (recordsLength > 100) {
              (this.instance as CamChannel).records?.splice(100 - recordsLength)
            }
          }
        }

        if(response.data.results.length > 0) {
          this.lastDate = response.data.results[0].date
        }
      })

    } catch(error) {
      console.log(error.message)
      runInAction(() => {
        // this.state = State.DONE
        this.message = 'No se pudo conectar al servidor'
        this.errorDetails = {error: ['true']}
      })
    }
  }

  @action
  getCam = async(camId: number) => {
    const { client } = this.rootStore
    this.state = State.PENDING
    this.lastDate = undefined

    try {
      const response = await client.get<CamChannel>(`/cams/${camId}/`)

      runInAction(() => {
        this.state = State.DONE
        this.message = ''
        this.errorDetails = {}
        this.instance = response.data
      })

    } catch(error) {
      console.log(error.message)
      runInAction(() => {
        this.state = State.DONE
        this.message = 'No se pudo conectar al servidor'
        this.errorDetails = {error: ['true']}
        this.instance = undefined
      })
    }
  }

  @computed
  get plotTableBreakingPercent(): Partial<PlotData>[] {
    return this.cams.map(({ name, records }) => ({
      x: records?.map(({ date }) => date),
      y: records?.map(({ amount_people, breaking_secure_distance }) => breaking_secure_distance / amount_people ),
      type: 'scatter',
      mode: 'lines',
      name: name,
      line: {
        shape: 'spline',
        smoothing: .8
      }
    }))
  }

  @computed
  get plotDetailBreakingPercent(): Partial<PlotData>[] {
    return [{
      x: (this.instance as CamChannel).records?.map(({ date }) => date),
      y: (this.instance as CamChannel).records?.map(({ amount_people, breaking_secure_distance }) => breaking_secure_distance / amount_people ),
      type: 'scatter',
      mode: 'lines',
      name: this.instance?.name,
      line: {
        shape: 'spline',
        smoothing: .8
      }
    }]
  }

  @action
  clearState = () => {
    this.errorDetails = {}
    this.message = ''
  }

  @computed
  get stateIsPending() {
    return this.state === State.PENDING
  }

  @computed
  get isErrorMessage(): boolean {
    return Object.keys(this.errorDetails).length > 0
  }
}
