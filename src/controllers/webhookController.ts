import { Request, Response } from "express";
const apikey = process.env.API_KEY;
class WebhookController {

    static async validarToken(req: Request, res: Response) {
        try {
            // Verifique o token de verificação (veja o passo 3)
            if (
                req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === apikey
            ) {
                console.log('APIKEY autorizada');
                res.send(req.query['hub.challenge']);
            } else {
                console.log('APIKEY não autorizada:', req.body);
                res.sendStatus(200);
            }
        } catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    };

    static async mensagemRecebida(req: Request, res: Response) {
        console.log("Mensagem recebida!:", JSON.stringify(req.body, null, 2));
    };

};

export default WebhookController;
