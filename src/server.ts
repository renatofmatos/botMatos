import 'dotenv/config'
import app from './api/app.js'
import conectarAoBanco from './config/dbConnect.js';

const port = process.env.PORT;

async function iniciarServidor() {
    let conexao
    try {
        if (!conexao) {
            await conectarAoBanco();
        };
        
        if (conexao) {

            app.listen(port, () => {
                console.log(`Servidor escutando na porta ${port}`);
            })

        } else {
            console.error('Falha ao iniciar o servidor');
        }

    } catch (error) {
        console.error('Erro geral na conexão: ', error);
    }
};

iniciarServidor();