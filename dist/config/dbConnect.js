"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const urlDataBase = process.env.DATABASE_URL;
async function conectarAoBanco() {
    if (!urlDataBase) {
        console.error('String de conexão com o banco não definida!');
    }
    else {
        try {
            await mongoose_1.default.connect(urlDataBase);
            console.log('Conectado ao Banco de Dados!!');
            return mongoose_1.default.connection;
        }
        catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    }
}
;
exports.default = conectarAoBanco;
//# sourceMappingURL=dbConnect.js.map