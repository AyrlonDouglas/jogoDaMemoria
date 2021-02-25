const express = require('express');
const func = require('./functions')
// const nunjucks = require('nunjucks');

const app = express();
const port = 9000;

let layoutBase = `<!DOCTYPE html>
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
                                    <li><a href="/authors">Authors</a></li>
                                </ul>
                            </nav>
                        </header>`;
let queryVariavels;
let gameHTML;
let arrayFundo;
let imagensPraTabela;
let contadorClicks;
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
    },
    {
        'nome': 'python',
        'url': 'https://camo.githubusercontent.com/888e388801f947dec7c3d843942c277af25fe2b1aed1821542c4e711f210312a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67',
        'used': 0,
    },
    {
        'nome': 'vue',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
        'used': 0,
    },
    {
        'nome': 'angular',
        'url': 'https://img2.gratispng.com/20181108/glf/kisspng-angularjs-in-action-javascript-application-softwar-angular-products-just-stickers-just-stickers-5be4f7a1467125.6693886615417322572885.jpg',
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
                                    <li><a href="/authors">Authors</a></li>
                                </ul>
                            </nav>
                        </header>
                        <main>
                            <h2>Have fun with the best DemoDay game!</h2>
                            <p><a class="btn-grad" href="/level">Let's play!</a></p>
                    
                        </main>
                    
                    </body>
                    
                    </html>`
    res.send(inicioHtml)
});
app.get("/authors", (req, res) => {
    let html = layoutBase;
    html += `
    <ul class="authors">
        <li>Ayrlon Vilarim</li>
        <li>Gustavo Cesar</li>
        <li>Flávio Cesar</li>
        <li>Henrique R.</li>
        <li>Herica Suassuna</li>
    </ul>
    `
    res.send(html)
})

app.get("/game", function (req, res) {
    contadorClicks = 0;
    queryVariavels = req.query
    linhas = req.query.linLevel;
    colunas = req.query.colLevel;

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
                                        <li><a href="/authors">Authors</a></li>
                                    </ul>
                                </nav>
                            </header>
                             <div class="tabela-jogo">`

    func.embaralharArray(imagens);

    func.selecionarImagens(((linhas * colunas) / 2), imagens, imagensPraTabela);

    func.embaralharArray(imagensPraTabela);

    func.criarArrayTransparencia((linhas * colunas), arrayFundo)

    gameHTML = func.montarTabela(linhas, colunas, gameHTML, imagensPraTabela, arrayFundo, queryVariavels);

    gameHTML += '</div></body></html>';
    //let gamingHTML = gameHTML
    // console.log(req.query)
    res.send(gameHTML)
});
app.get('/level', (req, res) => {

    html = layoutBase;
    html += `<ul>
                <a href="/game?linLevel=2&colLevel=4"><li class="btn-grad level levelEasy">Easy</li></a>
                <a href="/game?linLevel=2&colLevel=6"><li class="btn-grad level levelAverage">Average</li></a>
                <a href="/game?linLevel=4&colLevel=5"><li class="btn-grad level">Hard</li></a>
            </ul> `
    html += `</body></html>`
    res.send(html)
})


app.get("/gaming", (req, res) => {

    contadorClicks++

    if (arrayFundo[req.query.index] == 0) {
        arrayFundo[req.query.index] = 1;
    }

    let gamingHTML = layoutBase;
    gamingHTML += `<p>Clicks :${contadorClicks}</p>`
    queryVariavels = req.query;

    let zerarArray = func.zerarArrayFundo(arrayFundo)


    let renderGamingHTML = func.montarTabela(linhas, colunas, gamingHTML, imagensPraTabela, arrayFundo, queryVariavels);


    func.vencedor(arrayFundo)
    //console.log(req.query)
    console.log(arrayFundo)
    // if (zerarArray) {
    //     res.redirect('/gaming')
    // }
    res.send(renderGamingHTML)
})

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server is running in port: ' + port);
}) 