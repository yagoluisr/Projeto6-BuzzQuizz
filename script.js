let conteudoTela = document.querySelector('.conteudo');
let arrayQuizzes;
let quizzEscolhido;
let idPerguntaAtual = 0;
let pontuacao = 0;
let porcentagem = 0;


function buscarQuizzes(){

    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(renderizarQuizzes);
    console.log(promise)
}

buscarQuizzes();

function renderizarQuizzes(resposta){
    arrayQuizzes = resposta.data;
    console.log(arrayQuizzes)

    let galeriaQuizz = document.querySelector(".galeria");
    
    for (let i = 0; i < arrayQuizzes.length; i++ ){

            galeriaQuizz.innerHTML += `
            <div class="quizz2" onclick="obterQuizz(${arrayQuizzes[i].id})">
                <div class="degrade">sdfgsdfg</div>
                <img src="${arrayQuizzes[i].image}">
                <span>${arrayQuizzes[i].title}</span>
            </div>
            `
    }
}

function obterQuizz(id){

    let promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);
    promise.then(exibirQuizz);
    console.log(promise);
}


function exibirQuizz(objeto) {
    
    quizzEscolhido = objeto.data;

    conteudoTela.innerHTML = '';

    gerarBanner(quizzEscolhido);

    gerarPerguntas(quizzEscolhido);
}

function gerarBanner(quizzEscolhido) {
    conteudoTela.innerHTML += `
        <div>
            <div class="bannerQuizz">
                <img src="${quizzEscolhido.image}">
                <p>${quizzEscolhido.title}</p>
            </div>
        </div>
    `;
}

function gerarPerguntas(quizzEscolhido) {
    for (let i = 0; i < quizzEscolhido.questions.length; i++) {
        
        conteudoTela.innerHTML += `
        <div class="quizzPergunta">
            <div class="pergunta${i} perguntas">
                <p>${quizzEscolhido.questions[i].title}</p>
            </div>
            <div class="opcoes${i} opcoes">
            </div>
        </div>`;
        
        gerarOpcoes(quizzEscolhido, i);
        document.querySelector(`.pergunta${i}`).style.backgroundColor = `${quizzEscolhido.questions[i].color}`;
    }

    conteudoTela.innerHTML += `
        <div class="quizzPergunta caixa-resultado escondido"></div>
    `;
}

function gerarOpcoes(quizzEscolhido, idQuestions) {
    let divOpcoes = document.querySelector(`.conteudo .opcoes${idQuestions}`);

    let respostas = quizzEscolhido.questions[idQuestions].answers;
    respostas = respostas.sort(embaralhar);

    for (let i = 0; i < respostas.length; i++) {

        if (respostas[i].isCorrectAnswer) {
            divOpcoes.innerHTML += `
            <div class="opcao correta" onclick="selecionarOpcao(this)">
                <img src="${respostas[i].image}">
                <p>${respostas[i].text}</p>
            </div>
        `;
        }
        else {
            divOpcoes.innerHTML += `
            <div class="opcao" onclick="selecionarOpcao(this)">
                <img src="${respostas[i].image}">
                <p>${respostas[i].text}</p>
            </div>
        `;
        }
    }

    return divOpcoes;
}

function gerarCaixaResultado() {

    let caixaPerguta = document.querySelector(".quizzPergunta.caixa-resultado");

    let nivel = quizzEscolhido.levels[verificarNivel()];

    let titulo = nivel.title;
    let img = nivel.image;
    let descricao = nivel.text;

    caixaPerguta.innerHTML = `
            <div class="pergunta${quizzEscolhido.questions.length}">
                <p>${porcentagem}% de acerto: ${titulo}</p>
            </div>
            <div class="caixa-conteudo">
                <img src="${img}">
                <p>${descricao}</p>
            </div>
    `;
}

function selecionarOpcao(opcaoEscolhida) {
    let opcoes = opcaoEscolhida.parentNode.querySelectorAll(".opcao");
    let jaEscolhida = opcaoEscolhida.parentNode.querySelector(".opcao-nao-selecionada");

    if (jaEscolhida === null && ehPerguntaAtual(opcaoEscolhida)) {
        opcoes.forEach(element => {
            if (element !== opcaoEscolhida) {
                element.classList.add("opcao-nao-selecionada");
            }
        });

        corrigirResposta(opcaoEscolhida, opcoes);
    }
}

function corrigirResposta(opcaoEscolhida, opcoes) {
    let respostaCorreta = opcaoEscolhida.parentNode.querySelector(".opcao.correta");

    opcoes.forEach(elemento => {
        if (elemento === respostaCorreta){
            elemento.classList.add("opcao-correta");
        }
        else {elemento.classList.add("opcao-validada")}
    });

    if (respostaCorreta === opcaoEscolhida) {
        pontuacao++;
    }
}

function verificarNivel() {
    porcentagem = Math.round((pontuacao/ quizzEscolhido.questions.length)*100);
    
    let niveis = quizzEscolhido.levels;

    for (let i = niveis.length-1; i >= 0; i--) {
        let valorMinimo = quizzEscolhido.levels[i].minValue;

        if (porcentagem >= valorMinimo) {
            return i;
        }
    }
}

function ehPerguntaAtual(opcao) {
    let perguntaAtual = opcao.parentNode.parentNode.querySelector(`.perguntas.pergunta${idPerguntaAtual}`);
    if (perguntaAtual !== null) {
        idPerguntaAtual++;

        let novaPerguntaAtual = document.querySelector(`.pergunta${idPerguntaAtual}`)
        setTimeout(function(){
            if (idPerguntaAtual === quizzEscolhido.questions.length) {
                gerarCaixaResultado();
                document.querySelector(".caixa-resultado").classList.remove("escondido");
            }
            novaPerguntaAtual.parentNode.scrollIntoView({behavior: "smooth"})
        }, 2000);

        return perguntaAtual;
    }
}

function recarregarPagina() {
    window.location.reload();
}

function embaralhar() {
    return Math.random() -0.5;
}