const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = 3000;

// Token configurado na Kivano
const WEBHOOK_TOKEN = "wppviptokensecreto";

// Middleware para processar requisições com JSON
app.use(bodyParser.json());
app.use(cors())
// Rota para receber o webhook
app.post('/webhook', (req, res) => {
    const token = req.headers['x-webhook-token']; // Header com o token
    const payload = req.body; // Dados enviados pelo webhook

    // Verifica se o token é válido
    if (token !== WEBHOOK_TOKEN) {
        console.log("Token inválido:", token);
        return res.status(403).json({ message: "Token inválido" });
    }

    // Log dos dados recebidos
    console.log("Webhook recebido com sucesso:", payload);

    // Retorna resposta para o webhook
    res.status(200).json({ message: "Webhook recebido com sucesso" });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
