"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_js_1 = __importDefault(require("../models/Cliente.js"));
const MeioDeContato_js_1 = require("../models/MeioDeContato.js");
class ClienteController {
    static async listarclientes(req, res) {
        try {
            const listaClientes = await Cliente_js_1.default.find({});
            res.status(200).json(listaClientes);
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
    static async listarClientePorId(req, res) {
        try {
            const id = req.params.id;
            const clienteEncontrado = await Cliente_js_1.default.findById(id);
            res.status(200).json(clienteEncontrado);
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
    static async cadastrarCliente(req, res) {
        try {
            const novoCliente = req.body;
            const meioDecontatoEncontrado = await MeioDeContato_js_1.meioDeContato.findById(novoCliente.meiodecontato);
            console.log(`meiodecontato: ${meioDecontatoEncontrado}`);
            if (meioDecontatoEncontrado) {
                const clienteCompleto = {
                    ...novoCliente,
                    meiodecontato: meioDecontatoEncontrado.toObject(),
                };
                const clienteCriado = await Cliente_js_1.default.create(clienteCompleto);
                res.status(201).json({ message: 'criado com sucesso', cliente: clienteCriado });
            }
            else {
                res.status(500).send('Meio de contato não encontrado');
            }
        }
        catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar cliente: ${error}` });
        }
        ;
    }
    static async atualizarCliente(req, res) {
        try {
            const id = req.params.id;
            await Cliente_js_1.default.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Cliente atualizado' });
        }
        catch (error) {
            res.status(500).json({ message: `Falha na atualização do cliente: ${error}` });
        }
    }
    ;
    static async deletarCliente(req, res) {
        try {
            const id = req.params.id;
            await Cliente_js_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: 'Cliente deletado' });
        }
        catch (error) {
            res.status(500).json({ message: `Falha ao deletar o cliente: ${error}` });
        }
    }
    ;
    static async buscarClientesPorNome(req, res) {
        try {
            const nomeCliente = req.query.nomecliente;
            const listaClientes = await Cliente_js_1.default.find({ nome: nomeCliente });
            res.status(200).json(listaClientes);
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
}
;
exports.default = ClienteController;
//# sourceMappingURL=clienteController.js.map