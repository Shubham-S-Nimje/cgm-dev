import React from "react";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/app/redux/userSlice";

const FOLLOW_MUTATION = gql`
  mutation UserFollow($input: UserFollow!) {
    UserFollow(input: $input) {
      success
    }
  }
`;

const UserCard = ({ data, updateDetails, SetupdateDetails }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const [userFollow, { loading, error }] = useMutation(FOLLOW_MUTATION, {
    onError: (error) => console.error("Error:", error.message),
    onCompleted: async (data) => {
      console.log("follow successful:", data);
      // Dispatch action to update Redux store
      SetupdateDetails(!updateDetails);
      dispatch(setUserData(data.getUser));
    },
  });

  const handleFollow = async (e, email) => {
    e.preventDefault();

    userFollow({
      variables: {
        input: {
          email: email,
          token: localStorage.getItem("userToken"),
        },
      },
    });

    SetupdateDetails(!updateDetails);
  };

  // console.log(userData);

  return (
    <Card
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
        <Typography variant="body1">
          <strong>follows:</strong> {data?.follows}
        </Typography>
        <Typography variant="body1">
          <strong>followers:</strong> {data?.followers}
        </Typography>
        <Grid container justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            onClick={(e) => handleFollow(e, data?.email)}
            color="primary"
          >
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
