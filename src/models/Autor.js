import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatorio."],
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false,
  }
);

export const autores = mongoose.model("autores", autorSchema);
