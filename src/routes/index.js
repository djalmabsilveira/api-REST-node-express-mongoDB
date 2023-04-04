import express from "express";
import { livrosRouter } from "./livrosRoutes.js";
import { autoresRouter } from "./autoresRoutes.js";

export const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ titulo: "Curso de node" });
  });

  app.use(express.json(), livrosRouter, autoresRouter);
};
