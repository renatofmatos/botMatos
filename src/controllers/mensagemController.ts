import axios from "axios";
import { Mensagem } from "../models/mensagem.js";
import { TipoConteudoMensagem } from "../config/enum.js";
import { PayloadMenuPrincipal } from "../config/constantes.js";
import { Request, Response } from "express";
import { MensagemService } from "../services/mensagemService.js";
import { Types } from "mongoose";
import { Atendimento } from "../models/atendimento.js";
import { Ref } from "@typegoose/typegoose";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const URL_POST_REMETENTE_ID = process.env.URL_POST_REMETENTE_ID;

class MensagemController {

  private static payloadMenuPrincipal(nomeCliente?: string) {
    const payload = JSON.parse(JSON.stringify(PayloadMenuPrincipal));
    payload.interactive.body.text = payload.interactive.body.text.replace(
      '{{nome_cliente}}',
      nomeCliente || ''
    );
    return payload;
  }

  private static criarPayload(mensagem: Mensagem, nomeContato?: string) {
    let data: Record<string, any> = {
      messaging_product: "whatsapp",
      to: mensagem.destinatarioId
    };

    // Mapeamento do tipo de conteúdo para os atributos corretos
    const conteudoMapeado: Record<TipoConteudoMensagem, any> = {
      [TipoConteudoMensagem.texto]: {
        text: { body: mensagem.corpoMensagem }
      },
      [TipoConteudoMensagem.menuPrincipal]: this.payloadMenuPrincipal(nomeContato),
      [TipoConteudoMensagem.statusRead]: {
        status: TipoConteudoMensagem.statusRead,
        message_id: mensagem.mensagemIdSistemaOrigem
      }
    };

    // Adiciona dinamicamente o conteúdo correto ao payload
    return { ...data, ...(conteudoMapeado[mensagem.tipoConteudoMensagem as TipoConteudoMensagem] || {}) };
  }

  static async responderMensagem(mensagem: Mensagem, nomeContato?: string) {

    await axios({
      method: "POST",
      url: `${URL_POST_REMETENTE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
      data: this.criarPayload(mensagem, nomeContato),
    });
  }

  static async marcarMensagemLida(mensagemIdSistemaOrigem: string) {
    try {
      await axios({
        method: "POST",
        url: `${URL_POST_REMETENTE_ID}/messages`,
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: mensagemIdSistemaOrigem
        },
      });
    } catch (error) {
      console.log(`Erro ao tentar marcar a mensagem como lida ${error}`);
    }
  }

  public static async buscarMensagensAtendimento(req: Request, res: Response) {
    console.log(req);
    const atendimentoId = req.query.atendimentoId as string;
    atendimentoId
    console.log(`query parametro: ${atendimentoId}`);
    if (atendimentoId && Types.ObjectId.isValid(atendimentoId)) {
      try {
        const atendimentoIdRef = new Types.ObjectId(atendimentoId) as Ref<Atendimento>;
        const mensagens = await MensagemService.buscarMensagensAtendimento(atendimentoIdRef);
  
        console.log(mensagens.length, mensagens);
        res.status(200).json(mensagens);
        
      } catch (error) {
        console.error(`Falha ao buscar mensagens do atendimentoId: ${atendimentoId} erro: ${error} `);
        res.status(400).json({ message: `Falha ao buscar mensagens do atendimentoId: ${atendimentoId}` });
      }
    } else {
      res.status(400).json({ message: `ID de atendimento inválido ${atendimentoId}` });
    }
  }

}


export default MensagemController;
