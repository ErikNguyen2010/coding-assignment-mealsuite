import { Ticket } from "@acme/shared-models";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "./index.module.css";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = (props: TicketCardProps) => {
  const { ticket } = props;

  return (
    <Grid
      sx={{
        height: "200px",
        minHeight: "200px",
      }}
      size={{ xs: 4, md: 4, sm: 6 }}
    >
      <Card
        className={styles["card-detail"]}
        sx={{
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 1,
            }}
          >
            Task: {ticket.id}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              mb: 2,
            }}
          >
            {"Task Title"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            {ticket.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TicketCard;
