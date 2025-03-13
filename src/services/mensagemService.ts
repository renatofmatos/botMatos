import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";

export class MensagemService {
    static responderMensagem(mensagem: Mensagem) {
        MensagemModel.create(mensagem);
        MensagemController.responderMensagem(mensagem);
    }

    static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
        MensagemController.marcarMensagemLida(mensagemIdSistemaOrigem);
    }
}
