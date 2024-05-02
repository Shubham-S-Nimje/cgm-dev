"use client";
import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import UserCard from "./UserCard";
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

const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      fname
      lname
      pnumber
      email
      username
      follows
      followers
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/sign-in");
    }
  }, [router]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  //   console.log(data);

  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data?.getUsers?.map((user, index) => (
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
            <UserCard data={user} index={index} />
          </Card>
        ))}
        <Grid item>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={10} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
