import ProductRoyer from "@/Models/ProductRoyer";
import { db } from "@/database";
import { isValidObjectId } from "mongoose";

// Conexión a la base de datos
db.connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        titulo,
        descripcion,
        precio,
        productosRelacionados,
        images,
        slug,
        talles,
        categoria,
        subcategoria,
        tags,
      } = req.body;


      const nuevoProducto = new ProductRoyer({
        titulo,
        descripcion,
        precio,
        productosRelacionados,
        images,
        slug,
        talles,
        tags,
        categoria,
        subcategoria,
      });
      await nuevoProducto.save();
      res.status(201).json({ message: "Producto creado exitosamente" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ error: "Error al crear el producto" });
    }
  } else if (req.method === "GET") {
    // Obtener todos los productos
    try {
      const productos = await ProductRoyer.find();
      res.status(200).json(productos);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  } else if (req.method === "PUT") {
    try {
      const fieldsToUpdate = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        productosRelacionados: req.body.productosRelacionados,
        images: req.body.images,
        talles: req.body.talles,
        categoria: req.body.categoria,
        subcategoria: req.body.subcategoria,
        tags:req.body.tags
      };
      const product = await ProductRoyer.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        fieldsToUpdate,
        { new: true }
      );
      console.log(product)
    res.status(200).json({ message: "Producto actualizado exitosamente" });

    } catch (err) {
      console.log('error',err);
      res.status(500).json({ error: "Error al actualizar los productos" });

    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
