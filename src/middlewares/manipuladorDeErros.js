import mongoose from "mongoose";
import { ErroBase } from "../errors/erroBase.js";

// eslint-disable-next-line no-unused-vars
export function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const menssgemErro = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    res.status(400).send({
      message: `Foram encontrados os seguintes erros: ${menssgemErro}`,
    });
  } else {
    new ErroBase().enviarResposta(res);
  }
}
