import { ErroBase } from "./ErroBase.js";

export class NaoEncontrado extends ErroBase {
  constructor(mensagem = "Página não encontrada!") {
    super(mensagem, 404);
  }
}
