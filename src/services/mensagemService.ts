import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";
import { Atendimento } from "../models/atendimento.js";

export class MensagemService {
    static responderMensagem(mensagem: Mensagem, nomeCliente?: string) {
        MensagemModel.create(mensagem);
        if (nomeCliente) {
            MensagemController.responderMensagem(mensagem, nomeCliente);
        }else {
            console.log(`Nome do cliente indefinido`);
        }
    }

    static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
        MensagemController.marcarMensagemLida(mensagemIdSistemaOrigem);
    }
}
