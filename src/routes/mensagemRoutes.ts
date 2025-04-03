import express from "express";
import MensagemController from "../controllers/mensagemController.js";

const routes = express.Router();

routes.get('/atendimentos/mensagens', MensagemController.buscarMensagensAtendimento);

export default routes;