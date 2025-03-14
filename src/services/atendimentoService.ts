import { RespostaMenu, SituacaoAtendimento, Template, TipoConteudoMensagem, TipoRemetente } from "../config/enum.js";
import { Atendimento } from "../models/atendimento.js";
import { Mensagem } from "../models/mensagem.js";
import { MensagemService } from "./mensagemService.js";

export class AtendimentoService {

    static remetenteNumero() {

        const REMETENTE_NUMERO = process.env.REMETENTE_NUMERO;
        if (!REMETENTE_NUMERO) {
            throw new Error('Variável de ambiente REMETENTE_NUMERO não está definida.');
        }
        return REMETENTE_NUMERO;
    }
    static responderSelecaoMenu(atendimento: Atendimento, mensagemRecebida: Mensagem) {
        let respostaMenu: Mensagem;
        switch (mensagemRecebida.corpoMensagem) {
            case RespostaMenu.Orcamento:
                respostaMenu = new Mensagem(new Date(), 'Ótimo, me encaminhe por aqui mesmo um resumo da sua demanda.', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.SolicitadoOrcamento);

                break;

            case RespostaMenu.Historia:
                respostaMenu = new Mensagem(new Date(), 'Estamos construindo um relato, em breve disponibilizaremos', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.ConhecerHistoria);

                break;

            case RespostaMenu.Produtos:
                respostaMenu = new Mensagem(new Date(), 'Trabalhos com automações comerciais de diversos tipos, implementamos robôs de atendimento virtual, sites, paineis de auto atendimento, aplicativos móveis, e demais automações. Também atuamos com análise e mineração de dados.', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.ConhecerProdutos);

                break;

            default:
                break;
        }
    }

    static realizarAtendimento(atendimento: Atendimento, mensagemRecebida: Mensagem) {

        MensagemService.marcarMensagemLida(mensagemRecebida.mensagemIdSistemaOrigem);

        switch (atendimento.situacaoAtendimento) {
            case SituacaoAtendimento.InicioAtendimento:
                const respostaMensagem = new Mensagem(new Date(), Template.MenuPrincipal, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.template, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                MensagemService.responderMensagem(respostaMensagem, atendimento.nomeCliente);
                break;

            case SituacaoAtendimento.SelecionadoMenu:
                this.responderSelecaoMenu(atendimento, mensagemRecebida);
                break;

            case SituacaoAtendimento.ConhecerHistoria:
                const resposta = new Mensagem(new Date(), 'Que tal me conta um pouco sobre sua rotina para viabilizarmos uma automação?', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                MensagemService.responderMensagem(mensagemRecebida);
                break;

            default:
                break;
        }

        if (atendimento.situacaoAtendimento === SituacaoAtendimento.InicioAtendimento) {


        } else {
            console.log(`Não entrou: ${this.remetenteNumero()} | ${atendimento.situacaoAtendimento}`)
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

    static async processarMensagem(remetenteId: string, destinatarioId: string, nomeContato: string, dataRecebimentoMensagem: Date, corpoMensagem: string, tipoConteudoMensagem: string, mensagemIdSistemaOrigem: string
    ) {
        let atendimentoAberto = await this.buscaAtendimentoAberto(remetenteId);
        if (!atendimentoAberto) {
            const atendimento = new Atendimento(remetenteId, nomeContato, dataRecebimentoMensagem, SituacaoAtendimento.InicioAtendimento);
            console.log(`Atendimento criado ${String(atendimento.nomeCliente)}`);
            await Atendimento.salvar(atendimento);
            atendimentoAberto = await this.buscaAtendimentoAberto(remetenteId); //Necessário buscar devido ao campo virtual _id do mongoDB
        };
        if (atendimentoAberto) {
            atendimentoAberto.definirSituacaoAtendimento(SituacaoAtendimento.SelecionadoMenu);
            const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, remetenteId, destinatarioId, Mensagem.converterTipoConteudo(tipoConteudoMensagem), mensagemIdSistemaOrigem, atendimentoAberto.atendimentoId);
            await Mensagem.salvar(mensagem);
            this.realizarAtendimento(atendimentoAberto, mensagem);
        } else {
            console.log(`Atendimento não encontrado!`)
        }
    }
}