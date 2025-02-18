"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const apikey = process.env.API_KEY;
app.use(express_1.default.json());
app.post('/api/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === apikey) {
        res.send(req.query['hub.challenge']);
    }
    else {
        console.log('Evento recebido:', req.body);
        res.sendStatus(200);
    }
});
app.listen(port, () => {
    console.log(`Servidor iniciando`);
    console.log(`Servidor rodando na porta ${port}`);
});
exports.default = app;
//# sourceMappingURL=webhook.js.map