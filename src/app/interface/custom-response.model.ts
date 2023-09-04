import { Server } from './server.model';

export interface CustomResponse {
  timeStamp: Date;
  statusCode: number;
  status: string;
  reason: string;
  message: string;
  developperMessage: string;
  data: { servers?: Server[]; server?: Server };
}
