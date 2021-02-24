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

    montarTabela: function montarTabela(linhas, colunas, html, imagensPraTabela, arrayFundo, index) {
        let gameHTML = html;
        let indexImagensTabela = 0;
        let planoPreto = 'https://i.pinimg.com/736x/d6/39/2e/d6392eb6376d3b147fea9933996ddb4a.jpg';

        gameHTML += '<table>';

        for (let i = 0; i < linhas; i++) {
            gameHTML += '<tr>';
            for (let j = 0; j < colunas; j++) {
                if (arrayFundo[index] == 0) {
                    gameHTML += `<td >
                                    <a href='/gaming?index=${indexImagensTabela}&lin=${i}&col=${j}'><img class="hidden" src="${planoPreto}"></a>
                                </td>`
                    indexImagensTabela++

                } else {
                    gameHTML += `<td>
                                    <a href='/gaming?index=${indexImagensTabela}&lin=${i}&col=${j}'><img src="${imagensPraTabela[indexImagensTabela]['url']}"></a>
                                </td>`
                    indexImagensTabela++
                }

            }
            gameHTML += '</tr>'
        }
        gameHTML += '</table>'
        return gameHTML
    },
}