const fetch = require('node-fetch');

const GITHUB_TOKEN = 'SEU_NOVO_TOKEN_AQUI';
const REPO_OWNER = 'AKZFTBeHAUNTER13';
const REPO_NAME = 'Tes';
const FILE_PATH = 'PoisonHub';
const BRANCH = 'main';

async function updateFile(newContent) {
  try {
    // 1️⃣ Obter o SHA do arquivo atual
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const getFileResponse = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!getFileResponse.ok) {
      throw new Error('Erro ao buscar o arquivo no GitHub.');
    }

    const fileData = await getFileResponse.json();
    const sha = fileData.sha; // Hash do último commit do arquivo

    // 2️⃣ Atualizar o arquivo no GitHub
    const updateFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const updateResponse = await fetch(updateFileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Atualizando PoisonHub',
        content: Buffer.from(newContent).toString('base64'), // Converte para Base64
        sha: sha, // Mantém histórico do arquivo
        branch: BRANCH,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Erro ao atualizar o arquivo no GitHub.');
    }

    console.log('Arquivo atualizado com sucesso!');
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Exemplo de uso: Substituir o conteúdo do PoisonHub
updateFile('print("Novo conteúdo do PoisonHub")');
