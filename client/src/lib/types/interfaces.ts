export interface IAxiosInstance {
  get: <T = any>(url: string, config?: any) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
  delete: <T = any>(url: string, data?: any, config?: any) => Promise<T>;
}

export interface ICreateTicketPayload {
  description: string;
}

export interface IGetTicketDetailPayload {
  id: string;
}

export interface IAssignUserPayload {
  ticketId: string;
  userId: number;
}

export interface IApiResponseWrapper<T> {
  config: any;
  data: T;
  headers: any;
  status: number;
  statusText: string;
  isError: boolean;
}

export interface ITicketResponse {
  id: string;
  description: string;
  assigneeId: string;
  completed: boolean;
}
