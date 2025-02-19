const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.json({ error: "Nenhum arquivo enviado!" });

    const linkCDN = `https://seusite.com/uploads/${req.file.filename}`;
    res.json({ url: linkCDN });
});

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
