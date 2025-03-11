import { SituacaoAtendimento, TipoRemetente } from "../config/enum.js";
import { Mensagem } from "../models/mensagem.js";
import { Atendimento, AtendimentoModel } from "../models/atendimento.js";
import { MensagemModel } from "../models/mensagem.js";

export class AtendimentoService {
    static async processarMensagem(
        remetenteId: string,
        nomeContato: string,
        dataRecebimentoMensagem: Date,
        corpoMensagem: string,
        tipoConteudoMensagem: string

    ) {
        // TODO implementar a verificação de atendimento já aberto
        const atendimento = new Atendimento(remetenteId, nomeContato, dataRecebimentoMensagem, SituacaoAtendimento.NovaMensagem);
        const novoAtendimento = new AtendimentoModel(atendimento);
        novoAtendimento.save();

        const mensagem = new Mensagem(dataRecebimentoMensagem, corpoMensagem, TipoRemetente.Cliente, tipoConteudoMensagem, novoAtendimento._id);
        const novaMensagem = new MensagemModel(mensagem);
        await novaMensagem.save();
        
    }
}