const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Criar pasta "uploads" se não existir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do multer para armazenar os arquivos
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Rota para upload de arquivos
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.json({ error: "Nenhum arquivo enviado!" });

    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// Servir arquivos estáticos na pasta "uploads"
app.use("/uploads", express.static("uploads"));

// Iniciar o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
