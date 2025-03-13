import { SituacaoAtendimento, TipoConteudoMensagem, TipoRemetente } from "../config/enum.js";
import { Atendimento } from "../models/atendimento.js";
import { Mensagem } from "../models/mensagem.js";
import { MensagemService } from "./mensagemService.js";

export class AtendimentoService {

    static async realizarAtendimento(atendimento: Atendimento, mensagemRecebida: Mensagem) {

        const REMETENTE_NUMERO = process.env.REMETENTE_NUMERO;
        if (atendimento.situacaoAtendimento === SituacaoAtendimento.NovaMensagem && REMETENTE_NUMERO) {
            const respostaMensagem = new Mensagem(new Date(), `menu_opcoes`, TipoRemetente.Atendente, REMETENTE_NUMERO, mensagemRecebida.remetenteId, TipoConteudoMensagem.template, atendimento.atendimentoId)
            MensagemService.responderMensagem(respostaMensagem);
        } else {
            console.log(`Não entrou: ${REMETENTE_NUMERO} | ${atendimento.situacaoAtendimento}`)
        }
    }

    static async buscaAtendimentoAberto(remetenteId: string) {
        try {
            const atendimento = await Atendimento.buscarAtendimento(remetenteId);
            if (!atendimento || atendimento.situacaoAtendimento === SituacaoAtendimento.AtendimentoEncerrado) {
                return undefined;
            } else {
                return atendimento;
            }
        } catch (error) {
            console.log(`Erro ao consultar atendimento: ${error}`);
            return undefined;
        };
    }

    static async processarMensagem(remetenteId: string, destinatarioId: string, nomeContato: string, dataRecebimentoMensagem: Date, corpoMensagem: string, tipoConteudoMensagem: string
    ) {
        let atendimentoAberto = await this.buscaAtendimentoAberto(remetenteId);
        if (!atendimentoAberto) {
            const atendimento = new Atendimento(remetenteId, nomeContato, dataRecebimentoMensagem, SituacaoAtendimento.NovaMensagem);
            console.log(`Atendimento criado ${String(atendimento.nomeCliente)}`);
            await Atendimento.salvar(atendimento);
            atendimentoAberto = await this.buscaAtendimentoAberto(remetenteId); //Necessário buscar devido ao campo virtual _id do mongoDB
        };
        if (atendimentoAberto) {
            const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, remetenteId, destinatarioId, Mensagem.converterTipoConteudo(tipoConteudoMensagem), atendimentoAberto.atendimentoId);
            await Mensagem.salvar(mensagem);
            this.realizarAtendimento(atendimentoAberto, mensagem);
        } else {
            console.log(`Atendimento não encontrado!`)
        }
    }
}