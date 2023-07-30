import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

//calling database to setup a connection
connectDB();

//ESmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//using middleware
app.use(morgan("tiny"));

app.use(cors());
//using express.json() to send and retrieve json data

app.use(express.json());

app.use(express.static(path.join(__dirname, "./client/build")));
//
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// console.log(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
