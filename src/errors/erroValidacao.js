import { RequisicaoIncorreta } from "./requisicaoIncorreta.js";

export class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const menssgemErro = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Foram encontrados os seguintes erros: ${menssgemErro}`);
  }
}
