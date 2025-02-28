import mensagem from "../controllers/mensagemController";
import express from "express";

const routes = express.Router();

routes.post('/mensagem', mensagem.criarMensagem);

export default routes;