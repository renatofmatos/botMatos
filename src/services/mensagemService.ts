import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";

export class MensagemService {
    static responderMensagem(mensagem: Mensagem, nomeCliente?: string) {
        MensagemModel.create(mensagem);
        MensagemController.responderMensagem(mensagem, nomeCliente);
    }

    static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
        MensagemController.marcarMensagemLida(mensagemIdSistemaOrigem);
    }
}
