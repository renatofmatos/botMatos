import express from "express";
import WebhookController from "../controllers/webhookController.js";

const routes = express.Router();

routes.get('/webhook', WebhookController.validarToken);
routes.post('/webhook', WebhookController.mensagemRecebida);

export default routes;