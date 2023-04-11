import { NaoEncontrado } from "../errors/NaoEncontrado.js";

export function Manipulador404(req, res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}
