import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CardMedia, Grid, Link } from "@mui/material";
import NextLink from "next/link";
import { LayoutAdmin } from "@/components/LayoutAdmin";

const columns = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }) => {
      return (
        <NextLink href={`/royer/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "price", headerName: "Precio" },
  { field: "categoria", headerName: "Categoria" },
  { field: "subcategoria", headerName: "Subcategoria" },
];
const ProductsRoyer = () => {
  const [products, setProducts] = useState();
  const getProducts = async () => {
    const data = await axios.get("/api/onfitproduct");
    setProducts(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);



  const rows = products && products.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    price: product.precio,
    slug: product.slug,
    categoria: product.categoria,
    subcategoria: product.subcategoria,
  }));

  return (
    <>
    <LayoutAdmin>

      <Grid container className="fadeIn" sx={{backgroundColor:'white',height:'100vh',py:5,mt:4}}>
        <Grid item xs={12} sx={{ height: '100%', width: "100%" }}>
          <DataGrid
            rows={products && rows || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            />
        </Grid>
      </Grid>
            </LayoutAdmin>
    </>
  );
};
export default ProductsRoyer;
