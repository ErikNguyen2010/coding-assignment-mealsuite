/* eslint-disable no-unused-vars */

import {
  IAxiosInstance,
  ICreateTicketPayload,
  ITicketResponse,
  IApiResponseWrapper,
  IGetTicketDetailPayload,
  IAssignUserPayload,
} from "../lib/types/interfaces";

export default function TicketService(axiosInstance: IAxiosInstance) {
  async function createTicket(payload: ICreateTicketPayload) {
    try {
      const result = await axiosInstance.post<
        IApiResponseWrapper<ITicketResponse>
      >("/api/tickets", payload);
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function fetchTicketDetail(payload: IGetTicketDetailPayload) {
    try {
      const { id } = payload;
      const result = await axiosInstance.get<
        IApiResponseWrapper<ITicketResponse>
      >("/api/tickets/:id".replace(":id", id));
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function assignUser(payload: IAssignUserPayload) {
    try {
      const { ticketId, userId } = payload;
      const result = await axiosInstance.put<
        IApiResponseWrapper<ITicketResponse>
      >(
        "/api/tickets/:ticketId/assign/:userId"
          .replace(":ticketId", ticketId)
          .replace(":userId", userId.toString())
      );
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function unassignUser(payload: Pick<IAssignUserPayload, "ticketId">) {
    try {
      const { ticketId } = payload;
      const result = await axiosInstance.put<
        IApiResponseWrapper<ITicketResponse>
      >("/api/tickets/:ticketId/unassign".replace(":ticketId", ticketId));
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function markAsCompleted(
    payload: Pick<IAssignUserPayload, "ticketId">
  ) {
    try {
      const { ticketId } = payload;
      const result = await axiosInstance.put<
        IApiResponseWrapper<ITicketResponse>
      >("/api/tickets/:ticketId/complete".replace(":ticketId", ticketId));
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  async function markAsIncompleted(
    payload: Pick<IAssignUserPayload, "ticketId">
  ) {
    try {
      const { ticketId } = payload;
      const result = await axiosInstance.delete<
        IApiResponseWrapper<ITicketResponse>
      >("/api/tickets/:ticketId/complete".replace(":ticketId", ticketId));
      return result;
    } catch (err: any) {
      return {
        isError: true,
        errData: err.response.data,
      };
    }
  }

  return {
    createTicket,
    fetchTicketDetail,
    assignUser,
    unassignUser,
    markAsCompleted,
    markAsIncompleted,
  };
}
