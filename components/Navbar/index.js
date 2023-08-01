import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { LoginLogout } from "../LoginLogout";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const { asPath, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push("/search");
  };
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Typography sx={{color:'black'}} variant="h7">Admin - Royer </Typography>
        </NextLink>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/royer" passHref>
            <Button color={asPath.includes('royer') ? "primary" : "info"}>
              Royer
            </Button>
          </NextLink>
          <NextLink href="/onfit" passHref>
            <Button
              color={asPath.includes('onfit') ? "primary" : "info"}
            >
              Onfit
            </Button>
          </NextLink>
        </Box>

        <Box flex={1} />

        <LoginLogout />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
