let conteudoTela = document.querySelector('.conteudo');
let arrayQuizzes;
let quizzEscolhido;
let idPerguntaAtual = 0;
let pontuacao = 0;
let porcentagem = 0;
let quizzCriado = {};


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
            <input type="text" placeholder="Título do seu quizz">
            <input type="text" placeholder="URL da imagem do seu quizz">
            <input type="text" placeholder="Quantidade de perguntas do quizz">
            <input type="text" placeholder="Quantidade de níveis do quizz">
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

    if(titulo.length >= 20 && titulo.length <= 65){
        return true;
    }    
    return false;
}

function verificarUrl(string){
        
    try {
        let url = new URL(string)
        return true;
    } catch(err) {
            return false;   
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

// **** Tela 3.2 ****

function criarPerguntas() {
    let perguntas = 3;
    // apagar variavel

    conteudoTela.innerHTML = '';

    conteudoTela.innerHTML += `
        <div class="tela3">
            <span>Crie suas perguntas</span>
            <div class="tela-perguntas">
            </div>
            <div class="prosseguirPerguntas" onclick = "verificarPerguntasCriadas()">
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
                    <input type="text" placeholder="Cor de fundo da pergunta" class="cor">
                </li>
                <li>
                    <span>Resposta correta</span>
                    <input type="text" placeholder="Resposta correta" class="respostaCorreta">
                    <input type="text" placeholder="URL da imagem" class="urlCorreta">
                </li>
                <li>
                    <span>Respostas incorretas</span>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 1" class="resposta1">
                        <input type="text" placeholder="URL da imagem 1" class="URL1">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 2" class="resposta2">
                        <input type="text" placeholder="URL da imagem 2" class="URL2">
                    </div>
                    <div>
                        <input type="text" placeholder="Resposta incorreta 3" class="resposta3">
                        <input type="text" placeholder="URL da imagem 3" class="URL3">
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
        jaSelecionada.classList.remove("expandir");
        imgJaSelecionada.classList.remove("escondido");
    }

    perguntaSelecionada.classList.add("expandir");
    imgPerguntaSelecionada.classList.add("escondido");

    if (jaSelecionada === perguntaSelecionada) {
        jaSelecionada.classList.toggle("expandir");
        imgJaSelecionada.classList.toggle("escondido");
    }
}


function verificarPerguntasCriadas() {
    let perguntas = {questions: []};
    let verificadas = 0;

    /* substituir '3' do for e do if pela quantidade de perguntas */

    for (let i = 1; i <= 3; i++) {

        let pergunta = document.querySelector(`.tela-perguntas .criar-pergunta:nth-child(${i})`);

        let titulo = pergunta.querySelector(".titulo").value;
        let cor = pergunta.querySelector(".cor").value;
        let respostaCorreta = pergunta.querySelector(".respostaCorreta").value;
        let URLCorreta = pergunta.querySelector(".urlCorreta").value;
        let resposta1 = pergunta.querySelector(".resposta1").value;
        let URL1 = pergunta.querySelector(".URL1").value;
        let resposta2 = pergunta.querySelector(".resposta2").value;
        let URL2 = pergunta.querySelector(".URL2").value;
        let resposta3 = pergunta.querySelector(".resposta3").value;
        let URL3 = pergunta.querySelector(".URL3").value;

        if (ehDadosValidos(titulo, cor, respostaCorreta, resposta1, resposta2, resposta3, URLCorreta, URL1, URL2, URL3)){
            verificadas++;

            let rsp1 = {
                image: URLCorreta,
                text: respostaCorreta,
                isCorrectAnswer: true
            }

            let rsp2 = {
                image: URL1,
                text: resposta1,
                isCorrectAnswer: false
            }

            let rsp3 = {
                image: URL2,
                text: resposta2,
                isCorrectAnswer: false
            }

            let rsp4 = {
                image: URL3,
                text: resposta3,
                isCorrectAnswer: false
            }

            let respostas = [rsp1];

            if (rsp2.image !== '' && rsp2.text !== '') {
                respostas.push(rsp2);
            }
            if (rsp3.image !== '' && rsp3.text !== '') {
                respostas.push(rsp3);
            }
            if (rsp4.image !== '' && rsp4.text !== '') {
                respostas.push(rsp4);
            }

            let perguntaArray = {
                answers: respostas,
                color: cor,
                title: titulo
            };

            perguntas.questions.push(perguntaArray);
        }
    }

    if (verificadas === 3) {
        atualizarQuizzUsuario(perguntas.questions, 2);
    } else {
        alert("Atenção, dado(s) inválido(s). Por favor, verifique os campos.");
    }
}

function ehDadosValidos (titulo, cor, respostaCorreta, resposta1, resposta2, resposta3, URLCorreta, URL1, URL2, URL3) {

    return (ehTituloPerguntasValido(titulo) && ehCorValida(cor) 
        && ehRespostaValida(respostaCorreta, resposta1, resposta2, resposta3)
        && verificarUrl(URLCorreta) && (verificarUrl(URL1) || verificarUrl(URL2) || verificarUrl(URL3))
        && ehCardValido(resposta1, URL1) && ehCardValido(resposta2, URL2) && ehCardValido(resposta3, URL3));
}

function ehTituloPerguntasValido (string) {
    if (string.length >= 20) {
        return true;
    }
    return false;
}

function ehCorValida (cor) {
    let hex = /^#[0-9A-F]{6}$/i;
    return (hex.test(cor));
}

function ehRespostaValida (rCorreta, r1, r2, r3) {
    return (rCorreta !== '' && (r1 !== '' || r2 !== '' || r3 !== ''));
}

function ehCardValido (resposta, url) {
    return ((resposta !== '' && url !== '') || (resposta === '' && url === ''));
}

function atualizarQuizzUsuario (elemento, fase) {
    if (fase === 1) {}
    if (fase === 2) {
        quizzCriado.questions = elemento;
    }
    if (fase === 3) {}
}


// **** Tela 3.3 ****

function renderizarNiveis(){
    let niveis = 3;
    // apagar variavel

    conteudoTela.innerHTML = '';

    conteudoTela.innerHTML += `
    <div class="tela3">
        <span>Agora, decida os níveis</span>
        <div class="niveis">

        </div>

        <div class="prosseguirPerguntas" onclick = "verificarNivelQuizz()">
            <p>Finalizar Quizz</p>
        </div>

    </div>
    `
    inserirNiveis(niveis)
}

function inserirNiveis(niveis) {

    let tela = document.querySelector(".tela3 .niveis");

    for (let i = 1; i <= niveis; i++) {
        tela.innerHTML += `
        <div class="criar-pergunta">
            <ul class="pergunta${i}">
                <div onclick="expandirPergunta(${i})">
                <span>Nivel ${i}</span>
                <img src="./Img/Editar.svg">
                </div>
                <div></div>
                <input type="text" placeholder="Título do nível">
                <input type="text" placeholder="% de acerto mínima">
                <input type="text" placeholder="URL da imagem do nível">
                <input type="text" placeholder="Descrição do nível">
            </ul>
        </div>
        `;
    }
}

function verificarNivelQuizz(){
let pergunta = 3;
let titulo;
let acertosMin;
let url;
let descricao;

    let check = false;

    for(let i = 1; i <= pergunta; i++){

        titulo = document.querySelector(`.pergunta${i} :nth-child(3)`).value;
        acertosMin = document.querySelector(`.pergunta${i} :nth-child(4)`).value;
        url = document.querySelector(`.pergunta${i} :nth-child(5)`).value;
        descricao = document.querySelector(`.pergunta${i} :nth-child(6)`).value;

        if(acertosMin === "0"){
           check = true;
        }

        // console.log(titulo);
        // console.log(acertosMin);
        // console.log(url);
        // console.log(descricao);

        // console.log(Titulo_nivel(titulo));
        // console.log(PorCento_nivel(acertosMin));
        // console.log(Url_niveis(url));
        // console.log(Descricao_niveis(descricao));

        if(Titulo_nivel(titulo) !== true || PorCento_nivel(acertosMin) !== true || Url_niveis(url) !== true || Descricao_niveis(descricao) !== true ){
            alert("Atenção, uns dos dados está inválido");
        }
    }
    if(check === false){
        alert("As está inválido");
    }
}

function Titulo_nivel(titulo){
    if(titulo.length > 10){
        return true;
    }
    return false;
}

function PorCento_nivel(acertosMin) {
    if(acertosMin >= 0 && acertosMin <= 100 && acertosMin !== ''){
        return true;
    }
    return false;
}

function Url_niveis(string){
    try {
        let url = new URL(string)
        return true;
        //console.log("Valid URL!")
    } catch(err) {
            return false;   
        //console.log("Invalid URL!")
    }
}

function Descricao_niveis(descricao){
    if(descricao.length >= 30){
        return true;
    }
    return false;
}
