import { meioDeContato } from "../models/meioDeContato.js";
import { Request, Response } from "express";

class MeioDeContatoController {
    static async listarMeiosDeContato(req: Request, res: Response) {
        try {
            const listaMeioDeContatos = await meioDeContato.find({});
            res.status(200).json(listaMeioDeContatos);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };

    static async listarMeiosDeContatoPorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const meioDeContatoEncontrado = await meioDeContato.findById(id);
            res.status(200).json(meioDeContatoEncontrado);
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };

    static async cadastrarMeioDeContato(req: Request, res: Response) {
        try {
            const novoMeioDeContato = await meioDeContato.create(req.body);
            res.status(201).json({ message: 'criado com sucesso', meiodecontato: novoMeioDeContato });
        } catch (error) {
            res.status(500).json({ message: `Falha ao cadastrar meio de contato: ${error}` });
        };
    }

    static async atualizarMeioDeContato(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await meioDeContato.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Meio de contato atualizado'});
        } catch (error) {
            res.status(500).json({ message: `Falha na atualização do meio de contato: ${error}` });
        }
    };

    static async deletarMeioDeContato(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await meioDeContato.findByIdAndDelete(id);
            res.status(200).json({ message: 'Meio de contato deletado'});
        } catch (error) {
            res.status(500).json({ message: `Falha ao deletar o meio de contato: ${error}` });
        }
    };
};

export default MeioDeContatoController;