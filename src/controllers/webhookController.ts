import { Request, Response } from "express";
import { Mensagem } from "../models/mensagem.js";
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

        const destinatarioId: string = req.body.entry?.[0]?.changes[0]?.value?.metadata?.display_phone_number;
        const remetenteId: string = req.body.entry?.[0]?.changes[0]?.value?.messages[0]?.from;
        const nomeContato: string = req.body.entry?.[0]?.changes[0]?.value?.contacts[0]?.profile.name;

        const dataRecebimentoMensagem: Date = new Date(Number(req.body.entry?.[0]?.changes[0]?.value?.messages[0]?.timestamp) * 1000);
        const corpoMensagem: string = req.body.entry?.[0]?.changes[0]?.value?.messages[0]?.text.body;
        const tipoConteudoMensagem: string = req.body.entry?.[0]?.changes[0]?.value?.messages[0]?.type;

        const atendimentoProcessado = AtendimentoService.processarMensagem(
            remetenteId,
            destinatarioId,
            nomeContato,
            dataRecebimentoMensagem,
            corpoMensagem,
            tipoConteudoMensagem
        );

        res.sendStatus(200);
    };
};

export default WebhookController;