import express from "express";
import AtendimentoController from "../controllers/atendimentoController.js";
import MensagemController from "../controllers/mensagemController.js";

const routes = express.Router();

routes.get('/atendimentos/ativos', AtendimentoController.listarAtendimentosAtivos);

export default routes;