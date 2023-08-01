
import ProductOnfit from '@/Models/ProductOnfit';

import { db } from "@/database";

db.connectDB();

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { selectedProductIds } = req.body;

    try {

      
      await ProductOnfit.deleteMany({ _id: { $in: selectedProductIds } });

      return res.status(200).json({ message: 'Productos seleccionados eliminados exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar productos seleccionados' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
