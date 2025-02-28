import ClienteController from "../controllers/clienteController.js";
import express from "express";

const routes = express.Router();

routes.get('/clientes', ClienteController.listarclientes);
routes.get('/clientes/busca', ClienteController.buscarClientesPorNome);
routes.get('/clientes/:id', ClienteController.listarClientePorId);
routes.post('/clientes', ClienteController.cadastrarCliente);
routes.put('/clientes/:id', ClienteController.atualizarCliente);
routes.delete('/clientes/:id', ClienteController.deletarCliente);

export default routes;