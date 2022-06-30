let conteudoTela = document.querySelector('.conteudo');
let arrayQuizzes;
let quizzEscolhido;
let idPerguntaAtual = 0;


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
            <div class="quizz2" onclick="exibirQuizz(this)">
            <img src="${arrayQuizzes[i].image}">
                <span>${arrayQuizzes[i].title}</span>
            </div>
            `
    }
}




function exibirQuizz(quizz) {
    quizz = {id: 8185,
    image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
    levels: [
        {image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
        minValue: "50",
        text: "fghtgjhdhtgfhdfshfghjjmkfgghbnfgbd",
        title: "ththsrthhgdfgh"},
        {image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
        minValue: "90",
        text: "fghtgjhdhtgfhdfshfghjjmkfgghbnfgbd",
        title: "htrhthftghff"}],
        questions: [
            {answers: [{
                image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                    image: "https://i.pinimg.com/originals/7d/98/84/7d98840fdff1b2e7cd508cc7f3a17403.jpg",
                    isCorrectAnswer: false,
                    text: "hdhshshshs"},
                {
                image: "https://i.pinimg.com/originals/94/32/cd/9432cdd515ab3d772334e471e230c211.jpg",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "https://i0.wp.com/abglt.org.br/wp-content/uploads/2020/10/wallpaper-pc1-scaled-1.jpg?fit=2560%2C1440&ssl=1",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "https://cdna.artstation.com/p/assets/images/images/002/664/530/large/ivan-bondar-trees-oceangrtgrg.jpg?1464272238",
                isCorrectAnswer: true,
                text: "hdhshshshs"}],
            color: "#444444",
            title: "hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd"},
            {answers: [{
                image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                    image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                    isCorrectAnswer: false,
                    text: "hdhshshshs"},
                {
                image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
                isCorrectAnswer: true,
                text: "hdhshshshs"}],
            color: "#444444",
            title: "hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd"}],
    title: "Qual dos personagens de Friends mais te representa?"};
    quizzEscolhido = quizz;

    conteudoTela.innerHTML = '';

    gerarBanner(quizz);

    gerarPerguntas(quizz);

    console.log(quizz);
}

function gerarBanner(quizz) {
    conteudoTela.innerHTML += `
        <div>
            <div class="bannerQuizz">
                <img src="${quizz.image}">
                <p>${quizz.title}</p>
            </div>
        </div>
    `;
}

function gerarPerguntas(quizz) {
    for (let i = 0; i < quizz.questions.length; i++) {

        conteudoTela.innerHTML += `
        <div class="quizzPergunta">
            <div class="pergunta${i} perguntas">
                <p>${quizz.questions[i].title}</p>
            </div>
            <div class="opcoes${i} opcoes">
            </div>
        </div>`;
        
        gerarOpcoes(quizz, i);
        document.querySelector(`.pergunta${i}`).style.backgroundColor = `${quizz.questions[i].color}`;
    }
}

function gerarOpcoes(quizz, idQuestions) {
    let divOpcoes = document.querySelector(`.conteudo .opcoes${idQuestions}`);

    let respostas = quizz.questions[idQuestions].answers;
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

function selecionarOpcao(opcaoEscolhida) {
    let opcoes = opcaoEscolhida.parentNode.querySelectorAll(".opcao");
    let jaEscolhida = opcaoEscolhida.parentNode.querySelector(".opcao-nao-selecionada");
    console.log('escolhida: ' + opcaoEscolhida);

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
        else {elemento.classList.add("opcao-validada")}});
}

function ehPerguntaAtual(opcao) {
    let perguntaAtual = opcao.parentNode.parentNode.querySelector(`.perguntas.pergunta${idPerguntaAtual}`);
    if (perguntaAtual !== null) {
        idPerguntaAtual++;

        let novaPerguntaAtual = document.querySelector(`.perguntas.pergunta${idPerguntaAtual}`)
        setTimeout(function(){novaPerguntaAtual.parentNode.scrollIntoView({behavior: "smooth"})}, 2000);

        return perguntaAtual;
    }
}

function recarregarPagina() {
    window.location.reload();
}

function embaralhar() {
    return Math.random() -0.5;
}