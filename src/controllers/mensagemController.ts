import axios from "axios";
import { Mensagem } from "../models/mensagem.js";
import { TipoConteudoMensagem } from "../config/enum.js";
import { text } from "stream/consumers";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const URL_POST_REMETENTE_ID = process.env.URL_POST_REMETENTE_ID;

class MensagemController {

  private static criarPayload(mensagem: Mensagem) {
    let data: Record<string, any> = {
      messaging_product: "whatsapp",
      to: mensagem.destinatarioId
    };

    // Mapeamento do tipo de conteúdo para os atributos corretos
    const conteudoMapeado: Record<TipoConteudoMensagem, any> = {
      [TipoConteudoMensagem.texto]: { text: { body: mensagem.corpoMensagem } },
      [TipoConteudoMensagem.template]: {  type: "template",
                                          template: { name: mensagem.corpoMensagem,
                                          language: {code: "pt_BR"}
                                           } }
    };

    // Adiciona dinamicamente o conteúdo correto ao payload
    return { ...data, ...(conteudoMapeado[mensagem.tipoConteudoMensagem as TipoConteudoMensagem] || {}) };
  }

  static async responderMensagem(mensagem: Mensagem) {

    await axios({
      method: "POST",
      url: `${URL_POST_REMETENTE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
      data: this.criarPayload(mensagem),
    });
  }
}

export default MensagemController;
