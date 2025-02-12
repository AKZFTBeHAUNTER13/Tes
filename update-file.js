const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' })
    };
  }

  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(event, (err, fields, files) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ message: 'Erro ao processar o upload', error: err.message })
        });
      }

      // Verifica se um arquivo foi enviado
      if (!files.file) {
        resolve({
          statusCode: 400,
          body: JSON.stringify({ message: 'Nenhum arquivo enviado' })
        });
        return;
      }

      // Caminho do PoisonHub
      const filePath = path.join(__dirname, '../../PoisonHub');

      // Lê o arquivo temporário enviado e substitui o conteúdo do PoisonHub
      fs.readFile(files.file.path, (readErr, data) => {
        if (readErr) {
          reject({
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao ler o arquivo', error: readErr.message })
          });
        }

        // Escreve o conteúdo do arquivo no PoisonHub
        fs.writeFile(filePath, data, (writeErr) => {
          if (writeErr) {
            reject({
              statusCode: 500,
              body: JSON.stringify({ message: 'Erro ao salvar o arquivo', error: writeErr.message })
            });
          }

          resolve({
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Arquivo atualizado com sucesso!' })
          });
        });
      });
    });
  });
};
