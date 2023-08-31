import { LayoutAdmin } from "@/components/LayoutAdmin";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import NextLink from "next/link";

const columns = [
  {
    field: "id",
    headerName: "",

    renderCell: ({ row }) => {
      console.log(row);
      return (
        <Box display={"flex"} justifyContent={"center"}>
          <NextLink href={`/royer/orders/${row.id}`} passHref>
            <Button variant="contained" color="primary" sx={{ color: "white" }}>
              Ir
            </Button>
          </NextLink>
        </Box>
      );
    },
  },
  {
    field: "total",
    headerName: "Total",
    valueGetter: (params) => {
      return params.row.total;
    },
  },
  {
    field: "isPaid",
    headerName: "Estado",
    flex: 1,
    renderCell: (params) => {
      return (
        <Chip
          label={params.row.isPaid ? "Exitosa" : "Pendiente"}
          color={params.row.isPaid ? "success" : "default"}
        />
      );
    },
  },
  { field: "transactionId", headerName: "TRANSACTION ID", flex: 1 },
  {
    field: "createdAt",
    margin: 2,
    headerName: "Fecha de Creación",
    flex: 1,
    valueGetter: (params) => {
      const date = new Date(params.row.createdAt);

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState();

  const getOrders = async () => {
    const data = await axios.get("/api/ordersRoyer");

    setOrders(data.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const rows =
    orders &&
    orders.map((order) => ({
      id: order._id,
      isPaid: order.isPaid,
      total: order.total,
      transactionId: order.transactionId,
      createdAt: order.createdAt,
    }));

  return (
    <LayoutAdmin>
      <>
        <Grid
          container
          className="fadeIn"
          sx={{ backgroundColor: "white", height: "100vh", py: 5, mt: 4 }}
        >
          <Grid item xs={12} sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={(orders && rows) || []}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Grid>
        </Grid>
      </>
    </LayoutAdmin>
  );
};

export default OrdersPage;
