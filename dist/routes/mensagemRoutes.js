"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mensagemController_1 = __importDefault(require("../controllers/mensagemController"));
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.post('/mensagem', mensagemController_1.default.criarMensagem);
exports.default = routes;
//# sourceMappingURL=mensagemRoutes.js.map