import { Status } from "../enum/status.enum";

export interface Server {
  id: number;
  ipAddress: string;
  name: string;
  memmory: string;
  type: string;
  imageUrl: string;
  status: Status;
}
