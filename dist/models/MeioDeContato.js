"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meioDeContatoSchema = exports.meioDeContato = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const meioDeContatoSchema = new mongoose_1.default.Schema({
    id: { type: mongoose_1.default.Schema.ObjectId },
    tipocontato: { type: String, required: true },
    contato: { type: String, required: true }
}, { versionKey: false });
exports.meioDeContatoSchema = meioDeContatoSchema;
const meioDeContato = mongoose_1.default.model("meiodecontatos", meioDeContatoSchema);
exports.meioDeContato = meioDeContato;
//# sourceMappingURL=MeioDeContato.js.map