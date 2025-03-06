"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dbConnect_js_1 = __importDefault(require("./config/dbConnect.js"));
const port = process.env.PORT;
async function iniciarServidor() {
    let conexao;
    try {
        if (!conexao) {
            await (0, dbConnect_js_1.default)();
        }
        ;
        if (conexao) {
        }
        else {
            console.error('Falha ao iniciar o servidor');
        }
    }
    catch (error) {
        console.error('Erro geral na conexão: ', error);
    }
}
;
iniciarServidor();
exports.default = iniciarServidor;
//# sourceMappingURL=server.js.map