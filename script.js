let conteudoTela = document.querySelector('.conteudo');


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