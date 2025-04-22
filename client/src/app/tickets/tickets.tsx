import { Ticket, User } from '@acme/shared-models';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import DialogComponent from 'client/src/component/Dialog';
import Loading from 'client/src/component/Loading';
import { TicketCardSkeleton } from 'client/src/component/TicketCard/Skeleton';
import baseApi from 'client/src/services/baseService';
import TicketService from 'client/src/services/ticketService';
import { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './tickets.scss';

const TicketCard = lazy(() => import('client/src/component/TicketCard'));

export interface TicketsProps {
  tickets: Ticket[];
  isLoading: boolean;
  fetchTickets: () => Promise<void>;
  users: User[];
}

export const statusOption = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Incompleted',
    value: 'incompleted',
  },
  {
    name: 'Completed',
    value: 'completed',
  },
];

export function Tickets(props: TicketsProps) {
  const { tickets, isLoading, fetchTickets, users } = props;
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const navigate = useNavigate();
  const ticketService = TicketService(baseApi);

  const handleViewDetails = (id: number) => {
    navigate(`/${id}`);
  };

  const handleCreateTicket = async () => {
    setIsDisabled(true);
    const result = await ticketService.createTicket({
      description: taskName,
    });
    setOpenCreate(false);
    setTaskName('');
    if (result.isError) {
    } else {
      await fetchTickets();
    }
    setIsDisabled(false);
  };

  const renderTicketCard = useMemo(() => {
    const mappedStatus = status === 'completed';
    return tickets
      .filter((item) =>
        ['', 'all'].includes(status) ? true : item.completed === mappedStatus
      )
      .map((item, key) => {
        const foundUser = users.find((user) => user.id === item.assigneeId) || {
          id: 0,
          name: 'Unassigned',
        };
        return (
          <Suspense fallback={<TicketCardSkeleton />}>
            <TicketCard
              handleViewDetails={() => handleViewDetails(item.id)}
              ticket={item}
              key={key}
              user={foundUser}
            />
          </Suspense>
        );
      });
  }, [tickets, status, users]);

  return (
    <>
      <Box>
        <div className='action-buttons'>
          <Button
            variant='contained'
            onClick={() => {
              setOpenCreate(true);
            }}
            color='primary'
            className='add-task-button'>
            Add Task
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setOpenFilter(true);
            }}
            color='primary'
            className='filter-button'>
            Filter
          </Button>
        </div>

        <Grid className={'ticket-card-container'} container spacing={2}>
          {isLoading ? <Loading /> : renderTicketCard}
        </Grid>
      </Box>
      <DialogComponent
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        handleSubmit={handleCreateTicket}
        title='Add Task'
        isDisabled={isDisabled}
        content={
          <TextField
            onChange={(e) => setTaskName(e.target.value)}
            id='outlined-basic'
            label='Task Name'
            variant='outlined'
            fullWidth
            className='dialog-text-field'
            autoFocus
          />
        }
      />
      <DialogComponent
        open={openFilter}
        handleClose={() => setOpenFilter(false)}
        title='Filter'
        isDisabled={isDisabled}
        isHaveRightButton={false}
        content={
          <Select
            sx={{ fontSize: 20 }}
            disabled={isDisabled}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            fullWidth>
            {statusOption?.map((option) => (
              <MenuItem
                sx={{ fontSize: 20 }}
                key={option.value}
                value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </>
  );
}

export default Tickets;
