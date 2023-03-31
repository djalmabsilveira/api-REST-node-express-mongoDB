import mongoose from "mongoose";

mongoose.connect('mongodb+srv://djalmabsilveira:1231231234@cluster0.kyhcsc9.mongodb.net/api-REST-db');

export const db = mongoose.connection