import { prop, getModelForClass, DocumentType, Ref, index } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { SituacaoAtendimento, TipoRemetente } from "../config/enum.js";
import { Mensagem } from "./mensagem.js";
import crypto from 'crypto';

export class Atendimento {

    @prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id!: mongoose.Types.ObjectId; // O MongoDB gerencia automaticamente esse campo

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

    constructor(remetenteId: string, nomeContato: string, dataInicioAtendimento: Date, situacaoAtendimento: SituacaoAtendimento, numeroProtocolo?: string) {
        this._remetenteId = remetenteId;
        this._dataInicioAtendimento = dataInicioAtendimento;
        this._nomeContato = nomeContato;
        this._situacaoAtendimento = situacaoAtendimento;
        this._numeroProtocolo = numeroProtocolo ?? this.gerarProtocolo();
    }

    private static fromDocument(doc: DocumentType<Atendimento>): Atendimento {
        const atendimento = new Atendimento(
            doc._remetenteId,
            doc._nomeContato,
            doc._dataInicioAtendimento,
            doc._situacaoAtendimento,
            doc._numeroProtocolo
        );
        (atendimento as any)._id = doc._id;
        return atendimento;
    }

    public static async buscarAtendimento(remetenteId: string) {
        const atendimentoDoc = await AtendimentoModel.findOne({ _remetenteId: remetenteId }) as DocumentType<Atendimento>;
        if (atendimentoDoc) {
            const atendimento = Atendimento.fromDocument(atendimentoDoc);
            return atendimento;
        } else {
            console.log(`Atendimento não encontrado! ${remetenteId}`);
        }
    };

    public get atendimentoId() {
        return this._id;
    }

    get numeroProtocolo() {
        return this._numeroProtocolo;
    }

    get remetenteId() {
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

    private gerarProtocolo(): string {
        const agora = new Date();
        const dataFormatada = agora.toISOString().replace(/[-T:]/g, "").split(".")[0]; // AAAAMMDDHHMMSS
        const idAleatorio = crypto.randomBytes(3).toString("hex").toUpperCase(); // Gera um identificador curto
        return `${dataFormatada}-${idAleatorio}`;
    }

    public static async salvar(atendimento: Atendimento) {
        await AtendimentoModel.create(atendimento);
    }

}


export const AtendimentoModel = getModelForClass(Atendimento, {
    schemaOptions: { versionKey: false }
});

