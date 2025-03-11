import mongoose from "mongoose";

const meioDeContatoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId },
    tipocontato: { type: String, required: true },
    contato: { type: String, required: true }
}, {versionKey: false});

const meioDeContato = mongoose.model("meiodecontatos", meioDeContatoSchema);

export { meioDeContato, meioDeContatoSchema };
