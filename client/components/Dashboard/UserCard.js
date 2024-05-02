import React from "react";
import {
  Container,
  Typography,
  List,
  Card,
  CardContent,
  Grid,
  Button,
  Pagination,
  Box,
} from "@mui/material";

const UserCard = ({ data, index }) => {
  console.log(data);
  return (
    <Card
      key={index}
      height={200}
      width={400}
      display="flex"
      alignItems="center"
      flexDirection="column"
      p={2}
      variant="outlined"
      sx={{
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5">{data?.fname}</Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {data?.username}
        </Typography>
        <Grid container justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary">
            Follow
          </Button>
          {/* <Button variant="contained" color="secondary">
            Unfollow
          </Button> */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;
