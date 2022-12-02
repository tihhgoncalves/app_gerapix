# Rocket Gera PIX

Criei uma API para simplicifcar o processo da geração do Código do PIX e, inclusive, gerar um QRCODE para pagamento.

## Como usar
Para tornar o processo o mais simples possível, você gera tudo direto pela URL da API. 
Porém, pode gerar em 3 formados:

**FORMATO 1 - JSON**
Retornará um objeto JSON com 2 parâmetros, um para o código do "Copia e Cola" e o outro com uma imagem de QRCODE já gerada.

Veja o exemplo:
```json
{
    "copiaecola":"00020126540014BR.GOV.BCB.PIX...",
    "qrcode":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk3g0YA...",
    "qrcode_url": "https://....."
}
```

**FORMATO 2 - CÓDIGO COPIA E COLA**
Esse retornará uma `string` direto com o código de "Copia e Cola", conforme o exemplo:
```txt
00020126540014BR.GOV.BCB.PIX...
```

**FORMATO 3 IMAGEM BASE64**
Esse retornará um texto com uma imagem com o QRCODE já gerado em base64, veja exemplo:
```txt
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANQAAADUCAYAAADk3g0YA...
```

**FORMATO 4 IMAGEM URL**
Esse retornará um texto com uma URL para uma imagem com o QRCODE já gerado , veja exemplo:
```txt
http://www....
```


## URL E PARÂMETROS
A url base é: `https://rocket-gerapix.vercel.app` e a lista de parâmetros que você deve passar junto a url, são:

- **formato** - Especifique o formato que quer que retorne (1 - Json, 2 - código e 3 - imagem)
 - **chave** - A sua chave PIX (pode ser e-mail, telefone, etc);
 - **nome** - Nome da pessoa que irá receber o PIX (por exemplo, o seu nome);
 - **cidade** - Cidade da pessoa que receberá o PIX (por exemplo, sua cidade);
 - **transacaoid** - Esse é um código de identificação do pagamento. Se você for usar ele em uma loja virtual, por exemplo, pode colocar o número do pedido;
 - **mensagem** - Mensagem que a pessoa que efetuar o pagamento irá ver como descrição ca cobrança;
 - **valor** - Valor do pix (somente com ponto separando o decilam. Ex.: 99.00);

 **Veja um exemplo de URL para testar a API:**

 [https://rocket-gerapix.vercel.app?chave=tihhgoncalves@gmail.com&nome=Tihh%20Goncalves&cidade=SAO%20PAULO&transacaoid=****&mensagem=Pizza&valor=99.00](https://rocket-gerapix.vercel.app?chave=tihhgoncalves@gmail.com&nome=Tihh%20Goncalves&cidade=SAO%20PAULO&transacaoid=****&mensagem=Pizza&valor=99.00)

_P.S.: O domínio `rocket.srv.br` é de propriedade da minha empresa, a [Rocket Produtora Digital](http://www.produtorarocket.com)._

## Autor
 - **@tihhgoncalves**
 - https://t.me/tihhgoncalves
