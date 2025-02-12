const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  try {
    // Verifica se o body contém um arquivo
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Nenhum arquivo enviado' })
      };
    }

    // Define o caminho do arquivo PoisonHub
    const filePath = path.join(__dirname, '../../PoisonHub');

    // Escreve o novo conteúdo apagando o antigo
    fs.writeFileSync(filePath, event.body, 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Arquivo atualizado com sucesso!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao atualizar o arquivo', error: error.message })
    };
  }
};
