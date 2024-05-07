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
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Header = () => {
  const [auth] = useState(true);
  const userData = useSelector((state) => state?.userData?.getUser);
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    router.push("/sign-in");
  };

  // console.log(userData);

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CGM Dev
        </Typography>
        {userData && (
          <>
            <MenuItem>Following ({userData?.follows})</MenuItem>
            <MenuItem>Followers ({userData?.followers})</MenuItem>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <Avatar
                    alt={userData?.fname}
                    src={
                      userData?.profilePhoto
                        ? `data:image/png;base64,${userData?.profilePhoto}`
                        : "/broken-image.jpg"
                    }
                  />

                  <Typography m={1} sx={{ flexGrow: 1 }}>
                    Hello, {userData?.fname}
                  </Typography>
                </IconButton>
              </div>
            )}
            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
