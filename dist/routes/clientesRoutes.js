"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clienteController_js_1 = __importDefault(require("../controllers/clienteController.js"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/clientes', clienteController_js_1.default.listarclientes);
routes.get('/clientes/busca', clienteController_js_1.default.buscarClientesPorNome);
routes.get('/clientes/:id', clienteController_js_1.default.listarClientePorId);
routes.post('/clientes', clienteController_js_1.default.cadastrarCliente);
routes.put('/clientes/:id', clienteController_js_1.default.atualizarCliente);
routes.delete('/clientes/:id', clienteController_js_1.default.deletarCliente);
exports.default = routes;
//# sourceMappingURL=clientesRoutes.js.map