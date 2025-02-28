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
    console.log('APIKEY autorizada');
    res.send(req.query['hub.challenge']);
  } else {
    console.log('Evento recebido:', req.body);
    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;