let botao = document.querySelector('#botao')
let input = document.querySelector('#cidade')
let resp = document.querySelector('#resposta')
let cityTemp = document.querySelector('.city')

// Api call

let apitempo = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

let apicordenada = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

let apipolui = 'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}'

let apikey = '5489eb647ab61a33e53ebd5e2524bea8'

botao.addEventListener('click', clique)

function clique() {
    let cidade = document.querySelector('#cidade').value

    buscarCidade(cidade)
}

async function buscarCidade(cidade) {
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade + '&appid=1e837bffae2c9a236779be07d19b1150&units=metric').then((resposta) => resposta.json())

    cidadeCordenada(cidade, dados)
}

async function cidadeCordenada(cidade, dados) {
    let cidadeCord = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cidade + '&limit=1&appid=5489eb647ab61a33e53ebd5e2524bea8').then((resposta) => resposta.json())

    pol(cidadeCord, dados)
}

async function pol(cidadeCord, dados) {
    let poluicao = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + cidadeCord[0].lat + '&lon=' + cidadeCord[0].lon + "&appid=5489eb647ab61a33e53ebd5e2524bea8").then((resposta) => resposta.json())

    colocarnaTela(poluicao, dados)
}

function colocarnaTela(poluicao, dados) {
    console.log(poluicao)
    let qualidad = document.querySelector('#resultado').innerHTML = '<h2> Cidade não encontrada :( <br> Tente procurar pelo nome da cidade em inglêS, exemplo: Japan.</h2>'

    let components = document.querySelector('.componentes')
    components.innerHTML = '<h2>COMPONENTES NO AR: </h2><br>' + '<h2>Monóxido de Carbono (CO): </h2>' + '<h2>' + poluicao.list[0].components.co + '</h2>' + 'µg/m³' + '<br>' + '<h2>Dióxido de Nitrogênio (NO): </h2>' + '<h2>' + poluicao.list[0].components.no + '</h2>' + 'µg/m³' + '<br>' + '<h2>Amônia (NH3): </h2>' + '<h2>' + poluicao.list[0].components.nh3 + '</h2>' + 'µg/m³' + '<br>' + '<h2>Ozônio (O3): </h2>' + '<h2>' + poluicao.list[0].components.o3 + '</h2>' + 'µg/m³'
    document.querySelector('.componentes')
    components.style.display = 'block'




    if (poluicao.list[0].main.aqi == 1) {
        document.querySelector('#resultado').innerHTML = '<h2>A qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<br>' + '<h2> ESTÁ MUITO BOA. </h2>' + '<h2>"AQI (Air Quality Index) de nível 1" </h2>' + "<h2>Não há uma quantidade de componentes que possam fazer mal.<br>MUITO BOM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'


    } else if (poluicao.list[0].main.aqi == 2) {
        document.querySelector('#resultado').innerHTML = '<h2>A qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<br>' + '<h2> ESTÁ BOA. </h2>' + '<h2>"AQI (Air Quality Index) de nível 1"</h2>' + "<h2>Há uma quantidade de componentes relativamente baixa.<br>BOM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'
        

    } else if (poluicao.list[0].main.aqi == 3) {
        document.querySelector('#resultado').innerHTML = '<h2>A qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<br>' + '<h2> ESTÁ MODERADA. </h2>' + '<h2>"AQI (Air Quality Index) de nível 1"</h2>' + "<h2>Há uma pequena quantidade de componentes que possam fazer mal.<br>POUCO RUIM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'
    } else if (poluicao.list[0].main.aqi == 4) {
        document.querySelector('#resultado').innerHTML = '<h2>A qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<br>' + '<h2> ESTÁ RUIM. </h2>' + '<h2>"AQI (Air Quality Index) de nível 1"</h2>' + "<h2>Há componentes com quantidades elevadas que possam fazer mal.<br>RUIM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'

    } else if (poluicao.list[0].main.aqi == 5) {
        document.querySelector('#resultado').innerHTML = '<h2>A qualidade do ar em </h2>' + '<h2>' + dados.name.toUpperCase() + ', ' + dados.sys.country + '.' + '</h2>' + '<br>' + '<br>' + '<h2> ESTÁ MUITO RUIM. </h2>' + '<h2>"AQI (Air Quality Index) de nível 5"</h2>' + "<h2>Há componentes com quantidades muito elevadas.<br>MUITO RUIM para grupos sensíveis</h2>"

        document.querySelector('#resultado').style.display = 'block'

        
    } else {
        document.querySelector('#resultado').innerHTML = '<h2> Cidade não encontrada :( <br> Tente procurar por outra cidade</h2>'

    }
    console.log(dados)

    tempo(dados)
}

function tempo(dados) {

document.querySelector('.nomeCidade').innerHTML = 'Tempo em ' + dados.name + '<br>' + '<br>'

document.querySelector('.temperatura').innerHTML = Math.floor(dados.main.temp) + 'ºC' + '<br>' + '<br>'

document.querySelector('.umidade').innerHTML = 'Umidade de ' + dados.main.humidity + '%' + '<br>'

document.querySelector('.icone').src = 'https://openweathermap.org/img/wn/' + dados.weather[0].icon + '.png'

document.querySelector('.vento').innerHTML = 'Velocidade do vento de: ' + dados.wind.speed + 'm/s (Metros por segundo)'

}

