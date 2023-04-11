import { NaoEncontrado } from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

export class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
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
      next(new NaoEncontrado("Id do livro não localizado."));
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = processaBusca(req.query);

      const livro = await livros.find(busca);

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
      const livroAtualizado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (livroAtualizado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroExcluido = await livros.findByIdAndDelete(id);
      if (livroExcluido !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };
}

function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxpaginas } = parametros;

  const busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if(minPaginas||maxpaginas) 
}
