const express = require("express");
const cors = require("cors");
const app = express();
const QrCodePix = require("qrcode-pix");

app.use(cors());
app.use(express.json());

const validatePixParams = (req, res, next) => {
  const requiredFields = [
    "chave",
    "nome",
    "cidade",
    "transacaoid",
    "mensagem",
    "valor",
  ];

  for (let field of requiredFields) {
    if (!req.query[field]) {
      return res.status(400).json({ msg: `Faltou parâmetro {${field}}.` });
    }
  }

  next();
};

app.get("/", validatePixParams, async (req, res) => {
  try {
    let pix_params = {
      version: "01",
      key: req.query.chave.replace(/[\.\-+\/\(\) ]/gm, ""),
      name: req.query.nome,
      city: req.query.cidade,
      transactionId: req.query.transacaoid,
      message: req.query.mensagem,
      cep: null,
      value: Number(req.query.valor),
    };

    const qrCodePix = QrCodePix.QrCodePix(pix_params);

    let response = {
      copiaecola: qrCodePix.payload(),
      qrcode: await qrCodePix.base64(),
      qrcode_url:
        "https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" +
        qrCodePix.payload(),
    };

    switch (req.query.formato) {
      case "2":
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.send(response.copiaecola);
      case "3":
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.send(response.qrcode);
      case "4":
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.send(response.qrcode_url);
      default:
        return res.json(response);
    }
  } catch (e) {
    res.status(400).json({ msg: "Ocorreu um erro.", erro: e.message });
  }
});

app.listen(3333);
