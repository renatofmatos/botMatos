import { AtendimentoService } from "../services/atendimentoService.js";
import { Request, Response } from "express";

class AtendimentoController {
    
        static async listarAtendimentosAtivos(req: Request, res: Response) {
            try {
                const atendimentosComMensagens = await AtendimentoService.listarAtendimentosAtivosComUltimaMensagem();
                res.status(200).json(atendimentosComMensagens);
                
            } catch (error) {
                console.error(`Erro ao recuperar atendimentos: ${error}`);
                
            }
        }
}

export default AtendimentoController;