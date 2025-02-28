"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = __importDefault(require("./api/app.js"));
const dbConnect_js_1 = __importDefault(require("./config/dbConnect.js"));
const port = process.env.PORT;
async function iniciarServidor() {
    try {
        const conexao = await (0, dbConnect_js_1.default)();
        if (conexao) {
            app_js_1.default.listen(port, () => {
                console.log(`Servidor escutando na porta ${port}`);
            });
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