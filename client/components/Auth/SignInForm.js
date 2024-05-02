"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const SIGN_IN_MUTATION = gql`
  mutation UserSignin($input: UserSignin!) {
    UserSignin(input: $input) {
      token
    }
  }
`;

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isShowpass, setIsShowpass] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const ShowPassHandler = () => {
    setIsShowpass(!isShowpass);
  };

  const [signin, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onError: (error) => console.error("Error:", error.message),
    onCompleted: async (data) => {
      console.log("Sign-in successful:", data);

      localStorage.setItem("userToken", data.UserSignin.token);
      router.push("/");
    },
  });

  const handleSignin = async (e) => {
    e.preventDefault();

    signin({
      variables: {
        input: {
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        <div className="bg-body mx-auto border-primary border rounded-md bg-opacity-1 p-8">
          <Typography
            variant="h6"
            component="h3"
            className="mb-3 text-center font-bold text-black"
          >
            Sign in to your account
          </Typography>
          <form onSubmit={handleSignin}>
            <TextField
              type="email"
              name="email"
              label="Your Email"
              fullWidth
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              type={isShowpass ? "text" : "password"}
              name="password"
              label="Your Password"
              fullWidth
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isShowpass ? (
                      <Visibility
                        onClick={ShowPassHandler}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={ShowPassHandler}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography variant="body2" color="error">
                {error.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="my-4"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <Typography variant="body2" p={2} className="text-center my-4">
            Create an account?{" "}
            <Link href="/sign-up" variant="body2">
              Sign up
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
