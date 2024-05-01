"use client";
import { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isShowpass, setIsShowpass] = useState(false);
  const [isAlert, setIsAlert] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsAlert(null);
  };

  const ShowPassHandler = () => {
    setIsShowpass(!isShowpass);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.backendUrl}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error.message);
      setIsAlert(["error", error.message]);
    }
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
            {isAlert && (
              <Typography variant="body2" color={isAlert[0]}>
                {isAlert[1]}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="my-4"
            >
              Sign in
            </Button>
          </form>
          <Typography variant="body2" className="text-center my-4">
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
