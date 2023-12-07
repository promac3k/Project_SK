// Importa o módulo nodemailer, que é uma biblioteca para enviar emails usando Node.js
const nodemailer = require("nodemailer");

// Cria um objeto de transporte que será usado para enviar emails
// O método createTransport do nodemailer é usado para criar o objeto de transporte
// As opções de transporte são definidas como um objeto que contém o serviço de email a ser usado (por exemplo, 'gmail') e as credenciais de autenticação
const transporter = nodemailer.createTransport({
    // O serviço de email a ser usado, que é lido da variável de ambiente EMAIL_SERVICE
    service: process.env.EMAIL_SERVICE,
    // As credenciais de autenticação
    auth: {
        // O endereço de email a ser usado para enviar emails, que é lido da variável de ambiente EMAIL_TO
        user: process.env.EMAIL_TO,
        // A senha do endereço de email, que é lido da variável de ambiente EMAIL_PASS
        pass: process.env.EMAIL_PASS
    }
});

// Exporta o objeto de transporte para que ele possa ser importado e usado em outros arquivos
module.exports = transporter;