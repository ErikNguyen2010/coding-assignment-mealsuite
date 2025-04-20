import { Ticket } from "@acme/shared-models";
import Grid from "@mui/material/Grid";
import styles from "./tickets.module.css";
import { lazy, Suspense, useState } from "react";
import { TicketCardSkeleton } from "client/src/component/TicketCard/Skeleton";
import Loading from "client/src/component/Loading";
import { Box, Button, TextField } from "@mui/material";
import DialogComponent from "client/src/component/Dialog";

const TicketCard = lazy(() => import("client/src/component/TicketCard"));

export interface TicketsProps {
  tickets: Ticket[];
  isLoading: boolean;
}

export function Tickets(props: TicketsProps) {
  const { tickets, isLoading } = props;
  const [open, setOpen] = useState(false);

  const handleRenderTicketCard = () => {
    return tickets.map((item, key) => (
      <Suspense fallback={<TicketCardSkeleton />}>
        <TicketCard ticket={item} key={key} />
      </Suspense>
    ));
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
        color="primary"
      >
        Add Task
      </Button>
      <Grid className={styles["ticket-card-container"]} container spacing={2}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Loading />
          </Box>
        ) : (
          handleRenderTicketCard()
        )}
      </Grid>
      <DialogComponent
        open={open}
        handleClose={() => setOpen(false)}
        title="Add Task"
        content={
          <TextField
            id="outlined-basic"
            label="Task Name"
            variant="outlined"
            fullWidth
          />
        }
      />
    </Box>
  );
}

export default Tickets;
