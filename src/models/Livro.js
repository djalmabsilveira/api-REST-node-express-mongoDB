import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O títiulo do livro é obrigatório"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O id do autor é obrigatório"],
  },
  editora: {
    type: String,
    required: [true, "O nome da editora é obrigatório"],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido",
    },
  },
  numeroPaginas: {
    type: Number,
    min: [
      10,
      "O número de páginas deve ser maior que 10. Número informado: {VALUE}",
    ],
    max: [
      5000,
      "O número de páginas deve ser menor que 5000. Número informado: {VALUE}",
    ],
  },
});

export const livros = mongoose.model("livros", livroSchema);
