"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mensagem {
    static async criarMensagem(req, res) {
        try {
            console.log('Mensagem recebida: ', req.body);
            res.status(200).send('Mensagem recebida');
        }
        catch (error) {
            res.status(500).json({ message: `Falha na requisição: ${error}` });
        }
    }
    ;
}
exports.default = Mensagem;
//# sourceMappingURL=mensagemController.js.map