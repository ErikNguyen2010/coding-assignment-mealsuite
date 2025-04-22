import { Ticket, User } from '@acme/shared-models';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

interface TicketCardProps {
  ticket: Ticket;
  user: User;
  handleViewDetails: () => void;
}

const TicketCard = (props: TicketCardProps) => {
  const { ticket, user, handleViewDetails } = props;

  return (
    <Grid
      sx={{
        height: '250px',
        minHeight: '250px',
      }}
      size={{ xs: 4, md: 4, sm: 6 }}>
      <Card
        onClick={handleViewDetails}
        className={styles['card-detail']}
        sx={{
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        }}>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}>
            <Typography
              gutterBottom
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                textTransform: 'uppercase',
              }}>
              Ticket ID: {ticket.id}
            </Typography>

            <Chip
              className={ticket.completed ? styles['successChip'] : undefined}
              color={ticket.completed ? 'success' : 'default'}
              label={ticket.completed ? 'COMPLETED' : 'INCOMPLETED'}
            />
          </Box>

          <Box sx={{ width: '100%', height: '120px' }}>
            <Typography
              variant='h5'
              component='div'
              sx={{
                fontWeight: 600,
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.5',
                wordBreak: 'break-word',
              }}>
              {ticket.description}
            </Typography>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='Remy Sharp'
              src={`../assets/images/${user.name.toLowerCase()}.png`}
            />
            <Typography sx={{ ml: 2 }} variant='h6' component='div'>
              {user.name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TicketCard;
