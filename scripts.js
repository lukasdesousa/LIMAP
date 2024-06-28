// Pega o valor recebido no input
let botao = document.querySelector('#botao')
let loading = document.querySelector('.loading')

botao.addEventListener('click', clique)

function clique() {
    let cidade = document.querySelector('#cidade').value
    // Verifica se o usuário inseriu algo
    if (cidade == '') {
        document.querySelector('.error').innerHTML = 'Insira uma cidade'
        document.querySelector('#cidade').style.border = '2px solid red'
        
    } else {
        buscarCidade(cidade)
        document.querySelector('.error').innerHTML = ''
        document.querySelector('#cidade').style.border = ''
        loading.style.display = 'block'
    }
}

// Busca dados do tempo de uma cidade

async function buscarCidade(cidade) {
    let resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade + '&appid=1e837bffae2c9a236779be07d19b1150&units=metric');
    let dados = await resposta.json();

    if (resposta.ok) {
        loading.style.display = 'none'
          document.querySelector('.city').style.display = 'block'
        cidadeCordenada(cidade, dados)
    } else {
        document.querySelector('#resultado').style.display = 'block'
        document.querySelector('#resultado').innerHTML = '<h2>Não foi possível encontrar a cidade :(<br><br> Tente procurar em inglês, exemp: Japan, ou procure por outra cidade.</h2>'
        document.querySelector('.city').style.display = 'none'
        document.querySelector('.componentes').style.display = 'none'
        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/2665/2665044.png" alt="Emojis"><br><br>'
        loading.style.display = 'none'
    }

}

// Coleta as coordenadas de uma cidade pelo nome

async function cidadeCordenada(cidade, dados) {
    let cidadeCord = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cidade + '&limit=1&appid=5489eb647ab61a33e53ebd5e2524bea8').then((resposta) => resposta.json())

    pol(cidadeCord, dados)
}

// Tranforma as cordenadas recebidas em dados de poluição do ar, através de busca.

async function pol(cidadeCord, dados) {
    let poluicao = await fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + cidadeCord[0].lat + '&lon=' + cidadeCord[0].lon + "&appid=5489eb647ab61a33e53ebd5e2524bea8").then((resposta) => resposta.json())

    colocarnaTela(poluicao, dados)
}

// Exibe na tela os valores recebidos

function colocarnaTela(poluicao, dados) {
    let components = document.querySelector('.componentes')
    components.innerHTML = '<h2>COMPONENTES NO AR: </h2><br>' + '<h2>Monóxido de Carbono (CO): </h2>' + '<h2>' + poluicao.list[0].components.co + '</h2>' + '<h3>µg/m³</h3>' + '<br>' + '<h2>Dióxido de Nitrogênio (NO): </h2>' + '<h2>' + poluicao.list[0].components.no + 'µg/m³' + '</h2>' + '<h3>µg/m³</h3>' + '<br>' + '<h2>Amônia (NH3):' + '</h2>' + '<h2>' + poluicao.list[0].components.nh3 + '</h2>' + '<h3>µg/m³</h3><br>' + '<h2>Ozônio (O3): </h2>' + '<h2>' + poluicao.list[0].components.o3 + '</h2>' + '<h3>µg/m³</h3>' + '<br>'


    if (poluicao.list[0].main.aqi === 1) {
        document.querySelector('#resultado').innerHTML = '<h2>Qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<h2>MUITO BOA</h2>' + '<h2>"Air Quality Index de nível 1" </h2>' + "<br>MUITO BOM para grupos sensíveis</h2>"


        document.querySelector('#resultado').style.display = 'block'

        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/6637/6637188.png" alt="Emojis">'

        components.style.display = 'block'
        components.style.background = 'yellowgreen'


    } else if (poluicao.list[0].main.aqi === 2) {
        document.querySelector('#resultado').innerHTML = '<h2>Qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<h2>BOA</h2>' + '<h2>"Air Quality Index de nível 2"</h2>' + "<br>BOM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'

        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/166/166516.png" alt="Emojis">'

        components.style.display = 'block'
        components.style.background = 'green'

    } else if (poluicao.list[0].main.aqi === 3) {
        document.querySelector('#resultado').innerHTML = '<h2>Qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<h2>MODERADA</h2>' + '<h2>"Air Quality Index de nível 3"</h2>' + "<h2>POUCO RUIM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'
        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/166/166527.png" alt="Emojis">'

        components.style.display = 'block'
        components.style.background = 'yellow'

    } else if (poluicao.list[0].main.aqi === 4) {
        document.querySelector('#resultado').innerHTML = '<h2>Qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<h2>RUIM. </h2>' + '<h2>"AQI (Air Quality Index) de nível 4"</h2>' + "<h2>Há componentes com quantidades elevadas que possam fazer mal.<br><br>RUIM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'

        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/1933/1933086.png" alt="Emojis">'

        components.style.display = 'block'
        components.style.background = 'orange'

    } else if (poluicao.list[0].main.aqi === 5) {
        document.querySelector('#resultado').innerHTML = '<h2>Qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<h2>MUITO RUIM</h2>' + '<h2>"Air Quality Index de nível 5"</h2>' + "<h2>MUITO RUIM para grupos sensíveis</h2>"

        document.querySelector('#imagens').innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/11269/11269963.png" alt="Emojis">'

        document.querySelector('#resultado').style.display = 'block'

        components.style.display = 'block'
        components.style.background = 'red'

    }

    tempo(dados)
}

// Dados na tela sobre o clima

function tempo(dados) {

    document.querySelector('.nomeCidade').innerHTML = 'Tempo em ' + dados.name + '<br>' + '<br>'

    document.querySelector('.temperatura').innerHTML = Math.floor(dados.main.temp) + 'ºC' + '<br>' + '<br>'

    document.querySelector('.umidade').innerHTML = 'Umidade de ' + dados.main.humidity + '%' + '<br><br>'
    

    document.querySelector('.icone').src = 'https://cdn-icons-png.flaticon.com/128/5903/5903939.png'

    document.querySelector('.vento').innerHTML = '<br>Velocidade do vento de: ' + dados.wind.speed + 'm/s (Metros por segundo)'

}

// Clique em dúvidas


document.querySelector('.comps1').addEventListener('click', dentro1)

function dentro1() {
    document.querySelector('.dentro1').style.display = 'block'
}

document.querySelector('.comps2').addEventListener('click', dentro2)

function dentro2() {
    document.querySelector('.dentro2').style.display = 'block'
}

document.querySelector('.comps3').addEventListener('click', dentro3)

function dentro3() {
    document.querySelector('.dentro3').style.display = 'block'
}

document.querySelector('.comps4').addEventListener('click', dentro4)

function dentro4() {
    document.querySelector('.dentro4').style.display = 'block'
}

// Fechar menus

document.querySelector('#botao1').addEventListener('click', fechar1)

function fechar1() {
    document.querySelector('.dentro1').style.display = 'none'
}

document.querySelector('#botao2').addEventListener('click', fechar2)

function fechar2() {
    document.querySelector('.dentro2').style.display = 'none'
}

document.querySelector('#botao3').addEventListener('click', fechar3)

function fechar3() {
    document.querySelector('.dentro3').style.display = 'none'
}

document.querySelector('#botao4').addEventListener('click', fechar4)

function fechar4() {
    document.querySelector('.dentro4').style.display = 'none'
}



