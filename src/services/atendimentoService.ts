import { RespostaMenu, SituacaoAtendimento, Template, TipoConteudoMensagem, TipoRemetente } from "../config/enum.js";
import { Atendimento } from "../models/atendimento.js";
import { Mensagem } from "../models/mensagem.js";
import { MensagemService } from "./mensagemService.js";

export class AtendimentoService {

    static encerrarAtendimento(atendimento: Atendimento) {
        const mensagemEncerramento = new Mensagem(new Date(), 'Matos Tecnologia agradece ao contato, volte sempre!.', TipoRemetente.Atendente, this.remetenteNumero(), atendimento.remetenteId, TipoConteudoMensagem.texto, 'N/A', atendimento.atendimentoId);
        atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AtendimentoEncerrado);
        MensagemService.responderMensagem(mensagemEncerramento, atendimento.nomeCliente);
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
                respostaMenu = new Mensagem(new Date(), 'Estamos construindo um relato, em breve disponibilizaremos', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.InicioAtendimento);

                break;

            case RespostaMenu.Servicos:
                respostaMenu = new Mensagem(new Date(), 'Trabalhos com automações comerciais de diversos tipos, implementamos robôs de atendimento virtual, sites, paineis de auto atendimento, aplicativos móveis, e demais automações. Também atuamos com análise e mineração de dados.', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.InicioAtendimento);

                break;

            default:

                respostaMenu = new Mensagem(new Date(), 'Por favor, selecione um item do menu.', TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                break;

        }
        MensagemService.responderMensagem(respostaMenu, atendimento.nomeCliente);
    }

    static realizarAtendimento(atendimento: Atendimento, mensagemRecebida: Mensagem) {

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
                const respostaOrcamento = new Mensagem(new Date(), `Obrigado pela descrição, iniciaremos uma avaliação e retornaremos o contato em breve!`, TipoRemetente.Atendente, this.remetenteNumero(), mensagemRecebida.remetenteId, TipoConteudoMensagem.texto, mensagemRecebida.mensagemIdSistemaOrigem, atendimento.atendimentoId);
                MensagemService.responderMensagem(respostaOrcamento, atendimento.nomeCliente);
                AtendimentoService.encerrarAtendimento(atendimento);
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
        };
        if (atendimentoAberto) {
            const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, remetenteId, destinatarioId, Mensagem.converterTipoConteudo(tipoConteudoMensagem), mensagemIdSistemaOrigem, atendimentoAberto.atendimentoId);
            await Mensagem.salvar(mensagem);
            this.realizarAtendimento(atendimentoAberto, mensagem);
        } else {
            console.log(`atendimentoService.processarMensagem(${remetenteId}) - Atendimento não encontrado ou não aberto`)
        }
    }

    static async encerrarAtendimentosInativos(): Promise<void> {
        const cincoMinutosAtras = new Date(Date.now() - 5 * 60 * 1000);
        const atendimentosAbertos = await Atendimento.buscarAtendimentosAbertos();
        for (const atendimento of atendimentosAbertos) {
            const ultimaMensagem = await Mensagem.retornaUltimaMensagem(atendimento.atendimentoId);
            if (ultimaMensagem?.tipoRemetente === TipoRemetente.Atendente && ultimaMensagem.dataRecebimento < cincoMinutosAtras) {
                console.log(`Encerrando atendimento do remetente: ${atendimento.remetenteId}`);
                atendimento.definirSituacaoAtendimento(SituacaoAtendimento.AtendimentoEncerrado);
                Atendimento.atualizar(atendimento);
            } else {
                console.log(`Atendimento dentro do prazo ${ultimaMensagem?.dataRecebimento} horario comparado: ${cincoMinutosAtras}`);
            }
        }

    }
}