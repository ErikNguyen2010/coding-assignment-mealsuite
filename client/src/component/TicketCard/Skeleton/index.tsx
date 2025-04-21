import { Box, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import styles from "../index.module.css";

export const TicketCardSkeleton = () => {
  return (
    <Grid
      sx={{
        height: "250px",
        minHeight: "250px",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Skeleton width="120px" height={20} animation="wave" />
            <Skeleton width="100px" height={32} animation="wave" />
          </Box>

          <Box sx={{ width: "100%", height: "120px" }}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: "90px",
                borderRadius: 1,
                mb: 2,
              }}
              animation="wave"
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              animation="wave"
            />
            <Skeleton
              width="120px"
              height={32}
              sx={{ ml: 2 }}
              animation="wave"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
