import { json, Application, Request, Response } from "express";
import meiosDecontato from './meiosDeContatoRoutes.js';
import clientes from './clientesRoutes.js';
import mensagens from "./mensagemRoutes.js";
import webhook from "./webhookRoutes.js";

const routes = (app: Application): void => {
    app.route('/').get((req: Request, res: Response) => {
        res.status(200).send('Matos Tecnologia');
    });
    app.use(json(), clientes, meiosDecontato, mensagens, webhook);
};

export default routes;
