import { Card, CardActions, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import styles from "../index.module.css";

export const TicketCardSkeleton = () => {
  return (
    <Grid
      sx={{
        height: "200px",
        minHeight: "200px",
      }}
      size={{ xs: 4, md: 4, sm: 6 }}
    >
      <Card className={styles["card-detail"]}>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Skeleton width="40%" height={20} sx={{ mb: 2 }} animation="wave" />
          <Skeleton width="70%" height={32} sx={{ mb: 2 }} animation="wave" />
          <Skeleton width="100%" height={60} animation="wave" />
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Skeleton width={100} height={36} animation="wave" />
        </CardActions>
      </Card>
    </Grid>
  );
};
