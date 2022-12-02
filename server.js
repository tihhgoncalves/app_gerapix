const express = require('express');
const cors = require('cors');
const app = express();
const QrCodePix = require('qrcode-pix');

/** Controle de rotas */
app.get('/', async (req, res) => {

    try{

        // daz verificação de todos os campos foram enviados
        if(!req.query.chave){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {chave}.' }));
        }

        if(!req.query.nome){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {nome}.' }));
        }

        if(!req.query.cidade){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {cidade}.' }));
        }

        if(!req.query.transacaoid){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {transacaoid}.' }));
        }

        if(!req.query.mensagem){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {mensagem}.' }));
        }

        if(!req.query.valor){
            res.status(400).send(JSON.stringify({ msg: 'Faltou parâmetro {valor}.' }));
        }

        // monta objeto final
        let pix_params = {
            version: '01',
            key:  req.query.chave.replace( /[\.\-+\/\(\) ]/gm, ''), //or any PIX key
            name:  req.query.nome,
            city:  req.query.cidade,
            transactionId:  req.query.transacaoid, //max 25 characters
            message:  req.query.mensagem,
            cep: null,
            value: Number(req.query.valor),
        };

        //gera o PIX
        const qrCodePix = QrCodePix.QrCodePix(pix_params);

        // json de retorno
        let json = {
            copiaecola: qrCodePix.payload(),
            qrcode: await qrCodePix.base64(),
            qrcode_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + qrCodePix.payload()
        }

        if(!req.query.formato || req.query.formato == 1){
            res.setHeader("Content-Type", 'application/json; charset=utf-8');
            res.status(200).send(JSON.stringify(json));
        
        } else if(req.query.formato == 2) {
            res.setHeader("Content-Type", 'text/plain; charset=utf-8');
            res.status(200).send(json.copiaecola);

        } else if(req.query.formato == 3) {
            res.setHeader("Content-Type", 'text/plain; charset=utf-8');
            res.status(200).send(json.qrcode);
        } else if(req.query.formato == 4) {
            res.setHeader("Content-Type", 'text/plain; charset=utf-8');
            res.status(200).send(json.qrcode_url);
        }


    }
    catch(e){
        res.status(400).send(JSON.stringify({ msg: 'Ocorreu um erro.', erro: e.message }));
    }

})

app.use(cors());
app.use(express.json());
app.listen(3333);