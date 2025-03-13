import axios from "axios";
import { Mensagem } from "../models/mensagem.js";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const REMETENTE_ID = process.env.REMETENTE_ID;

class MensagemController {

    static async responderMensagem(mensagem: Mensagem) {
        await axios({
            method: "POST",
            url: `https://graph.facebook.com/v18.0/${REMETENTE_ID}/messages`,
            headers: {
              Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            },
            data: {
              messaging_product: "whatsapp",
              to: mensagem.destinatarioId,
              text: { body: mensagem.corpoMensagem },
            },
          });
    }
}

export default MensagemController;