const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.WHATSAPP_TOKEN;
const REMETENTE_ID = process.env.REMETENTE_ID;
const destinatario = '5561993348881'

async function sendWhatsAppMessage(to: string) {
  const url = `https://graph.facebook.com/v21.0/${REMETENTE_ID}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: 'teste',
      language: {
        code: 'pt_BR'
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'text',
              parameter_name: 'usuario_remetente', // Nome *exato* do parâmetro no template
              text: 'Renato' // Valor para o parâmetro
            }
          ]
        }
      ]
    },
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Message sent:', response.data);
  } catch (error: any) {
    console.log(JSON.stringify(payload, null, 2));
    console.error('Error sending message:', error.response?.data || error.message);
  }
}

sendWhatsAppMessage(destinatario);