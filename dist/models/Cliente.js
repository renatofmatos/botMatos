"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MeioDeContato_js_1 = require("./MeioDeContato.js");
const clienteSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.Schema.ObjectId },
    nome: { type: String, required: true },
    meiodecontato: MeioDeContato_js_1.meioDeContatoSchema
}, { versionKey: false });
const cliente = mongoose_1.default.model("clientes", clienteSchema);
exports.default = cliente;
//# sourceMappingURL=Cliente.js.map