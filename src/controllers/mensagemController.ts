import { Request, Response } from "express";

const apikey = process.env.API_KEY;
class Mensagem {

    static async criarMensagem(req: Request, res: Response) {
        try {
            // Verifique o token de verificação (veja o passo 3)
            if (
                req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === apikey
            ) {
                console.log('APIKEY autorizada');
                res.send(req.query['hub.challenge']);
            } else {
                console.log('Mensagem recebida:', req.body);
                res.sendStatus(200);
            }
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };
}

export default Mensagem;