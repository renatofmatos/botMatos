import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";

export class MensagemService {
    static async responderMensagem(mensagem: Mensagem, nomeContato?: string) {
        MensagemModel.create(mensagem);
        if (nomeContato) {
            await MensagemController.responderMensagem(mensagem, nomeContato);
        }else {
            console.log(`Nome do cliente indefinido`);
        }
    }

    static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
        MensagemController.marcarMensagemLida(mensagemIdSistemaOrigem);
    }
}
