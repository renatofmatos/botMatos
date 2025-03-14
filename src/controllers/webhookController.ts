import { Request, Response } from "express";
import { AtendimentoService } from "../services/atendimentoService.js";

const apikey = process.env.API_KEY;

class WebhookController {

    static async validarToken(req: Request, res: Response) {
        try {
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
        const message = await req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
        const dataRecebimentoMensagem: Date = new Date(Number(message.timestamp) * 1000);
        const corpoMensagem: string = message.text.body;
        const remetenteId: string = message.from;
        const tipoConteudoMensagem: string = message.type;
        const mensagemIdSistemaOrigem: string = message.id;
        const destinatarioId: string = await req.body.entry?.[0]?.changes[0]?.value?.metadata?.display_phone_number;
        const nomeContato: string = await req.body.entry?.[0]?.changes[0]?.value?.contacts[0]?.profile.name;

        const atendimentoProcessado = AtendimentoService.processarMensagem(
            remetenteId,
            destinatarioId,
            nomeContato,
            dataRecebimentoMensagem,
            corpoMensagem,
            tipoConteudoMensagem,
            mensagemIdSistemaOrigem
        );

        res.sendStatus(200);
    };
};

export default WebhookController;