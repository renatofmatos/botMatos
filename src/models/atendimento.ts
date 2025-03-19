import { prop, getModelForClass, DocumentType } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { SituacaoAtendimento, TipoRemetente } from "../config/enum.js";
import crypto from 'crypto';
import { Mensagem } from "./mensagem.js";

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

    public static async buscarAtendimentoAberto(remetenteId: string) {
        try {
            const atendimentoDoc = await AtendimentoModel.findOne({
                _remetenteId: remetenteId,
                _situacaoAtendimento: { $ne: SituacaoAtendimento.AtendimentoEncerrado } // Filtra atendimentos diferentes de "Encerrado"
            }).sort({ _dataInicioAtendimentocreatedAt: -1 })  as DocumentType<Atendimento>;
            if (atendimentoDoc) {
                return Atendimento.fromDocument(atendimentoDoc);
            } else {
                console.log(`Não existe atendimento aberto para o remetente: ${remetenteId}`);
            }

        } catch (error) {
            console.error(`atendimento.buscarAtendimentoAberto(${remetenteId}) - erro - ${error}`)
        }

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

    public static async buscarAtendimentosAbertos() {
        const atendimentosAbertosDoc = await AtendimentoModel.find({
            _situacaoAtendimento: { $ne: SituacaoAtendimento.AtendimentoEncerrado }
        }) as [DocumentType<Atendimento>];

        return atendimentosAbertosDoc.map(doc => this.fromDocument(doc));
    }

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

    get nomeContato() {
        return this._nomeContato;
    }

    get situacaoAtendimento(): SituacaoAtendimento {
        return this._situacaoAtendimento;
    }

    public definirSituacaoAtendimento(situacao: SituacaoAtendimento) {
        this._situacaoAtendimento = situacao;
    }

    private gerarProtocolo(): string {
        const agora = new Date();
        const dataFormatada = agora.toISOString().replace(/[-T:]/g, "").split(".")[0]; // AAAAMMDDHHMMSS
        const idAleatorio = crypto.randomBytes(3).toString("hex").toUpperCase(); // Gera um identificador curto
        return `${dataFormatada}-${idAleatorio}`;
    }

    public static async salvar(atendimento: Atendimento) {
        const atendimentoDoc = await AtendimentoModel.create(atendimento) as DocumentType<Atendimento>;
        return Atendimento.fromDocument(atendimentoDoc);
    }

    public static async atualizar(atendimento: Atendimento) {
        try {

            await AtendimentoModel.findByIdAndUpdate(atendimento.atendimentoId, { _situacaoAtendimento: atendimento.situacaoAtendimento });

        } catch (error) {
            console.error(`Atendimento.atualizar(${atendimento.atendimentoId}, {_situacaoAtendimento: ${atendimento.situacaoAtendimento}}) - Falha - ${error}`);
        }
    }

}


export const AtendimentoModel = getModelForClass(Atendimento, {
    schemaOptions: { versionKey: false }
});

