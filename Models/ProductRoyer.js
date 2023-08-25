import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    images: [{ type: String, required: true }],
    personalizacion: { type: String },
    slug: { type: String, unique: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String },
    productosRelacionados: [{ type: String }],
    talles: [
      {
        nombre: { type: String, required: true },
        stock: { type: Number, required: true, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const ProductRoyer =
  mongoose.models.ProductRoyer || mongoose.model("ProductRoyer", ProductSchema);

export default ProductRoyer;
