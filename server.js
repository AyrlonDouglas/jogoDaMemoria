const express = require("express");
const func = require("./functions");

const app = express();
const port = 9000;

// Players
let player1;
let player2;
let playercurrent;
let errosPlayer1;
let errosPlayer2;
let player1clicks;
let player2clicks;

// images
let arrayFundo = [];
let imagensPraTabela = [];
let fundoDaCarta =
  "https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/free-flyers-background-png.png?resize=696%2C696&ssl=1";
let imagens = [
  {
    nome: "css",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png",
    used: 0,
  },
  {
    nome: "javascript",
    url: "https://3.bp.blogspot.com/-PshpioeGXa4/W9Madr31sWI/AAAAAAAAFTA/PHfIde8sr2sh3EG3WbLyZw3dIT6ipO8VgCLcBGAs/s1600/javascript.png",
    used: 0,
  },
  {
    nome: "php",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1200px-PHP-logo.svg.png",
    used: 0,
  },
  {
    nome: "node",
    url: "https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png",
    used: 0,
  },
  {
    nome: "c++",
    url: "https://1.bp.blogspot.com/-RV-HrvfYVGg/XThtxkUd0JI/AAAAAAAAVuA/lbH0GXvHbVAS_QhWnB3Cr6C8Fr5Q795LwCLcBGAs/s1600/c%252B%252B.jpg",
    used: 0,
  },
  {
    nome: "java",
    url: "https://upload.wikimedia.org/wikipedia/pt/3/30/Java_programming_language_logo.svg",
    used: 0,
  },
  {
    nome: "html",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png",
    used: 0,
  },
  {
    nome: "python",
    url: "https://camo.githubusercontent.com/888e388801f947dec7c3d843942c277af25fe2b1aed1821542c4e711f210312a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67",
    used: 0,
  },
  {
    nome: "vue",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
    used: 0,
  },
  {
    nome: "angular",
    url: "https://img2.gratispng.com/20181108/glf/kisspng-angularjs-in-action-javascript-application-softwar-angular-products-just-stickers-just-stickers-5be4f7a1467125.6693886615417322572885.jpg",
    used: 0,
  },
];

// table/game
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
                                    <li><a href="/authors">Authors</a></li>
                                </ul>
                            </nav>
                        </header>`;
let queryVariavels;
let gameHTML;
let linhas = 2;
let colunas = 4;

app.get("/", (req, res) => {
  let inicioHtml = layoutBase;
  inicioHtml += ` <main>
                        <h2>Have fun with the best DemoDay game!</h2>
                        <p><a class="btn-grad" href="/players">Let's play!</a></p>
                    </main></body></html>`;
  res.send(inicioHtml);
});

app.get("/authors", (req, res) => {
  let html = layoutBase;
  html += `<ul class="authors">
                <li>Ayrlon Vilarim</li>
             </ul>
        </body></html>
    `;
  res.send(html);
});

app.get("/level", (req, res) => {
  player1 = req.query.player1;
  player2 = req.query.player2;
  console.log(player1, player2);
  html = layoutBase;

  html += `<ul>
                <a href="/game?linLevel=2&colLevel=4"><li class="btn-grad level levelEasy">Easy</li></a>
                <a href="/game?linLevel=2&colLevel=6"><li class="btn-grad level levelAverage">Average</li></a>
                <a href="/game?linLevel=4&colLevel=5"><li class="btn-grad level">Hard</li></a>
            </ul></body></html> `;
  res.send(html);
});

app.get("/players", (req, res) => {
  player1 = "";
  player2 = "";

  let html = layoutBase;
  html += `<div class="container-formulario">

                <form action='/level' method="GET">
                    <fieldset>
                        <legend>Player's name</legend>

                        <div class="label">
                            <label for="player1">Player 1</label>
                            <input type="text" name="player1" id="player1">
                        </div>
                        <div class="label">
                            <label for="player2">Player 2</label>
                            <input type="text" name="player2" id="player2">
                        </div>

                        <input class="button-submit" type="submit" value="Submit">
                        
                    </fieldset>
                </form>
            </div>`;

  res.send(html);
});

app.get("/game", (req, res) => {
  imagensPraTabela = [];
  arrayFundo = [];
  errosPlayer1 = 0;
  errosPlayer2 = 0;
  player1clicks = 0;
  player2clicks = 0;
  playercurrent = player1;

  queryVariavels = req.query;
  linhas = req.query.linLevel;
  colunas = req.query.colLevel;

  gameHTML = layoutBase;
  gameHTML += `<p class="pontuacao">${player1} hits = ${Math.floor(
    (player1clicks - errosPlayer1 * 2) / 2
  )}, ${player2} hits = ${Math.floor(
    (player2clicks - errosPlayer2 * 2) / 2
  )}</p>
                 <h2 class="turno">
                    The player ${playercurrent} starts the game
                 </h2>
                 <div class="tabela-jogo">`;

  func.embaralharArray(imagens);

  func.selecionarImagens((linhas * colunas) / 2, imagens, imagensPraTabela);

  func.embaralharArray(imagensPraTabela);

  func.criarArrayTransparencia(linhas * colunas, arrayFundo);

  gameHTML = func.montarTabela(
    linhas,
    colunas,
    gameHTML,
    imagensPraTabela,
    arrayFundo,
    fundoDaCarta,
    queryVariavels
  );

  gameHTML += "</div></body></html>";

  res.send(gameHTML);
});

app.get("/gaming", (req, res) => {
  let gamingHTML = layoutBase;
  queryVariavels = req.query;

  if (arrayFundo[req.query.index] == 0) {
    arrayFundo[req.query.index] = 1;
  }

  if (playercurrent == player1) {
    player1clicks++;
  } else {
    player2clicks++;
  }

  let zerarArray = func.zerarArrayFundo(arrayFundo);

  if (zerarArray) {
    if (playercurrent == player1) {
      player1clicks--;
      errosPlayer1++;
      playercurrent = player2;
    } else {
      player2clicks--;
      errosPlayer2++;
      playercurrent = player1;
    }
  }

  gamingHTML += ` <p class="pontuacao">
                        ${player1} hits = ${Math.floor(
    (player1clicks - errosPlayer1 * 2) / 2
  )},
                        ${player2} hits = ${Math.floor(
    (player2clicks - errosPlayer2 * 2) / 2
  )}
                    </p>
                    <h2 class="turno">
                        It's ${playercurrent}'s turn!
                    </h2>`;

  func.verificarCartasIguais(arrayFundo, imagensPraTabela);

  let renderGamingHTML = func.montarTabela(
    linhas,
    colunas,
    gamingHTML,
    imagensPraTabela,
    arrayFundo,
    fundoDaCarta,
    queryVariavels
  );

  console.log(arrayFundo);

  let venceu = func.vencedor(arrayFundo);

  if (venceu) {
    res.redirect("/victory");
  } else {
    res.send(renderGamingHTML);
  }
});

app.get("/victory", (req, res) => {
  let html = layoutBase;
  let winner;
  let hits;
  let player1Hits = (player1clicks - errosPlayer1 * 2) / 2;
  let player2Hits = (player2clicks - errosPlayer2 * 2) / 2;

  if (player1Hits > player2Hits) {
    winner = player1;
    hits = player1Hits;

    html += `<div class="victory">
                <h2>The winner is ${winner} with ${hits} hits!</h2>
                <p><a class="btn-grad" href="/players">Let's play Again?</a></p>
                
            </div></body></html>`;
  } else if (player1Hits < player2Hits) {
    winner = player2;
    hits = player2Hits;

    html += `<div class="victory">
                <h2>The winner is ${winner} with ${hits} hits!</h2>
                <p><a class="btn-grad" href="/players">Let's play Again?</a></p>
            </div></body></html>`;
  } else {
    hits = player1Hits;

    html += `<div class="victory">
                <h2>Players ${player1} and ${player2} drew with number of hits ${hits}!</h2>
                <p><a class="btn-grad" href="/players">Let's play Again?</a></p>
            </div></body></html>`;
  }

  res.send(html);
});

app.use(express.static("public"));

app.listen(port, function () {
  console.log("Server is running in port: " + port);
});
