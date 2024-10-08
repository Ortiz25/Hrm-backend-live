import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.mjs";

const router = express.Router();

router.delete("/deletewarning", async (req, res) => {
  try {
    console.log(req.body.id);
    const result = await pool.query(
      `
       DELETE FROM warnings where  id = $1
      `,
      [req.body.id]
    );

    if (result.rows) {
      res.json({
        message: "warning deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteuser", async (req, res) => {
  try {
    console.log(req.body.userId);
    const result = await pool.query(
      `
       DELETE FROM users where  id = $1
      `,
      [req.body.userId]
    );
    console.log(result.rows);

    if (result.rows) {
      res.json({
        message: "user deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
