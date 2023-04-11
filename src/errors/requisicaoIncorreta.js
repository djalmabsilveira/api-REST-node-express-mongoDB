import { ErroBase } from "./ErroBase.js";

export class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}
