import { TipoRemetente } from "../config/enum.js";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Atendimento } from "./atendimento.js";


export class Mensagem {

    @prop({ required: true })
    private _dataRecebimento: Date;

    @prop({ required: true })
    private _textoMensagem: string;

    @prop({ required: true })
    private _tipoRemetente: TipoRemetente;

    @prop({ required: true })
    private _tipoConteudoMensagem: string;

    @prop({ ref: () => Atendimento, required: true })
    private _atendimento!: Ref<Atendimento>;

    constructor(dataRecebimento: Date, textoMensagem: string, tipoRemetente: TipoRemetente, tipoConteudoMensagem: string, atendimento: Ref<Atendimento>) {
        this._dataRecebimento = dataRecebimento;
        this._textoMensagem = textoMensagem;
        this._tipoRemetente = tipoRemetente;
        this._tipoConteudoMensagem = tipoConteudoMensagem;
        this._atendimento = atendimento;
    }

    public get dataRecebimento(): Date {
        return this._dataRecebimento;
    }

    public get textoMensagem(): string {
        return this._textoMensagem
    }

    public get tipoRemetente(): TipoRemetente {
        return this._tipoRemetente;
    }

    public get tipoConteudoMensagem(): string {
        return this._tipoConteudoMensagem;
    }

    redefinirMensagem(dataRecebimento: Date, textoMensagem: string, tipoRemetente: TipoRemetente) {
        this._dataRecebimento = dataRecebimento;
        this._textoMensagem = textoMensagem;
        this._tipoRemetente = tipoRemetente;
    }

}

export const MensagemModel = getModelForClass(Mensagem, {
    schemaOptions: {
        versionKey: false
    }
});
