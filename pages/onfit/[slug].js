import { LayoutAdmin } from "@/components/LayoutAdmin";
import SaveIcon from "@mui/icons-material/Save";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

import { FileUploader } from "react-drag-drop-files";

const ProductRoyerCustom = () => {
  const fileInputRef = useRef();
  const { query, replace, reload } = useRouter();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [slug, setSlug] = useState("");
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [productosExistentes, setProductosExistentes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [producto_, setProducto_] = useState();
  const [talles, setTalles] = useState();
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [uploadData, setUploadData] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [newTagValue, setNewTagValue] = useState("");
  const [tags, setTags] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "AVIF", "WEBP"];

  const init = async (slug_) => {
    const data = await axios.get("/api/onfitproduct");
    setProductosExistentes(data.data);

    if (query.slug && query.slug.toLowerCase().includes("new")) {
      setTitulo("");
      setDescripcion("");
      setPrecio(0);
      setCategoria("");
      setSubcategoria("");
      setTalles([
        { nombre: "xs", stock: 0 },
        { nombre: "s", stock: 0 },
        { nombre: "m", stock: 0 },
        { nombre: "l", stock: 0 },
        { nombre: "xl", stock: 0 },
        { nombre: "xxl", stock: 0 },
        { nombre: "xxxl", stock: 0 },
        { nombre: "unique", stock: 0 },
        { nombre: "7.5", stock: 0 },
        { nombre: "8", stock: 0 },
        { nombre: "8.5", stock: 0 },
        { nombre: "9", stock: 0 },
        { nombre: "9.5", stock: 0 },
        { nombre: "10", stock: 0 },
        { nombre: "10.5", stock: 0 },
        { nombre: "11", stock: 0 },
        { nombre: "11.5", stock: 0 },
        { nombre: "12", stock: 0 },
        { nombre: "12.5", stock: 0 },
        { nombre: "13", stock: 0 },
        { nombre: "13.5", stock: 0 },
        { nombre: "14", stock: 0 },
        { nombre: "14.5", stock: 0 },
        { nombre: "15", stock: 0 },
      ]);
      setImagesArray([]);
    } else {
      const product_ = data.data.filter((e) => e.slug == query.slug);

      setProducto_(product_[0]);
      product_ && setTitulo(product_[0].titulo);
      product_ && setDescripcion(product_[0].descripcion);
      product_ && setPrecio(product_[0].precio);
      product_ && setCategoria(product_[0].categoria);
      product_ && setSubcategoria(product_[0].subcategoria);
      product_ && setTalles(product_[0].talles);
      product_ && setImagesArray(product_[0].images);
      product_ && setProductosRelacionados(product_[0].productosRelacionados);
      product_ && setTags(product_[0].tags);
    }
  };

  useEffect(() => {
    if (!isInitialized && query.slug) {
      setIsInitialized(true);
      init(query.slug);
    }
  }, [query.slug, isInitialized]);

  useEffect(() => {
    if (query.slug && query.slug.toLowerCase().includes("new")) {
      setTitulo("");
      setDescripcion("");
      setPrecio(0);
      setCategoria("");
      setSubcategoria("");
      setTalles([
        { nombre: "xs", stock: 0 },
        { nombre: "s", stock: 0 },
        { nombre: "m", stock: 0 },
        { nombre: "l", stock: 0 },
        { nombre: "xl", stock: 0 },
        { nombre: "xxl", stock: 0 },
        { nombre: "xxxl", stock: 0 },
        { nombre: "unique", stock: 0 },
        { nombre: "7.5", stock: 0 },
        { nombre: "8", stock: 0 },
        { nombre: "8.5", stock: 0 },
        { nombre: "9", stock: 0 },
        { nombre: "9.5", stock: 0 },
        { nombre: "10", stock: 0 },
        { nombre: "10.5", stock: 0 },
        { nombre: "11", stock: 0 },
        { nombre: "11.5", stock: 0 },
        { nombre: "12", stock: 0 },
        { nombre: "12.5", stock: 0 },
        { nombre: "13", stock: 0 },
        { nombre: "13.5", stock: 0 },
        { nombre: "14", stock: 0 },
        { nombre: "14.5", stock: 0 },
        { nombre: "15", stock: 0 },
      ]);
      setImagesArray([]);
    }
  }, [query.slug]);

  const handleAddRelacionado = (productId) => {
    const index = productosRelacionados.indexOf(productId);

    if (index >= 0) {
      // Eliminar el producto del array de productos relacionados
      const updatedRelacionados = productosRelacionados.filter(
        (id) => id !== productId
      );
      setProductosRelacionados(updatedRelacionados);
    } else {
      // Agregar el producto al array de productos relacionados
      setProductosRelacionados((prevRelacionados) => [
        ...prevRelacionados,
        productId,
      ]);
    }
  };

  const handleChange = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/duptnofi0/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImagesArray(imagesArray.concat(data.secure_url));
        setUploadData(data);
      } else {
        console.error("Error al cargar la imagen en Cloudinary");
      }
    } catch (er) {
      console.log(er);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        titulo,
        descripcion,
        precio,
        productosRelacionados,
        images: imagesArray,
        slug,
        tags,
        talles,
        categoria,
        subcategoria,
        personalization: "",
      };

      const existProduct = {
        _id: producto_._id,
        titulo,
        descripcion,
        precio,
        productosRelacionados,
        images: imagesArray,
        slug,
        tags,
        talles,
        categoria,
        subcategoria,
        personalization: "",
      };

      const response =
        query.slug == "new"
          ? await axios.post("/api/onfitproduct", newProduct)
          : await axios.put("/api/onfitproduct", existProduct);

      query.slug == "new" && replace(`/onfit/${slug}`);
      query.slug != "new" && reload();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const onNewTag = () => {
    try {
      const newTag = newTagValue.trim().toLocaleLowerCase();
      setNewTagValue("");
      const currentTags = tags;

      if (currentTags.includes(newTag)) {
        return;
      }
      currentTags.push(newTag);
      setTags(currentTags);
    } catch (err) {
      alert(err);
    }
  };

  const onDeleteTag = (tag) => {
    try {
      const updatedTags = tags.filter((t) => t !== tag);
      setTags(updatedTags);
    } catch (err) {
      alert(err);
    }
  };

  const getNewSlug = (title) => {
    try {
      const newSlug =
        title
          .trim()
          .replaceAll(" ", "_")
          .replaceAll("'", "")
          .toLocaleLowerCase() || "";
      setSlug(newSlug);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTalleChange = (index, field, value) => {
    const updatedTalles = talles.map((talle, i) =>
      i === index ? { ...talle, [field]: value } : talle
    );
    console.log(updatedTalles);
    if (field === "stock" && (isNaN(value) || parseInt(value) < 0)) {
      // Si es inválido o negativo, mostrar mensaje de error o hacer algo
      return;
    }
    setTalles(updatedTalles);
  };
  useEffect(() => {
    console.log(talles);
  }, [talles]);
  const handleEliminarFoto = (index) => {
    const nuevasImagenes = [...imagesArray];
    nuevasImagenes.splice(index, 1);
    setImagesArray(nuevasImagenes.length > 0 ? nuevasImagenes : []);
  };

  useEffect(() => {
    setProducto_({ ...producto_, images: imagesArray });
  }, [imagesArray]);

  const handleTituloChange = (title) => {
    const newTitulo = title;

    const cleanedTitulo = newTitulo.replace(/[\\/\|]/g, " ");

    setTitulo(cleanedTitulo);
  };

  const handleEditorChange = (content, editor) => {
    setDescripcion(content);
  };

  const handlePrecioChange = (event) => {
    const newPrecio = event.target.value;

    if (isNaN(newPrecio) || parseFloat(newPrecio) < 0) {
      return;
    }

    setPrecio(newPrecio);
  };

  return (
    <>
      <LayoutAdmin title={"Royer Product"} subTitle={"asd"}>
        <div
          style={{
            paddingTop: 100,
            marginLeft: 30,
            backgroundColor: "white",
            color: "black",
          }}
        >
          <h1>{titulo}</h1>

          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            maxSize={20}
          />


          <Box sx={{ display: "flex", my: 2 }}>
            {producto_ &&
              producto_.images.map((e, index) => (
                <div
                  key={e}
                  style={{
                    margin: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <img src={e} alt="" width={100} height={100} />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleEliminarFoto(index)}
                    >
                      Eliminar foto
                    </Button>
                  </div>
                </div>
              ))}
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ py: 4, mx: 2 }} display={"flex"} justifyContent={"end"}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SaveIcon />}
              >
                {query.slug === "new" ? "Crear Producto" : "Modificar Producto"}
              </Button>
            </Box>

            <Box sx={{ my: 2 }}>
              <TextField
                label="Titulo"
                variant="standard"
                type="text"
                value={titulo}
                onChange={(e) => {
                  handleTituloChange(e.target.value);

                  getNewSlug(e.target.value);
                }}
                required
              />
            </Box>
            <Box sx={{ my: 2 }}>
              <Editor
                apiKey="x16fx9mh5mms0wjwuudxzaw3l7tm8j31n9g07acsprtht35f"
                initialValue={`${descripcion && descripcion}`}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                    "fontfamily fontsize", // Agregar plugins para la fuente
                  ],
                  toolbar:
                    "undo redo | styles | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | " +
                    "fontselect fontsizeselect", // Agregar opciones para la fuente y listas
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleEditorChange}
              />
            </Box>

            <Box sx={{ my: 2 }}>
              <TextField
                label="Precio"
                type="number"
                value={precio}
                onChange={handlePrecioChange}
                required
              />
            </Box>
            <div>
              <Select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <MenuItem value={"hombres"}>hombres</MenuItem>
                <MenuItem value={"mujeres"}>mujeres</MenuItem>
                <MenuItem value={"equipamiento"}>equipamiento</MenuItem>
                <MenuItem value={"suplementos"}>suplementos</MenuItem>
                <MenuItem value={"accesorios"}>accesorios</MenuItem>
              </Select>
            </div>
            {categoria == "hombres" && (
              <div>
                <Select
                  value={subcategoria}
                  onChange={(e) => setSubcategoria(e.target.value)}
                  required
                >
                  <MenuItem value={"remera_deportiva"}>
                    remera deportiva
                  </MenuItem>
                  <MenuItem value={"remera_oversize"}>remera oversize</MenuItem>
                  <MenuItem value={"musculosa"}>musculosa</MenuItem>
                  <MenuItem value={"buzo"}>buzo</MenuItem>
                  <MenuItem value={"short"}>short</MenuItem>
                  <MenuItem value={"pantalon"}>pantalon</MenuItem>
                  <MenuItem value={"medias"}>medias</MenuItem>
                  <MenuItem value={"campera"}>campera</MenuItem>
                </Select>
              </div>
            )}
            {categoria == "mujeres" && (
              <div>
                <Select
                  value={subcategoria}
                  onChange={(e) => setSubcategoria(e.target.value)}
                  required
                >
                  <MenuItem value={"remera_deportiva"}>
                    remera deportiva
                  </MenuItem>
                  <MenuItem value={"remera_oversize"}>remera oversize</MenuItem>
                  <MenuItem value={"top"}>top</MenuItem>
                  <MenuItem value={"buzo"}>buzo</MenuItem>
                  <MenuItem value={"short"}>short</MenuItem>
                  <MenuItem value={"calza"}>calza</MenuItem>
                  <MenuItem value={"medias"}>medias</MenuItem>
                  <MenuItem value={"campera"}>campera</MenuItem>
                </Select>
              </div>
            )}
            {categoria == "equipamiento" && (
              <div>
                <Select
                  value={subcategoria}
                  onChange={(e) => setSubcategoria(e.target.value)}
                  required
                >
                  <MenuItem value={"fitness"}>fitness</MenuItem>
                  <MenuItem value={"maquinas"}>maquinas</MenuItem>
                </Select>
              </div>
            )}
            {categoria == "suplementos" && (
              <div>
                <Select
                  value={subcategoria}
                  onChange={(e) => setSubcategoria(e.target.value)}
                  required
                >
                  <MenuItem value={"proteina"}>proteina</MenuItem>
                  <MenuItem value={"creatina"}>creatina</MenuItem>
                </Select>
              </div>
            )}

            <TextField
              label="Etiquetas"
              variant="filled"
              sx={{ my: 2 }}
              helperText="Presiona [spacebar] para agregar"
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyUp={({ code }) => code === "Space" && onNewTag()}
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              {tags.map((e) => {
                return (
                  <Chip
                    key={e}
                    label={e}
                    onDelete={() => onDeleteTag(e)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>
            <Box sx={{ my: 2 }}>
              <h3>Talles y Stock:</h3>
              {talles &&
                talles.map((talle, index) => (
                  <Box
                    key={index}
                    sx={{
                      my: 3,
                      display: "flex",
                      width: "20%",
                      justifyContent: "space-around",
                    }}
                  >
                    <p>{talle.nombre} : </p>

                    <TextField
                      value={talle.stock}
                      label="stock"
                      type="number"
                      onChange={(e) =>
                        handleTalleChange(
                          index,
                          "stock",
                          parseInt(e.target.value)
                        )
                      }
                      required
                    />
                  </Box>
                ))}
            </Box>

            <h3>Agregar Productos Relacionados:</h3>
            <Grid container sx={{ my: 4 }}>
              {productosExistentes &&
                productosExistentes.map((producto) => (
                  <Grid item md={3} sx={{ my: 2 }} key={producto._id}>
                    <Card
                      sx={{
                        width: "200px",
                        borderRadius: "0px",
                      }}
                    >
                      <Typography variant="body1" textAlign={"center"}>
                        {producto.titulo}
                      </Typography>
                      <Box display={"flex"} justifyContent={"center"}>
                        <img
                          src={producto.images[0]}
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        sx={{ my: 1 }}
                      >
                        <Button
                          type="button"
                          variant="outlined"
                          color={
                            productosRelacionados.indexOf(producto._id) >= 0
                              ? "error"
                              : "secondary"
                          }
                          onClick={() => handleAddRelacionado(producto._id)}
                        >
                          {productosRelacionados.indexOf(producto._id) >= 0
                            ? "Eliminar Producto"
                            : "Agregar Producto"}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            <Box sx={{ py: 4 }} display={"flex"} justifyContent={"center"}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SaveIcon />}
              >
                {query.slug === "new" ? "Crear Producto" : "Modificar Producto"}
              </Button>
            </Box>
          </form>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default ProductRoyerCustom;
