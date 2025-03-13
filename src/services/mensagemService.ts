import { Atendimento } from "../models/atendimento.js";
import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";

export class MensagemService {
    static responderMensagem(mensagem: Mensagem ) {
        MensagemModel.create(mensagem);
        console.log(`Entrou aqui ${mensagem}`)
        MensagemController.responderMensagem(mensagem);
    }
}