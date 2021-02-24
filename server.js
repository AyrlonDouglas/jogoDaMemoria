const express = require('express');
const func = require('./functions')
// const nunjucks = require('nunjucks');

const app = express();
const port = 9000;

let gameHTML;
let arrayFundo;
let imagensPraTabela;
let imagens = [
    {
        'nome': 'css',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        'used': 0,
    },
    {
        'nome': 'javascript',
        'url': 'https://3.bp.blogspot.com/-PshpioeGXa4/W9Madr31sWI/AAAAAAAAFTA/PHfIde8sr2sh3EG3WbLyZw3dIT6ipO8VgCLcBGAs/s1600/javascript.png',
        'used': 0,
    },
    {
        'nome': 'php',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png',
        'used': 0,
    },
    {
        'nome': 'node',
        'url': 'https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png',
        'used': 0,
    },
    {
        'nome': 'c++',
        'url': 'https://1.bp.blogspot.com/-RV-HrvfYVGg/XThtxkUd0JI/AAAAAAAAVuA/lbH0GXvHbVAS_QhWnB3Cr6C8Fr5Q795LwCLcBGAs/s1600/c%252B%252B.jpg',
        'used': 0,
    },
    {
        'nome': 'java',
        'url': 'https://upload.wikimedia.org/wikipedia/pt/3/30/Java_programming_language_logo.svg',
        'used': 0,
    },
    {
        'nome': 'html',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        'used': 0,
    }
]
let linhas = 2;
let colunas = 4;

app.get("/", function (req, res) {
    let inicioHtml = ` <!DOCTYPE html>
                    <html lang="en">
                    
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="style.css">
                        <title>Memory Game</title> 
                    </head>
                    
                    <body>
                        <header>
                            <h1>Memory Game</h1>
                            <nav>
                                <ul>
                                    <li><a href="/">Start</a></li>
                                    <li><a href="#">Help</a></li>
                                </ul>
                            </nav>
                        </header>
                        <main>
                            <h2>Have fun with the best DemoDay game!</h2>
                            <p><a class="btn-grad" href="/game">Let's play!</a></p>
                    
                        </main>
                    
                    </body>
                    
                    </html>`
    res.send(inicioHtml)
});

app.get("/game", function (req, res) {


    imagensPraTabela = [];

    let imagemSelecionada = [];

    arrayFundo = [];

    let urlImagemTransparencia = 'https://i1.wp.com/www.deviante.com.br/wp-content/uploads/2018/11/HelloWorld.jpg?fit=1000%2C350'



    gameHTML = `<!DOCTYPE html>
                        <html lang="en">
                        
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <link rel="stylesheet" href="style.css">
                            <title>PLAY - Memory Game</title>
                        </head>
                        
                        <body>
                            <header>
                                <h1>Memory Game</h1>
                                <nav>
                                    <ul>
                                        <li><a href="/">Start</a></li>
                                        <li><a href="#">Help</a></li>
                                    </ul>
                                </nav>
                            </header>
                            <div class="button">
                                <button type="button">Reset</button>
                            </div>
                            <div class="tabela-jogo">`

    func.embaralharArray(imagens);

    func.selecionarImagens(((linhas * colunas) / 2), imagens, imagensPraTabela);

    func.embaralharArray(imagensPraTabela);

    func.criarArrayTransparencia((linhas * colunas), arrayFundo)

    gameHTML = func.montarTabela(linhas, colunas, gameHTML, imagensPraTabela, arrayFundo);

    gameHTML += '</div></body></html>';
    // console.log(req.query)
    res.send(gameHTML)
});


app.get("/gaming", (req, res) => {
    // let query = req.query.index

    // if (arrayFundo[req.query.index] == 0) {
    //     arrayFundo[req.query.index] = 1;

    // } else if (arrayFundo[req.query.index] == 1) {
    //     arrayFundo[req.query.index] = 0;
    // }



    console.log(req.query)
    console.log(arrayFundo)
    res.send(gameHTML)
})

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server is running in port: ' + port);
}) 