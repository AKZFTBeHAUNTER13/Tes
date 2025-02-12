const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  try {
    const formData = await parseFormData(event.body);

    const file = formData.file;
    if (!file) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Nenhum arquivo enviado' })
      };
    }

    // Atualize o arquivo PoisonHub com o conteúdo enviado
    const filePath = path.resolve(__dirname, '../PoisonHub');
    fs.writeFileSync(filePath, file);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Arquivo atualizado' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao processar o arquivo', error: error.message })
    };
  }
};

async function parseFormData(body) {
  return new Promise((resolve, reject) => {
    parse(body, (err, fields) => {
      if (err) reject(err);
      resolve(fields);
    });
  });
}
