let conteudoTela = document.querySelector('.conteudo');
let arrayQuizzes;

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

    for (let i = 0; i < 1; i++ ){

            galeriaQuizz.innerHTML += `
            <div class="quizz1">
                        <img src="${arrayQuizzes[20].image}">
                        <span>O quanto você é de boas?</span>
                    </div>
            `
    }
}




function exibirQuizz(quizz) {
    quizz = {id: 8185,
    image: "https://i.pinimg.com/originals/b3/45/e4/b345e46becdaeaaa9dcf6ea6144c91a9.jpg",
    levels: [
        {image: "http://www.hfhfhf.com",
        minValue: "50",
        text: "fghtgjhdhtgfhdfshfghjjmkfgghbnfgbd",
        title: "ththsrthhgdfgh"},
        {image: "http://www.hfhfhf.com",
        minValue: "90",
        text: "fghtgjhdhtgfhdfshfghjjmkfgghbnfgbd",
        title: "htrhthftghff"}],
        questions: [
            {answers: [{
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                    image: "http://www.hfhfhf.com",
                    isCorrectAnswer: false,
                    text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: true,
                text: "hdhshshshs"}],
            color: "#444444",
            title: "hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd"},
            {answers: [{
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                    image: "http://www.hfhfhf.com",
                    isCorrectAnswer: false,
                    text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: false,
                text: "hdhshshshs"},
                {
                image: "http://www.hfhfhf.com",
                isCorrectAnswer: true,
                text: "hdhshshshs"}],
            color: "#000000",
            title: "hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd"}],
    title: "Qual dos personagens de Friends mais te representa?"};

    conteudoTela.innerHTML = '';
    conteudoTela.innerHTML += `
        <div>
            <div class="bannerQuizz">
                <img src="${quizz.image}">
                <p>${quizz.title}</p>
            </div>
        </div>
    `;

    for (let i = 0; i < quizz.questions.length; i++) {

        conteudoTela.innerHTML += `
        <div class="quizzPergunta">
            <div class="pergunta${i} pergunta">
                <p>${quizz.questions[i].title}</p>
            </div>
            <div class="opcoes">
                <img src="">
                <p></p>
            </div>
        </div>`;

        
        document.querySelector(`.pergunta${i}`).style.backgroundColor = `${quizz.questions[i].color}`;
    }

    console.log(quizz);
}

function recarregarPagina() {
    window.location.reload();
}