import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { SituacaoAtendimento, TipoRemetente } from "../config/enum.js";
import { Mensagem } from "./mensagem.js";
import crypto from 'crypto';

export class Atendimento {
    @prop({ type: mongoose.Schema.ObjectId })
    private atendimentoId!: mongoose.Types.ObjectId;

    @prop({ required: true })
    private _numeroProtocolo: string;

    @prop({ required: true })
    private _remetenteId: string;

    @prop({ required: true })
    private _dataInicioAtendimento: Date;

    @prop({ required: true })
    private _nomeContato: string;

    @prop({ required: true })
    private _situacaoAtendimento: SituacaoAtendimento;

    constructor(identificacaoRetemente: string, nomeCliente: string, dataInicioAtendimento: Date, situacaoAtendimento: SituacaoAtendimento) {
        this._numeroProtocolo = this.gerarProtocolo();
        this._remetenteId = identificacaoRetemente;
        this._dataInicioAtendimento = dataInicioAtendimento;
        this._nomeContato = nomeCliente;
        this._situacaoAtendimento = situacaoAtendimento;
    }

    get numeroProtocolo() {
        return this._numeroProtocolo;
    }

    get identificadorRemetente() {
        return this._remetenteId;
    }

    get dataInicioAtendimento() {
        return this._dataInicioAtendimento;
    }

    get nomeCliente() {
        return this._nomeContato;
    }

    get situacaoAtendimento(): SituacaoAtendimento {
        return this._situacaoAtendimento;
    }

    definirSituacaoAtendimento(situacao: SituacaoAtendimento) {
        this._situacaoAtendimento = situacao;
    }

    // adicionarMensagem(mensagem: Ref<Mensagem>) {
    //     this._mensagens.push(mensagem);
    // }

    private gerarProtocolo(): string {
        const agora = new Date();
        const dataFormatada = agora.toISOString().replace(/[-T:]/g, "").split(".")[0]; // AAAAMMDDHHMMSS
        const idAleatorio = crypto.randomBytes(3).toString("hex").toUpperCase(); // Gera um identificador curto
        return `${dataFormatada}-${idAleatorio}`;
    }

}


export const AtendimentoModel = getModelForClass(Atendimento, {
    schemaOptions: { versionKey: false }
});

