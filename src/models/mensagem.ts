import { TipoConteudoMensagem, TipoRemetente } from "../config/enum.js";
import { prop, getModelForClass, Ref, mongoose } from "@typegoose/typegoose";
import { Atendimento } from "./atendimento.js";


export class Mensagem {

    @prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id!: mongoose.Types.ObjectId;

    @prop({ required: true })
    private _dataRecebimento: Date;

    @prop({ required: true })
    private _corpoMensagem: string;

    @prop({ required: true })
    private _tipoRemetente: TipoRemetente;

    @prop({ required: true })
    private _remetenteId: string;

    @prop({ required: true })
    private _destinatarioId: string;

    @prop({ required: true })
    private _tipoConteudoMensagem: string;

    @prop({ ref: () => Atendimento, required: true })
    private _atendimento: Ref<Atendimento>;

    constructor(
        dataRecebimento: Date,
        corpoMensagem: string,
        tipoRemetente: TipoRemetente,
        remetenteId: string,
        destinatarioId: string,
        tipoConteudoMensagem: TipoConteudoMensagem,
        atendimento: Ref<Atendimento>
    ) {
        this._dataRecebimento = dataRecebimento;
        this._corpoMensagem = corpoMensagem;
        this._tipoRemetente = tipoRemetente;
        this._remetenteId = remetenteId;
        this._destinatarioId = destinatarioId;
        this._tipoConteudoMensagem = tipoConteudoMensagem;
        this._atendimento = atendimento;
    }


    public get mensagemId() {
        return this._id;
    }

    public get destinatarioId(): string {
        return this._destinatarioId;
    }

    public get remetenteId(): string {
        return this._remetenteId;
    }

    public get dataRecebimento(): Date {
        return this._dataRecebimento;
    }

    public get corpoMensagem(): string {
        return this._corpoMensagem
    }

    public get tipoRemetente(): TipoRemetente {
        return this._tipoRemetente;
    }

    public get tipoConteudoMensagem(): string {
        return this._tipoConteudoMensagem;
    }

    static async salvar(mensagem: Mensagem) {
        MensagemModel.create(mensagem);
    }

    static converterTipoConteudo(tipoRecebido: string): TipoConteudoMensagem {

        const MAPA_TIPO_CONTEUDO: Record<string, TipoConteudoMensagem> = {
            'text': TipoConteudoMensagem.texto,
            'templaste': TipoConteudoMensagem.template
        };
        return MAPA_TIPO_CONTEUDO[tipoRecebido] || TipoConteudoMensagem.texto; // Valor padrão caso não encontre
    }

}

export const MensagemModel = getModelForClass(Mensagem, {
    schemaOptions: {
        versionKey: false
    }
});
