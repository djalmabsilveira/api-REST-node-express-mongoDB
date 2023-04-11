import express from "express";
import { db } from "./config/dbConnect.js";
import { routes } from "./routes/index.js";
import { manipuladorDeErros } from "./middlewares/manipuladorDeErros.js";
import { Manipulador404 } from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco de dados realizada com sucesso!");
});

const app = express();
app.use(express.json());
routes(app);

app.use(Manipulador404);
app.use(manipuladorDeErros);

export default app;
