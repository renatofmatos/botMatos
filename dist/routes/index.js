"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meiosDeContatoRoutes_js_1 = __importDefault(require("./meiosDeContatoRoutes.js"));
const clientesRoutes_js_1 = __importDefault(require("./clientesRoutes.js"));
const mensagemRoutes_js_1 = __importDefault(require("./mensagemRoutes.js"));
const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Matos Tecnologia');
    });
    app.use((0, express_1.json)(), clientesRoutes_js_1.default, meiosDeContatoRoutes_js_1.default, mensagemRoutes_js_1.default);
};
exports.default = routes;
//# sourceMappingURL=index.js.map