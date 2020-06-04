
export enum CamState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FAILED = 'failed'
}

export interface Coordinates {
  lon: number;
  lat: number;
}

// export interface CamAlarm {

// }

export interface CamRecord {
  date: string;
  channel_name: string;
  amount_people: number;
  minimal_distance: number;
  average_distance: number;
  breaking_secure_distance: number;
}

export interface CamChannel {
  id: number;
  name: string;
  enabled: boolean;
  longitude: number;
  latitude: number;
  last_connection: string;
  camera_interface: string;
  image_stream: string;
  process_id: string;
  state: CamState;
  records?: CamRecord[];
  // alarms?: CamAlarm[];
  last_record?: CamRecord;
}
