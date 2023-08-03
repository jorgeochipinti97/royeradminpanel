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

  useEffect(() => {
    router.asPath.includes("roye") ? setUrl_("royer") : setUrl_("onfit");
  }, [router]);
  useEffect(() => {
    user && console.log(user);
  }, [user]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Box
        sx={{ my: 10, display: router.asPath == "/" ? "none" : "" }}
        display={"flex"}
        justifyContent={"center"}
      >
        {/* <NextLink href={`/${url_}/new`} passHref> */}
        <Button
          color={router.asPath.includes("new") ? "primary" : "info"}
          onClick={() => router.push(`/${url_}/new`)}
        >
          Crear nuevo producto
        </Button>
        {/* </NextLink> */}
        <NextLink href={`/${url_}/products`} passHref>
          <Button
            color={router.asPath.includes("products") ? "primary" : "info"}
          >
            Productos
          </Button>
        </NextLink>
        <NextLink href={`/${url_}/orders`} passHref>
          <Button color={router.asPath.includes("orders") ? "primary" : "info"}>
            Ordenes{" "}
          </Button>
        </NextLink>
      </Box>
      <Box sx={{}}>{children}</Box>
    </>
  );
};
