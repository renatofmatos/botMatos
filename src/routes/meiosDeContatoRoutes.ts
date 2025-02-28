import MeioDeContatoController from "../controllers/meioDeContatoController";
import express from "express";

const routes = express.Router();

routes.get('/meiosdecontato', MeioDeContatoController.listarMeiosDeContato);
routes.get('/meiosdecontato/:id', MeioDeContatoController.listarMeiosDeContatoPorId);
routes.post('/meiosdecontato', MeioDeContatoController.cadastrarMeioDeContato);
routes.put('/meiosdecontato/:id', MeioDeContatoController.atualizarMeioDeContato);
routes.delete('/meiosdecontato/:id', MeioDeContatoController.deletarMeioDeContato);

export default routes;