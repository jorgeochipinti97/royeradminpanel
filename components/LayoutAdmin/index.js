import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from "next/link";

export const LayoutAdmin = ({ children, title, subTitle, icon }) => {
  const { isLoading, user } = useUser();
  const router = useRouter();
  const [url_, setUrl_] = useState();
  const [email, setEmail] = useState("");
  useEffect(() => {
    router.asPath.includes("roye") ? setUrl_("royer") : setUrl_("onfit");
  }, [router]);
  useEffect(() => {
    user && setEmail(user.email);
  }, [user]);
  return (
    <>
      <Head>
        <title>{email}</title>
      </Head>
      <Navbar />
      
      {/* // (email.toLowerCase() && email == "maurobelli22@gmail.com") ||
      // email.toLowerCase() == "felanese1996@gmail.com" ||
      // email.toLowerCase() == "sgerzovich@gmail.com" ||
      // email.toLowerCase() == "jorgeochipinti97@gmail.com" 
      
      // ? ( */}
        {/* <> */}
          <Box
            sx={{ my: 10, display: router.asPath == "/" ? "none" : "" }}
            display={"flex"}
            justifyContent={"center"}
          >
            <Button
              color={router.asPath.includes("new") ? "primary" : "info"}
              onClick={() => router.push(`/${url_}/new`)}
            >
              Crear nuevo producto
            </Button>
            <NextLink href={`/${url_}/products`} passHref>
              <Button
                color={router.asPath.includes("products") ? "primary" : "info"}
              >
                Productos
              </Button>
            </NextLink>
            <NextLink href={`/${url_}/orders`} passHref>
              <Button
                color={router.asPath.includes("orders") ? "primary" : "info"}
              >
                Ordenes{" "}
              </Button>
            </NextLink>
          </Box>
          <Box sx={{}}>{children}</Box>
{/* 
          <Box
            sx={{ height: "100vh" }}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="h3">Please Login</Typography>
          </Box> */}

    </>
  );
};
