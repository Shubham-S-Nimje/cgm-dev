"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";

const Header = () => {
  const [auth] = useState(true);
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    router.push("/sign-in");
  };

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CGM Dev
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        )}
        <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
