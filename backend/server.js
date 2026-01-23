import express from "express";
import { initDB } from "./database/initDB.js";
import routes from "./api/routes/routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

const startServer = async () => {
  try {
    await initDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ [Server]: running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);

  }
};

startServer();
