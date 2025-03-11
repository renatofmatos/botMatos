import { SituacaoAtendimento, TipoRemetente } from "../config/enum.js";
import { Mensagem } from "../models/mensagem.js";
import { Atendimento, AtendimentoModel } from "../models/atendimento.js";
import { MensagemModel } from "../models/mensagem.js";
import mongoose from "mongoose";

export class AtendimentoService {

    static async atendimentoAberto(remetenteId: string) {
        try {
            const atendimento = await AtendimentoModel.findOne({ _remetenteId: remetenteId }).exec();
            if (!atendimento || atendimento.situacaoAtendimento === SituacaoAtendimento.AtendimentoEncerrado) {
                return undefined;
            } else {
                return atendimento._id;
            }
        } catch (error) {
            console.log(`Erro ao consultar atendimento: ${error}`);
            return undefined;
        };
    }

    static async processarMensagem(
        remetenteId: string,
        nomeContato: string,
        dataRecebimentoMensagem: Date,
        corpoMensagem: string,
        tipoConteudoMensagem: string

    ) {
        
        let idAtendimentoAberto =  await this.atendimentoAberto(remetenteId);

        if (!idAtendimentoAberto) {
            const atendimento = new Atendimento(remetenteId, nomeContato, dataRecebimentoMensagem, SituacaoAtendimento.NovaMensagem);
            const novoAtendimento = new AtendimentoModel(atendimento);
            idAtendimentoAberto = novoAtendimento._id;
            novoAtendimento.save();

        };

        const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, tipoConteudoMensagem, idAtendimentoAberto);
        const novaMensagem = new MensagemModel(mensagem);
        await novaMensagem.save();

    }
}