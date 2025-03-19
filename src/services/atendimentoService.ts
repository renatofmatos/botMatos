import { constants } from "buffer";
import { RespostaMenu, SituacaoAtendimento, Template, TipoConteudoMensagem, TipoRemetente } from "../config/enum.js";
import { Atendimento } from "../models/atendimento.js";
import { Mensagem } from "../models/mensagem.js";
import { MensagemService } from "./mensagemService.js";
import { TextoHistoria, TextoServicos } from "../config/constantes.js";

export class AtendimentoService {

    static async encerrarAtendimento(atendimento: Atendimento) {
        const mensagemEncerramento = new Mensagem(new Date(), 'Foi um prazer falar com você! Qualquer dúvida ou necessidade, estou à disposição. Espero que possamos trabalhar juntos em breve. Até mais! 🤝', TipoRemetente.Atendente, this.remetenteNumero(), atendimento.remetenteId, TipoConteudoMensagem.texto, 'N/A', atendimento.atendimentoId);
        atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AtendimentoEncerrado);
        await MensagemService.responderMensagem(mensagemEncerramento, atendimento.nomeCliente);
    }

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
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AguardandoRelatoOrcamento);
                break;

            case RespostaMenu.Historia:
                respostaMenu = new Mensagem(new Date(), TextoHistoria, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AguardandoRelatoOrcamento);

                break;

            case RespostaMenu.Servicos:
                respostaMenu = new Mensagem(new Date(), TextoServicos, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AguardandoRelatoOrcamento);

                break;

            default:

                respostaMenu = new Mensagem(new Date(), 'Por favor, selecione um item do menu.', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                break;

        }
        MensagemService.responderMensagem(respostaMenu, atendimento.nomeCliente);
    }

    static async realizarAtendimento(atendimento: Atendimento, mensagemRecebida: Mensagem) {

        MensagemService.marcarMensagemLida(mensagemRecebida.mensagemIdSistemaOrigem);

        switch (atendimento.situacaoAtendimento) {
            case SituacaoAtendimento.InicioAtendimento:
                const respostaMensagem = new Mensagem(new Date(), Template.MenuPrincipal, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.menuPrincipal, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                MensagemService.responderMensagem(respostaMensagem, atendimento.nomeCliente);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.EncaminhadoMenuAtendimento);
                break;

            case SituacaoAtendimento.EncaminhadoMenuAtendimento:
                this.responderSelecaoMenu(atendimento, mensagemRecebida);
                break;

            case SituacaoAtendimento.AguardandoRelatoOrcamento:
                //TODO Desenhar e implementar fluxo de pedido de orçamento.
                const respostaOrcamento = new Mensagem(new Date(), `Obrigado por compartilhar sua necessidade! Vou avaliar com atenção e em breve entro em contato com uma excelente proposta para você. Se precisar de algo mais enquanto isso, estou à disposição!`, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                await MensagemService.responderMensagem(respostaOrcamento, atendimento.nomeCliente);
                await AtendimentoService.encerrarAtendimento(atendimento);
                break;

            case SituacaoAtendimento.ConhecerHistoria:
                const resposta = new Mensagem(new Date(), 'Que tal me contar um pouco sobre sua rotina para viabilizarmos uma automação?', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                MensagemService.responderMensagem(mensagemRecebida);
                break;

            default:
                break;
        }
        Atendimento.atualizar(atendimento);
    }

    static async buscaAtendimentoAberto(remetenteId: string) {
        try {
            const atendimento = await Atendimento.buscarAtendimentoAberto(remetenteId);

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
            console.log(`Atendimento criado ${String(atendimento.nomeCliente)} protocolo: ${atendimento.numeroProtocolo}`);
            atendimentoAberto = await Atendimento.salvar(atendimento);
        }

        const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, remetenteId, destinatarioId, Mensagem.converterTipoConteudo(tipoConteudoMensagem), mensagemIdSistemaOrigem, atendimentoAberto.atendimentoId);
        await Mensagem.salvar(mensagem);
        this.realizarAtendimento(atendimentoAberto, mensagem);
    }

    static async encerrarAtendimentosInativos(): Promise<void> {
        const cincoMinutosAtras = new Date(Date.now() - 5 * 60 * 1000);
        const atendimentosAbertos = await Atendimento.buscarAtendimentosAbertos();
        for (const atendimento of atendimentosAbertos) {
            const ultimaMensagem = await Mensagem.retornaUltimaMensagem(atendimento.atendimentoId);
            if (ultimaMensagem?.tipoRemetente === TipoRemetente.Atendente && ultimaMensagem.dataRecebimento < cincoMinutosAtras) {
                console.log(`Encerrando atendimento do remetente: ${atendimento.remetenteId}`);
                this.encerrarAtendimento(atendimento);
                Atendimento.atualizar(atendimento);
            }
        }

    }
}