"use client";
import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import UserCard from "./UserCard";
import { Typography, Card, Grid, Pagination, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserData } from "@/app/redux/userSlice";

const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
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

const GET_USER_DATA_QUERY = gql`
  query GetUser($token: String!) {
    getUser(token: $token) {
      fname
      lname
      pnumber
      email
      username
      follows
      followers
      profilePhoto
    }
  }
`;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [updateDetails, SetupdateDetails] = useState(false);
  const [token, setToken] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("userToken");
    } else {
      return null;
    }
  });
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: refetchUsers,
  } = useQuery(GET_USERS_QUERY);
  const {
    loading: userDataLoading,
    error: userDataError,
    data: userData,
    refetch: refetchUserData,
  } = useQuery(GET_USER_DATA_QUERY, {
    variables: { token },
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      router.push("/sign-in");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refetchUsers();
      refetchUserData();
    }
  }, [token, updateDetails]);

  useEffect(() => {
    if (userData) {
      dispatch(setUserData(userData));
    }
  }, [userData]);

  if (usersLoading) return <Typography>Loading...</Typography>;
  if (usersError) return <Typography>Error: {usersError.message}</Typography>;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Card
          height={200}
          width={400}
          display="flex"
          alignItems="center"
          p={2}
          variant="outlined"
          sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
        >
          <UserCard
            data={usersData?.getUsers[currentPage]}
            updateDetails={updateDetails}
            SetupdateDetails={SetupdateDetails}
          />
        </Card>
        <Grid item>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={usersData.getUsers.length}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
