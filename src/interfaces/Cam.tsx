
export enum CamState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FAILED = 'failed'
}

export interface CamAlarm {

}

export interface Cam {
  id: number;
  name: string;
  enabled: boolean;
  last_connection: string;
  camera_interface: string;
  image_stream: string;
  process_id: string;
  state: CamState;
  alarms?: CamAlarm[];
}
