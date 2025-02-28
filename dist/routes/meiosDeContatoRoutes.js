"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meioDeContatoController_1 = __importDefault(require("../controllers/meioDeContatoController"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/meiosdecontato', meioDeContatoController_1.default.listarMeiosDeContato);
routes.get('/meiosdecontato/:id', meioDeContatoController_1.default.listarMeiosDeContatoPorId);
routes.post('/meiosdecontato', meioDeContatoController_1.default.cadastrarMeioDeContato);
routes.put('/meiosdecontato/:id', meioDeContatoController_1.default.atualizarMeioDeContato);
routes.delete('/meiosdecontato/:id', meioDeContatoController_1.default.deletarMeioDeContato);
exports.default = routes;
//# sourceMappingURL=meiosDeContatoRoutes.js.map