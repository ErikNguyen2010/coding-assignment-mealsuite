import { User } from "@acme/shared-models";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Loading from "client/src/component/Loading";
import {
  IApiResponseWrapper,
  ITicketResponse,
} from "client/src/lib/types/interfaces";
import baseApi from "client/src/services/baseService";
import TicketService from "client/src/services/ticketService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ticketDetail.scss";

interface TicketDetailProps {
  users: User[];
  fetchTickets: () => void;
}

export const statusOption = [
  {
    name: "Incompleted",
    value: "incompleted",
  },
  {
    name: "Completed",
    value: "completed",
  },
];

export const TicketDetail = (props: TicketDetailProps) => {
  const { users, fetchTickets } = props;
  const [assigneeId, setAssigneeId] = useState<number | undefined>(0);
  const [status, setStatus] = useState<string>("");
  const [ticketDetail, setTicketDetail] = useState<ITicketResponse>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const ticketService = TicketService(baseApi);

  const asigneeOption = users.map((item) => ({
    name: item.name,
    value: item.id,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    setIsDisabled(true);
    e.preventDefault();
    if (!id || assigneeId === undefined) return;

    const payload = {
      ticketId: id,
      userId: assigneeId,
    };

    if (status === "completed") {
      await ticketService.markAsCompleted({ ticketId: payload.ticketId });
    } else {
      await ticketService.markAsIncompleted({ ticketId: payload.ticketId });
    }

    if (!assigneeId) {
      await ticketService.unassignUser({ ticketId: payload.ticketId });
    } else {
      await ticketService.assignUser(payload);
    }
    setIsDisabled(false);
    fetchTickets();

    navigate(`/`);
  };

  useEffect(() => {
    (async () => {
      const res = await ticketService.fetchTicketDetail({ id: id as string });
      if (!res.isError) {
        const result = (res as IApiResponseWrapper<ITicketResponse>).data;
        const foundUser = users.find((item) => +item.id === +result.assigneeId);
        if (foundUser) {
          setAssigneeId(foundUser.id);
          setIsLoading(false);
        }
        setStatus(result.completed ? "completed" : "incompleted");
        setTicketDetail(result);
      }
    })();
  }, [id, users]);

  if (isLoading) {
    return <Loading style={{ paddingTop: "200px" }} />;
  }

  return (
    <Grid
      className="ticket-detail-container"
      container
      direction="column"
      spacing={2}
    >
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <Typography variant="h6">Ticket ID: {ticketDetail?.id}</Typography>
        </div>
        <div className="field-group">
          <Typography variant="h6" className="task-label">
            Task Name:
          </Typography>
          <div className="task-value-container">
            <Typography className="task-name">
              {ticketDetail?.description}
            </Typography>
          </div>
        </div>
        <div className="field-group">
          <Typography variant="h6">Assignee</Typography>
          <Select
            sx={{ fontSize: 20 }}
            disabled={isDisabled}
            value={assigneeId}
            onChange={(e) => setAssigneeId(+e.target.value)}
          >
            {asigneeOption?.map((option) => (
              <MenuItem
                sx={{ fontSize: 20 }}
                key={option.value}
                value={option.value}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="field-group">
          <Typography variant="h6">Status</Typography>
          <Select
            sx={{ fontSize: 20 }}
            disabled={isDisabled}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            {statusOption?.map((option) => (
              <MenuItem
                sx={{ fontSize: 20 }}
                key={option.value}
                value={option.value}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="button-group">
          <Button
            disabled={isDisabled}
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button disabled={isDisabled} type="submit" variant="contained">
            {isDisabled ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Grid>
  );
};
