module.exports = {

    embaralharArray: function embaralharArray(arr) {
        let random1, random2, aux
        for (let i = 0; i < arr.length; i++) {
            random1 = Math.floor(Math.random() * arr.length);
            random2 = Math.floor(Math.random() * arr.length);
            aux = arr[random1];
            arr[random1] = arr[random2];
            arr[random2] = aux;
        }
        //console.log('embaralhou ' + `arr`)
    },

    selecionarImagens: function selecionarImagens(numero, Imagens, imagensPraTabela) {
        for (let i = 0; i < numero; i++) {
            imagensPraTabela.push(Imagens[i]);
            imagensPraTabela.push(Imagens[i]);
        }
        console.log('selecionou')
        //console.log(imagensPraTabela)
    },

    criarArrayTransparencia: function criarArrayTransparencia(numero, arrayFundo) {
        for (let i = 0; i < numero; i++) {
            arrayFundo.push(0);
        }
        //console.log(arrayTransparencia)
    },

    // render

    montarTabela: function montarTabela(linhas, colunas, html, imagensPraTabela, arrayFundo, query) {
        let gameHTML = html;
        let indexImagensTabela = 0;
        let planoFundo = "https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2019/01/free-flyers-background-png.png?resize=696%2C696&ssl=1"

        for (let i = 0; i < arrayFundo.length; i++) {
            for (let j = 0; j < arrayFundo.length; j++) {
                if (arrayFundo[i] == 1 && arrayFundo[j] == 1 && i != j) {
                    if (imagensPraTabela[i]['nome'] == imagensPraTabela[j]['nome']) {
                        arrayFundo[i] = 2;
                        arrayFundo[j] = 2
                    }
                }
            }
        }

        gameHTML += '<div class="tabela-jogo"><table>';

        for (let i = 0; i < linhas; i++) {

            gameHTML += '<tr>';

            for (let j = 0; j < colunas; j++) {
                if (arrayFundo[indexImagensTabela] == 1) {

                    gameHTML += `<td><img src="${imagensPraTabela[indexImagensTabela]['url']}"></td>`
                    indexImagensTabela++
                }
                else if (arrayFundo[indexImagensTabela] == 2) {

                    gameHTML += `<td><img src="${imagensPraTabela[indexImagensTabela]['url']}"></td>`
                    indexImagensTabela++

                }
                else {
                    gameHTML += `<td ><a href='/gaming?index=${indexImagensTabela}&lin=${i}&col=${j}'><img src='${planoFundo}' alt='FUNDO'></a></td>`
                    indexImagensTabela++
                }
            }
            gameHTML += '</tr>'
        }
        gameHTML += '</table></div>'

        return gameHTML
    },

    zerarArrayFundo: function zerarArrayFundo(array) {
        let count1 = 0;
        let zerado = false;


        for (let i = 0; i < array.length; i++) {
            if (array[i] == 1) {
                count1++;
            }

            if (count1 > 2) {
                zerado = true
                for (let j = 0; j < array.length; j++) {
                    if (array[j] == 1) {
                        array[j] = 0;
                    }
                }
            }
        } return zerado
    },
    vencedor: function vencedor(arr) {
        let venceu = true;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != 2) {
                venceu = false;
            }
        }
        if (venceu) {
            console.log('VENCEU')
        }
    }
}