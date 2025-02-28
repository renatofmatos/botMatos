"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apikey = process.env.API_KEY;
class Mensagem {
    static async criarMensagem(req, res) {
        try {
            if (req.query['hub.mode'] === 'subscribe' &&
                req.query['hub.verify_token'] === apikey) {
                console.log('APIKEY autorizada');
                res.send(req.query['hub.challenge']);
            }
            else {
                console.log('Mensagem recebida:', req.body);
                res.sendStatus(200);
            }
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
}
exports.default = Mensagem;
//# sourceMappingURL=mensagemController.js.map