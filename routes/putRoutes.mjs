import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { pool } from "../db/db.mjs";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.put("/updateuser", async (req, res) => {
  try {
    let query = "";
    let values = [];
    let updated = "";

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      query = `UPDATE users SET  password_hash = $1 WHERE id = $2`;
      values = [hashedPassword, req.body.userId];
      updated = "password";
    }
    if (req.body.email) {
      query = `UPDATE users SET email = $1, role =$2 WHERE id = $3`;
      values = [req.body.email, req.body.role, req.body.userId];
      updated = "user";
    }

    const result = await pool.query(query, values);

    if (updated === "user") {
      console.log(updated);
      return res.json({
        message: "user update succesful",
      });
    }
    if (updated === "password") {
      console.log(updated);
      return res.json({
        message: "password update succesful",
      });
    }

    res.json({
      message: "user update failed",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
