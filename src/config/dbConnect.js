import mongoose from "mongoose";

mongoose.connect(process.env.STRING_CONEXAO_DB);

export const db = mongoose.connection;
