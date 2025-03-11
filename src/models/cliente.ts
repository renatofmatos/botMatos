import mongoose from "mongoose";
import { meioDeContatoSchema } from "./meioDeContato.js";

const clienteSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    nome: { type: String, required: true },
    meiodecontato: meioDeContatoSchema
}, {versionKey: false});

const cliente = mongoose.model("clientes", clienteSchema);

export default cliente;
