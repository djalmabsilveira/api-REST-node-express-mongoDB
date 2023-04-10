import mongoose from "mongoose";
import { ErroBase } from "../errors/erroBase.js";
import { RequisicaoIncorreta } from "../errors/requisicaoIncorreta.js";
import { ErroValidacao } from "../errors/erroValidacao.js";

// eslint-disable-next-line no-unused-vars
export function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}
