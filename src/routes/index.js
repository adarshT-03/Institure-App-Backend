import express from "express";
import dbInstance from "../services/database.js";
import Migration from "../scripts/migration.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();
const migration = new Migration(dbInstance);

router.get("/", async (req, res) => {
  res.status(200).json({ msg: "Successfully at home page!" });
});

console.log("After request i am here ");


router.use("/users", userRoutes);

router.use("/migrations", async (req, res) => {
  try {
    await migration.createDatabaseAndTables();
    res.status(200).json({ msg: "Migration Completed Successfully!" });
  } catch (error) {
    console.error("Migration Failed:", error);
    res.status(500).send("Migration Failed.");
  } finally {
    dbInstance.endConnection();
  }
});

export default router;