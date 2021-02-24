const express = require('express');
// const nunjucks = require('nunjucks');

const app = express();
const port = 9000;

app.set("view engine", "html");

// nunjucks.configure("views", {
//     express: server
// })

app.get("/", function (req, res) {
    var inicioHtml = ` <!DOCTYPE html>
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

    let imagensPraTabela = [];

    let imagemSelecionada = [];

    let arrayTransparencia = [];

    let urlImagemTransparencia = 'https://i1.wp.com/www.deviante.com.br/wp-content/uploads/2018/11/HelloWorld.jpg?fit=1000%2C350'

    // FUNCTION 

    function embaralharArray(arr) {
        let random1, random2, aux
        for (let i = 0; i < arr.length; i++) {
            random1 = Math.floor(Math.random() * arr.length);
            random2 = Math.floor(Math.random() * arr.length);
            aux = arr[random1];
            arr[random1] = arr[random2];
            arr[random2] = aux;
        }
    }

    function selecionarImagens(numero) {
        for (let i = 0; i < numero; i++) {
            imagensPraTabela.push(imagens[i]);
            imagensPraTabela.push(imagens[i]);
        }
        //console.log(imagensPraTabela)
    }

    // function embaralharImagensPraTabela(arr) {
    //     let random1, random2, aux
    //     for (let i = 0; i < arr.length; i++) {
    //         random1 = Math.floor(Math.random() * arr.length);
    //         random2 = Math.floor(Math.random() * arr.length);
    //         aux = arr[random1];
    //         arr[random1] = arr[random2];
    //         arr[random2] = aux;
    //     }
    //     //console.log(imagensPraTabela)
    // }

    function criarArrayTransparencia(numero) {
        for (let i = 0; i < numero; i++) {
            arrayTransparencia.push(0);
        }
        console.log(arrayTransparencia)
    }


    // function UrlImageSelecionada() {
    //     let numberRandom = Math.floor(Math.random() * imagensPraTabela.length);

    //     if (imagensPraTabela[numberRandom].used < 2) {

    //         imagensPraTabela[numberRandom].used++

    //         return imagensPraTabela[numberRandom].url

    //     } else if (imagensPraTabela[numberRandom].used >= 2) {
    //         console.log('retornou')
    //         return UrlImageSelecionada()
    //     }
    // }
    // render
    let gameHTML = `<!DOCTYPE html>
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

    function montarTabela(linhas, colunas) {

        embaralharArray(imagens);
        selecionarImagens((linhas * colunas) / 2);
        embaralharArray(imagensPraTabela);
        criarArrayTransparencia(linhas * colunas)

        gameHTML += '<table>';
        let indexImagensTabela = 0;

        for (let i = 0; i < linhas; i++) {
            gameHTML += '<tr>';

            for (let j = 0; j < colunas; j++) {
                // console.log('chamando')

                // let randomImage = UrlImageSelecionada();
                // gameHTML += `<td style="background-image:url(${randomImage})"></td>`;
                // gameHTML += `<td>
                //                 <img src="${randomImage}">
                //             </td>`; ${imagensPraTabela[indexImagensTabela]['url']}
                if (req.query['index']) {

                }
                gameHTML += `<td>
                                <a href='/game?index=${indexImagensTabela}'><img src="${imagensPraTabela[indexImagensTabela]['url']}"></a>
                             </td>`

                indexImagensTabela++

            }
            gameHTML += '</tr>'
        }
        gameHTML += '</table>'
    }
    montarTabela(2, 4);

    gameHTML += '</div></body></html>'
    console.log(req.query)

    res.send(gameHTML)
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Server is running in port: ' + port);
})