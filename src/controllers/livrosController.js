import { NaoEncontrado } from "../errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";
import { RequisicaoIncorreta } from "../errors/RequisicaoIncorreta.js";

export class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if (limite > 0 && pagina > 0) {
        const listaLivros = await livros
          .find()
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();
        res.status(200).json(listaLivros);
      } else {
        next(new RequisicaoIncorreta());
      }
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livro = await livros.findById(id).populate("autor");
      res.status(200).send(livro);
    } catch (error) {
      next(new NaoEncontrado("Id do livro não localizado."));
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livro = await livros.find(busca).populate("autor");
        res.status(200).send(livro);
      } else {
        res.status(200).send([]);
      }
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

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }
  return busca;
}
