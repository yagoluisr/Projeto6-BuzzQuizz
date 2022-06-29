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
                ${gerarOpcoes(quizz, i)};
            </div>
        </div>`;

        
        document.querySelector(`.pergunta${i}`).style.backgroundColor = `${quizz.questions[i].color}`;
    }

    console.log(quizz);
}

function gerarOpcoes(quizz, idQuestions) {
    let respostas = quizz.questions[idQuestions].answers;
    respostas = respostas.sort(embaralhar);
    let opcoes = [];

    for (let i = 0; i < respostas.length; i++) {

        let opcao = `
            <div class="opcao">
                <img src="${respostas[i].image}">
                <p>${respostas[i].text}</p>
            </div>
        `;

        opcoes.push(opcao);
    }

    return opcoes;
}

function recarregarPagina() {
    window.location.reload();
}

function embaralhar() {
    return Math.random() -0.5;
}