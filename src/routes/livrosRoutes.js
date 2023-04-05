import express from "express";
import { LivroController } from "../controllers/livrosController.js";

export const livrosRouter = express.Router();

livrosRouter
  .get("/livros", LivroController.listarLivros)
  .get("/livros/busca", LivroController.listarLivroPorTitulo)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);
