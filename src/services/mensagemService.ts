import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";

export class MensagemService {
    static async responderMensagem(mensagem: Mensagem, nomeCliente?: string) {
        MensagemModel.create(mensagem);
        if (nomeCliente) {
            await MensagemController.responderMensagem(mensagem, nomeCliente);
        }else {
            console.log(`Nome do cliente indefinido`);
        }
    }

    static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
        MensagemController.marcarMensagemLida(mensagemIdSistemaOrigem);
    }
}
