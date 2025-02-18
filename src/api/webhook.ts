import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;
const apikey = process.env.API_KEY;

app.use(express.json());

app.post('/api/webhook', (req: Request, res: Response) => {
  // Verifique o token de verificação (veja o passo 3)
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === apikey
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    console.log('Evento recebido:', req.body); // Aqui você processará as mensagens
    res.sendStatus(200); // Responda sempre com 200 para o WhatsApp
  }
});

// app.listen(port, () => {
//   console.log(`Servidor iniciando`);
//   console.log(`Servidor rodando na porta ${port}`);
// });

export default app;