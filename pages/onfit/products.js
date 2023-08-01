import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CardMedia, Grid, Link } from "@mui/material";
import NextLink from "next/link";
import { LayoutAdmin } from "@/components/LayoutAdmin";
import { CheckBox } from "@mui/icons-material";



const ProductsRoyer = () => {
  const [products, setProducts] = useState();
  const [idsToRemve, setIdsToremove]= useState([])

  const getProducts = async () => {
    const data = await axios.get("/api/onfitproduct");
    setProducts(data.data);
    console.log(data.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  
  
  
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


  const rows = products && products.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    price: product.precio,
    slug: product.slug,
    categoria: product.categoria,
    subcategoria: product.subcategoria,
  }));


const handleEliminarSeleccionados = async () => {
  try {
    // Enviar la solicitud DELETE a la API con el array de IDs de los productos seleccionados
    await axios.delete('/api/deleteproductsonfit', { data: { selectedProductIds: idsToRemve } });

    // Actualiza la lista de productos después de la eliminación exitosa
    const nuevosProductos = products.filter((producto) => !idsToRemve.includes(producto._id));
    setProducts(nuevosProductos);

    // Limpia la lista de selección después de la eliminación exitosa
    setSelectedProducts([]);
  } catch (error) {
    // Maneja errores de eliminación si es necesario
    console.error('Error al eliminar productos seleccionados:', error);
  }
};

  return (
    <>
    <LayoutAdmin>

    <Button variant='contained' color='error' sx={{mx:2}} onClick={handleEliminarSeleccionados}>Eliminar seleccionados</Button>

      <Grid container className="fadeIn" sx={{backgroundColor:'white',height:'100vh',py:5,mt:4}}>
        <Grid item xs={12} sx={{ height: '100%', width: "100%" }}>
          <DataGrid
            rows={products && rows || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onRowSelectionModelChange={itm => setIdsToremove(itm)}


            />
        </Grid>
      </Grid>
            </LayoutAdmin>
    </>
  );
};
export default ProductsRoyer;
