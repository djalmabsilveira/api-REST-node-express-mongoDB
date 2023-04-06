import { livros } from "../models/Livro.js";

export class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      throw new Error();
      const listaLivros = await livros.find().populate("autor");
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id).populate("autor", "nome");
      res.status(200).send(livro);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorTitulo = async (req, res, next) => {
    try {
      const titulo = req.query.titulo;
      const livro = await livros.find({ titulo: titulo });
      res.status(200).send(livro);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      const livroSalvo = await livro.save();
      res.status(201).send(livroSalvo.toJson);
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
