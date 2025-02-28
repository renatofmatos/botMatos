import mongoose from "mongoose";

const urlDataBase = process.env.DATABASE_URL;

async function conectarAoBanco() {

    if (!urlDataBase) {
        console.error('String de conexão com o banco não definida!');
    } else {

        try {

            await mongoose.connect(urlDataBase);
            console.log('Conectado ao Banco de Dados!!');
            return mongoose.connection;
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
    }

};

export default conectarAoBanco;