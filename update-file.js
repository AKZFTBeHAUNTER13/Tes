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
    // O Netlify Functions recebe o corpo da requisição como texto, então pegamos direto o body
    const newContent = event.body;

    if (!newContent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Nenhum conteúdo recebido' })
      };
    }

    // Caminho do arquivo PoisonHub (mude isso se necessário)
    const filePath = path.join(__dirname, '../../PoisonHub');

    // Sobrescreve o arquivo PoisonHub com o novo conteúdo
    fs.writeFileSync(filePath, newContent, 'utf8');

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
