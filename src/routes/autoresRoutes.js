import express from "express";
import { AutoresController } from "../controllers/autoresController.js";

export const autoresRouter = express.Router();

autoresRouter
  .get("/autores", AutoresController.listarAutores)
  .get("/autores/:id", AutoresController.listarAutorPorId)
  .post("/autores", AutoresController.cadastrarAutor)
  .put("/autores/:id", AutoresController.atualizarAutor)
  .delete("/autores/:id", AutoresController.excluirAutor);
