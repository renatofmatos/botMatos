import cliente from "../models/cliente.js";
import { Request, Response } from "express";
import { meioDeContato } from "../models/meioDeContato.js";

class ClienteController {
    static async listarclientes(req: Request, res: Response) {
        try {
            const listaClientes = await cliente.find({});
            res.status(200).json(listaClientes);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };

    static async listarClientePorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const clienteEncontrado = await cliente.findById(id);
            res.status(200).json(clienteEncontrado);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };

    static async cadastrarCliente(req: Request, res: Response) {
        try {
            const novoCliente = req.body;
            const meioDecontatoEncontrado = await meioDeContato.findById(novoCliente.meiodecontato);
            console.log(`meiodecontato: ${meioDecontatoEncontrado}`);
            if (meioDecontatoEncontrado) {
                const clienteCompleto = {
                    ...novoCliente,
                    meiodecontato: meioDecontatoEncontrado.toObject(),
                };

                const clienteCriado = await cliente.create(clienteCompleto);
                res.status(201).json({ message: 'criado com sucesso', cliente: clienteCriado });
            } else {
                res.status(500).send('Meio de contato não encontrado');
            }
        } catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar cliente: ${error}` });
        };
    }

    static async atualizarCliente(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await cliente.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Cliente atualizado' });
        } catch (error) {
            res.status(500).json({ message: `Falha na atualização do cliente: ${error}` });
        }
    };

    static async deletarCliente(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await cliente.findByIdAndDelete(id);
            res.status(200).json({ message: 'Cliente deletado' });
        } catch (error) {
            res.status(500).json({ message: `Falha ao deletar o cliente: ${error}` });
        }
    };


    static async buscarClientesPorNome(req: Request, res: Response) {
        try {
            const nomeCliente = req.query.nomecliente;
            const listaClientes = await cliente.find({ nome: nomeCliente });
            res.status(200).json(listaClientes);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };
};

export default ClienteController;