import { autores } from "../models/Autor.js";

export class AutoresController {
  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = await autores.find();
      res.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autor = await autores.findById(id);
      if (autor !== null) {
        res.status(200).send(autor);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const autor = new autores(req.body);
      const autorSalvo = await autor.save();
      res.status(201).send(autorSalvo.toJson);
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
