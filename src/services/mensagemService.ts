import { Mensagem, MensagemModel } from "../models/mensagem.js";
import MensagemController from "../controllers/mensagemController.js";
import { Atendimento } from "../models/atendimento.js";
import { Ref } from "@typegoose/typegoose";

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

    static async buscarMensagensAtendimento(remetenteId: Ref<Atendimento>){
        const mensagensAtendimento = await Mensagem.buscarMensagensAtendimento(remetenteId)
        return mensagensAtendimento;
    }
}
