import axios from "axios";
import { Mensagem } from "../models/mensagem.js";
import { TipoConteudoMensagem } from "../config/enum.js";
import { text } from "stream/consumers";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const URL_POST_REMETENTE_ID = process.env.URL_POST_REMETENTE_ID;

class MensagemController {

  private static criarPayload(mensagem: Mensagem, nomeCliente?: string) {
    let data: Record<string, any> = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: mensagem.destinatarioId
    };

    // Mapeamento do tipo de conteúdo para os atributos corretos
    const conteudoMapeado: Record<TipoConteudoMensagem, any> = {
      [TipoConteudoMensagem.texto]: {
        text: { body: mensagem.corpoMensagem }
      },
      [TipoConteudoMensagem.template]: {
        type: "template",
        template: {
          name: mensagem.corpoMensagem,
          language: { code: "pt_BR" },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  parameter_name: "nome_cliente",
                  text: nomeCliente
                }
              ]
            }
          ]
        },
      },
      [TipoConteudoMensagem.statusRead]: {
        status: TipoConteudoMensagem.statusRead,
        message_id: mensagem.mensagemIdSistemaOrigem
      }
    };

    // Adiciona dinamicamente o conteúdo correto ao payload
    return { ...data, ...(conteudoMapeado[mensagem.tipoConteudoMensagem as TipoConteudoMensagem] || {}) };
  }

  static async responderMensagem(mensagem: Mensagem, nomeCliente?: string) {

    await axios({
      method: "POST",
      url: `${URL_POST_REMETENTE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
      data: this.criarPayload(mensagem, nomeCliente),
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
}

export default MensagemController;
