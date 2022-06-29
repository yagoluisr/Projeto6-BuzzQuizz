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
        title: "hdhdhdhdhdhdhdhdhdhdhdhdhdhdhdhd"}],
    title: "Qual dos personagens de Friends mais te representa?"};

    conteudoTela.innerHTML = '';
    conteudoTela.innerHTML += `
        <div>
            <div class="bannerQuizz">
                <img src="${quizz.image}">
                <p>${quizz.title}</p>
            </div>
            <div class="quizzPergunta">
                <div>
                    <p></p>
                </div>
                <div class="opcoes">
                    <img src="">
                    <p></p>
                </div>
            </div>
        </div>
    `;

    console.log(quizz);
}

function recarregarPagina() {
    window.location.reload();
}