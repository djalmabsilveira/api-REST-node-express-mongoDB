import express from "express";
import { LivroController } from "../controllers/livrosController.js";

export const livrosRouter = express.Router();

livrosRouter.get("/livros", LivroController.listarLivros);
