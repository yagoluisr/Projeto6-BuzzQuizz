let conteudoTela = document.querySelector('.conteudo');
let arrayQuizzes;
let quizzEscolhido;
let idPerguntaAtual = 0;
let pontuacao = 0;
let porcentagem = 0;


function renderizarTela1() {
    conteudoTela.innerHTML = `
        <div class="tela1">
            <div class="criarQuizz">
                <p>Você não criou nenhum quizz ainda :(</p>
            <div onclick="exibirCriarQuizz()">Criar Quizz</div>
        </div>

        <!-- <div class="seusQuizzes">
            <div>
                <p>Seus Quizzes</p>
                <ion-icon name="add-outline" onclick="exibirCriarQuizz()"></ion-icon>
            </div>
            <div class="galeria"></div>
        </div> -->
        
        <div class="todosQuizzes">
            <p>Todos os Quizzes</p>
            <div class="galeria"></div>
        </div>
    `;

    buscarQuizzes();
}

renderizarTela1();

function buscarQuizzes(){

    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(renderizarQuizzes);
    console.log(promise)
}

function renderizarQuizzes(resposta){
    arrayQuizzes = resposta.data;
    console.log(arrayQuizzes)

    let galeriaQuizz = document.querySelector(".todosQuizzes .galeria");
    
    for (let i = 0; i < arrayQuizzes.length; i++ ){

            galeriaQuizz.innerHTML += `
            <div class="quizz2" onclick="obterQuizz(${arrayQuizzes[i].id})">
                <img src="${arrayQuizzes[i].image}">
                <div class="degrade"></div>
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

function exibirCriarQuizz() {
    
    conteudoTela.innerHTML = '';

    conteudoTela.innerHTML += `
    <div class="tela3">
        <span>Comece pelo começo</span>

        <div class="infoBasicas">
            <input type="text" placeholder="Título do seu quizz" class"titulo">
            <input type="text" placeholder="URL da imagem do seu quizz" class"url">
            <input type="text" placeholder="Quantidade de perguntas do quizz" class"qtdPerguntas">
            <input type="text" placeholder="Quantidade de níveis do quizz" class"niveis">
        </div>
        <div class="prosseguirPerguntas" onclick = "criarPerguntas()">
            <p>Prosseguir pra criar perguntas</p>
        </div>
    </div>
    `;

    //onclick="verificarDados()"
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

    gerarBotoes();
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

function gerarBotoes() {
    conteudoTela.innerHTML += `
        <div class="botoes escondido">
            <div class="botao-reiniciar" onclick="reiniciarQuizz()">
                <p>Reiniciar Quizz</p>
            </div>
            <div class="voltar-home" onclick="irHome()">
                <p>Volta para home</p>
            </div>
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

function irHome() {
    conteudoTela.innerHTML = '';
    renderizarTela1();
}

function reiniciarQuizz() {
    reiniciarVariaveis();
    retirarClasses();
    document.querySelector(".bannerQuizz").scrollIntoView({behavior: "smooth"});
}

function reiniciarVariaveis() {
    idPerguntaAtual = 0;
    pontuacao = 0;
    porcentagem = 0;
}

function retirarClasses() {
    let resetar;

    resetar = document.querySelectorAll(".opcao-correta");
    resetar.forEach(elemento => {elemento.classList.remove('opcao-correta')});

    resetar = document.querySelectorAll(".opcao-validada");
    resetar.forEach(elemento => {elemento.classList.remove('opcao-validada')});

    resetar = document.querySelectorAll(".opcao-nao-selecionada");
    resetar.forEach(elemento => {elemento.classList.remove('opcao-nao-selecionada')});

    document.querySelector(".caixa-resultado").classList.add("escondido");
    document.querySelector(".botoes").classList.add("escondido");
}

function ehPerguntaAtual(opcao) {
    let perguntaAtual = opcao.parentNode.parentNode.querySelector(`.perguntas.pergunta${idPerguntaAtual}`);
    
    if (perguntaAtual !== null) {
        idPerguntaAtual++;

        let novaPerguntaAtual = document.querySelector(`.pergunta${idPerguntaAtual}`);

        setTimeout(function(){

            if (idPerguntaAtual === quizzEscolhido.questions.length) {
                gerarCaixaResultado();
                document.querySelector(".caixa-resultado").classList.remove("escondido");
                document.querySelector(".botoes").classList.remove("escondido");

                document.querySelector(".caixa-resultado").scrollIntoView({behavior: "smooth"});
            } else {
                novaPerguntaAtual.parentNode.scrollIntoView({behavior: "smooth"});
            }
            
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

// ***** Tela 3 ****


function verificarDados(){

    let titulo = document.querySelector(".infoBasicas :nth-child(1)").value;
    let url = document.querySelector(".infoBasicas :nth-child(2)").value;
    let perguntas = document.querySelector(".infoBasicas :nth-child(3)").value;
    let niveis = document.querySelector(".infoBasicas :nth-child(4)").value;

    console.log(verificarTitulo(titulo));
    console.log(verificarUrl(url));
    console.log(verificarPerguntas(perguntas));
    console.log(verificarNiveis(niveis));

    if(verificarTitulo(titulo) !== true || verificarUrl(url) !== true || verificarPerguntas(perguntas) !== true || verificarNiveis(niveis) !== true ){
        alert("Atenção, dado(s) inválido(s). Por favor, verifique os campos.");
    }
}

function verificarTitulo(titulo){

    if(titulo.length > 20 && titulo.length < 65){
        
        return true;
    }    
    return false;
}

function verificarUrl(string){
        
        try {
         let url = new URL(string)
         return true;
         //console.log("Valid URL!")
       } catch(err) {
            return false;   
        //console.log("Invalid URL!")
       }
}

function verificarPerguntas(perguntas){
    
    if(perguntas >= 3){
        return true;
    }
    return false;
}

function verificarNiveis(niveis){
   
    if(niveis >= 2){
        return true;
    }
    return false;
}

function criarPerguntas() {
    let perguntas = 3;

    conteudoTela.innerHTML = '';

    conteudoTela.innerHTML += `
        <div class="tela3">
            <span>Crie suas perguntas</span>
            <div class="tela-perguntas">
            </div>
            <div class="prosseguirPerguntas" onclick = "">
                <p>Prosseguir para criar níveis</p>
            </div>
        </div>
    `;

    inserirPergunta(perguntas);
}

function inserirPergunta(perguntas) {

    let tela = document.querySelector(".tela3 .tela-perguntas");

    for (let i = 1; i <= perguntas; i++) {
        tela.innerHTML += `
        <div class="criar-pergunta">
            <ul class="pergunta${i}">
                <div onclick="expandirPergunta(${i})">
                <span>Pergunta ${i}</span>
                <img src="./Img/Editar.svg">
                </div>
                <li>
                    <input type="text" placeholder="Texto da pergunta" class="titulo">
                    <input type="text" placeholder="Cor de fundo da pergunta" class="titulo">
                </li>
                <li>
                    <span>Resposta correta</span>
                    <input type="text" placeholder="Resposta correta" class="titulo">
                    <input type="text" placeholder="URL da imagem" class="titulo">
                </li>
                <li>
                    <span>Respostas incorretas</span>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 1" class="titulo">
                        <input type="text" placeholder="URL da imagem 1" class="titulo">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 2" class="titulo">
                        <input type="text" placeholder="URL da imagem 2" class="titulo">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 3" class="titulo">
                        <input type="text" placeholder="URL da imagem 3" class="titulo">
                    </div>
                </li>
            </ul>
        </div>
        `;
    }
}

function expandirPergunta(id) {
    let perguntaSelecionada = document.querySelector(`.pergunta${id}`);
    let imgPerguntaSelecionada = document.querySelector(`.pergunta${id} img`);

    let jaSelecionada = document.querySelector(".expandir");
    let imgJaSelecionada = document.querySelector(".expandir img");

    if (jaSelecionada !== null) {
        jaSelecionada.classList.toggle("expandir");
        imgJaSelecionada.classList.toggle("escondido");
    }
    
    perguntaSelecionada.classList.add("expandir");
    imgPerguntaSelecionada.classList.add("escondido");
}