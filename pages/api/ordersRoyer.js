import OrderRoyer from "@/Models/OrderRoyer";
import { db } from "@/database";


export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    case "GET":
      return getOrders(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const createOrder = async (req, res) => {
  await db.connectDB();
  try {
    const newOrder = new OrderRoyer({ ...req.body, isPaid: false });
    newOrder.total = Math.round(newOrder.total * 100) / 100;
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message || "Revise logs del servidor",
    });
  }
};

const getOrders = async (req, res) => {
  await db.connectDB();
  const orders = await OrderRoyer.find().sort({ createdAt: "desc" }).lean();
  return res.status(200).json(orders);
};


