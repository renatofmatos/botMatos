import express from 'express';

const app = express();

app.get('/hello', (req, res) => { // Use os tipos padrão do Node.js: req, res
  res.status(200).send('Olá, mundo! Esta é uma API de teste GET.');
});

export default app;