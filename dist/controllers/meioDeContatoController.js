"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeioDeContato_js_1 = require("../models/MeioDeContato.js");
class MeioDeContatoController {
    static async listarMeiosDeContato(req, res) {
        try {
            const listaMeioDeContatos = await MeioDeContato_js_1.meioDeContato.find({});
            res.status(200).json(listaMeioDeContatos);
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
    static async listarMeiosDeContatoPorId(req, res) {
        try {
            const id = req.params.id;
            const meioDeContatoEncontrado = await MeioDeContato_js_1.meioDeContato.findById(id);
            res.status(200).json(meioDeContatoEncontrado);
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
    static async cadastrarMeioDeContato(req, res) {
        try {
            const novoMeioDeContato = await MeioDeContato_js_1.meioDeContato.create(req.body);
            res.status(201).json({ message: 'criado com sucesso', meiodecontato: novoMeioDeContato });
        }
        catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar meio de contato: ${error}` });
        }
        ;
    }
    static async atualizarMeioDeContato(req, res) {
        try {
            const id = req.params.id;
            await MeioDeContato_js_1.meioDeContato.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Meio de contato atualizado' });
        }
        catch (error) {
            res.status(500).json({ message: `Falha na atualização do meio de contato: ${error}` });
        }
    }
    ;
    static async deletarMeioDeContato(req, res) {
        try {
            const id = req.params.id;
            await MeioDeContato_js_1.meioDeContato.findByIdAndDelete(id);
            res.status(200).json({ message: 'Meio de contato deletado' });
        }
        catch (error) {
            res.status(500).json({ message: `Falha ao deletar o meio de contato: ${error}` });
        }
    }
    ;
}
;
exports.default = MeioDeContatoController;
//# sourceMappingURL=meioDeContatoController.js.map