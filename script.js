let qtdNiveis = null;
let qtdPerguntas = null;
let guardaCor = null;

let qtdAcertos = null;
let qtdRespondidos = null;
let quiz = null;

const corHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function listarTodosQuizzes() {

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta) => {
        const todosQuizzes = document.querySelector('.todosQuizzes')
        todosQuizzes.innerHTML = '<h2>Todos os Quizzes</h2>'

        resposta.data.forEach(element => {
            todosQuizzes.innerHTML += `

                <div class="quizz " onclick ='exibirQuizz(${element.id})' >
                    <figure>
                        <div class="degrade"></div>
                        <img src=${element.image} />
                        <p>${element.title}</p>
                    </figcation>    
                </div>
            
            `
        });
    })
}

function exibirQuizz(quizz) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizz}`);
    quiz = quizz;
    promise.then((resposta) => {
        let element = resposta.data;
        // console.log(resposta.data);
        // resposta.data.forEach(element => {
        // if (element.id === quizz) {
        document.querySelector('main').classList.add('mainTela2')
        document.querySelector('.criarQuizz').classList.add('escondido')
        document.querySelector('.todosQuizzes').classList.add('escondido')
        // console.log(element.questions);
        const tela2 = document.querySelector('.tela2')
        tela2.innerHTML += `
                <div class="banner" >
                    <figure>
                        <div class="degradeBanner"></div>
                        <img src=${element.image} />
                        <p>${element.title}</p>
                    </figcation>    
                </div>
                `
        for (let i = 0; i < element.questions.length; i++) {
            tela2.innerHTML += `
                    <div class='perguntas'>
                        <div class=" pergunta pergunta${i + 1}" >
                            <div class= "conteudo">
                                <div class="titulo">
                                    <h3>${element.questions[i].title}</h3>
                                </div>
                                <div class="opcoes"></div>
                            </div>    
                        </div>
                    </div>
                    `
        }
        for (let i = 0; i < element.questions.length; i++) {
            const cor = element.questions[i].color
            document.querySelector(`.pergunta${i + 1} .titulo`).style.background = cor;
            let perguntaOpcoes = element.questions[i].answers;
            // console.log(perguntaOpcoes);
            let opcoes = document.querySelector(`.pergunta${i + 1} .opcoes`);
            // console.log("pergunta",i);
            // console.log(element);
            perguntaOpcoes.sort(comparador);
            perguntaOpcoes.forEach(element => {
                if (element.isCorrectAnswer === true) {
                    opcoes.innerHTML += `
                                        <figure onclick="selecionaResposta(this, 'pergunta${i + 1}', ${element.isCorrectAnswer},${i})">
                                            <img src=${element.image} />
                                            <p class="certo${i}">${element.text}</p>
                                        </figcation>
                                        `;
                } else {
                    opcoes.innerHTML += `
                                        <figure onclick="selecionaResposta(this, 'pergunta${i + 1}', 'errado${i}',${i})">
                                            <img src=${element.image} />
                                            <p class="errado${i}">${element.text}</p>
                                        </figcation>
                                        `;
                }
            });
        }

    });
}


function selecionaResposta(elemento, numPergunta, resposta, indice) {
    const elementos = [...document.querySelectorAll(`.${numPergunta} .opcoes figure`)];
    //console.log(elementos);
    if(!elemento.classList.contains("nao-selecionado")){
        elementos.forEach(elmts => {
            elmts.classList.add("nao-selecionado");
        });
        // let guardaElemento = elemento.children;
        // console.log(elemento.children);
        elemento.classList.remove("nao-selecionado");
    
    
        if (resposta === true) {
            elemento.classList.add("correto");
            qtdAcertos++;
            qtdRespondidos++;
            const response = [...document.querySelectorAll(`.errado${indice}`)];
            response.forEach(elmts => {
                elmts.classList.add("incorreto");
            })
        } else {
            qtdRespondidos++;
            const certo = document.querySelector(`.certo${indice}`);
            const response = [...document.querySelectorAll(`.${resposta}`)];
            // response.classList.add("incorreto");
            response.forEach(elmts => {
                console.log(elmts);
                elmts.classList.add("incorreto");
            })
            certo.classList.add("correto");
        }
        setTimeout(() => {
            let promiseLevels = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quiz}`);
            promiseLevels.then((resposta)=>{
                const levels = resposta.data.levels;
                const tela2 = document.querySelector('.tela2')
                if(qtdRespondidos === levels.length){
                    for(let i = 0; i < levels.length; i++){
                        tela2.innerHTML += `
                            <div class="caixa-resposta">
                                <h3>${levels[i].minValue}%:${levels[i].title} </h3>
                            </div>
                            <div class="imagem-resposta">
                                <img src=${levels[i].image}/>
                                <h4>${levels[i].text}</h4>
                            </div>
                        `
                    }
                }
            })
            elemento.scrollIntoView();
        }, 2000);
    }
}

listarTodosQuizzes()

function criarQuiz() {
    window.location.href = "criacaoQuiz.html";
}

function validaInformacoesBasicas() {
    //Recupera o valor escrito nas caixas de texto
    const titulo = document.querySelector(".titulo1").value;
    const perguntas = document.querySelector(".perguntas1").value;
    const niveis = document.querySelector(".niveis1").value;

    const verificarUrl = verificarURL('tela3')
    
    if ((titulo.length >= 20 && titulo.length <= 65) && (niveis >= 2) && (perguntas >= 3) && verificarUrl) {
        qtdNiveis = niveis;
        qtdPerguntas = perguntas;
        let limpaTitulo = document.querySelector(".titulo1");
        limpaTitulo.value = "";
        let limpaURL = document.querySelector(".url-correta");
        limpaURL.value = "";
        let limpaPerguntas = document.querySelector(".perguntas1");
        limpaPerguntas.value = "";
        let limpaNiveis = document.querySelector(".niveis1");
        limpaNiveis.value = "";

        criarPerguntas();
    } else { //Caso seja falso, é exibido um alert e os inputs são limpos e a página recarregada.
        alert("Por favor, preencha os dados corretamente!");
        let limpaTitulo = document.querySelector(".titulo1");
        limpaTitulo.value = "";
        let limpaURL = document.querySelector(".url-correta");
        limpaURL.value = "";
        let limpaPerguntas = document.querySelector(".perguntas1");
        limpaPerguntas.value = "";
        let limpaNiveis = document.querySelector(".niveis1");
        limpaNiveis.value = "";
        window.location.reload;
    }
}

//Funcao responsavel por fazer aparecer as perguntas posteriores a primeira assim que o usuario clicar no icone.
function apareceCriacaoDaPergunta(elemento, pergunta) {
    const acontece = document.querySelector(`.${pergunta}`);
    acontece.classList.remove("escondido");
    elemento.classList.add("escondido");
}

//Funcao responsavel por criar as perguntas dinamicamente de acordo com a quantidade de perguntas informadas pelo usuario
function criarPerguntas() {
    const pergunta = document.querySelector(".tela3-perguntas"); //tela 3.1 onde cria as perguntas
    const remocao = document.querySelector(".tela3"); //Tela 3 inicial
    remocao.classList.add("escondido"); //Some com a tela 3 inicial
    pergunta.classList.remove("escondido"); //Faz aparecer a tela 3.1 onde cria as perguntas
    //Laço que cria o layout da tela 3.1 dinamicamente
    for (let i = 0; i < qtdPerguntas - 1; i++) {
        pergunta.innerHTML += `<div class="selecione">
        <h2>Pergunta ${i + 2}</h2>
        <ion-icon name="create-outline" onclick="apareceCriacaoDaPergunta(this, 'p${i + 2}')"></ion-icon>
    </div>
    <div class="cria-pergunta p${i + 2} escondido">
        <input type="textarea" class="questao" placeholder="Texto da pergunta">
        <input type="textarea" class="color" placeholder="Cor de fundo da pergunta">
        <h2>Resposta correta</h2>
        <input type="textarea" class="resposta-correta" placeholder="Resposta correta">
        <input type="url" class="url-correta" placeholder="URL da imagem">
        <h2>Respostas incorretas</h2>
        <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 1">
        <input type="url" class="url-resposta" placeholder="URL da imagem 1">
        <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 2">
        <input type="url" class="url-resposta" placeholder="URL da imagem 2">
        <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 3">
        <input type="url" class="url-resposta" placeholder="URL da imagem 3">
    </div>`
    }
    //Após o fim do laço, adiciono o botão dinamicamente no final da página
    pergunta.innerHTML += `<button class="p-perguntas" onclick="validaInformacoesPerguntas()"><p> Prosseguir pra criar níveis </p></button>`;
}

function verificarRepostasIncorretas(respostaIncorreta) {

    let controlador = 0
    let cont = 0;

    respostaIncorreta.forEach((element, indice) => {

        if (element.value === "") cont++;

        if ((indice + 1) % 3 === 0) {
            if (cont > 2) {
                controlador++
            }
            cont = 0
        }

    });

    return (controlador !== 0) ? false : true

}


//Funcao que valida as informacoes digitadas na tela 3.1, funcao incompleta, ainda não está funcionando
function validaInformacoesPerguntas() {
    let controlador = 0
    const pergunta = [...document.querySelectorAll(".questao")]; //Aqui eu tento converter a lista retornada pelo querySelectorAll em um array.
    const color = document.querySelectorAll(".color");
    const respostaCorreta = [...document.querySelectorAll(".resposta-correta")];
    const respostaIncorreta = [...document.querySelectorAll(".resposta-incorreta")];
    const urlCorreta = [...document.querySelectorAll(".url-correta")];

    const verificarUrl = !verificarURL('tela3-perguntas')

    respostaIncorreta.forEach((element, indice) => {

        if (element.value === "") {
            cont++;
        }

        if ((indice + 1) % 3 === 0 && cont > 2) {
            alert("Por favor preencha os dados corretamente!");
            limparCampos(pergunta, respostaCorreta, respostaIncorreta, urlCorreta, color)
            console.log(cont)
            cont = 0
        }

    });

    //Laço que verifica se a pergunta tem menos de 20 caracteres, se a resposta correta está vazia e se a url não tem formato de url.
    //Caso as validaçoes sejam verdadeiras, os campos dos inputs são limpados, é emitido um alert e forçado um break no laço
    for (let i = 0; i < pergunta.length; i++) {

        if (pergunta[i].value.length < 20 || respostaCorreta[i].value.length === null || verificarUrl || !verificaColor(color) || !verificarRepostasIncorretas(respostaIncorreta)) {
            controlador++
            break;
        } else {
            limparCampos(pergunta, respostaCorreta, respostaIncorreta, urlCorreta, color)
            criarNiveis()
        }
    }

    if (controlador !== 0) {
        alert("Por favor preencha os dados corretamente!");
        limparCampos(pergunta, respostaCorreta, respostaIncorreta, urlCorreta, color)

    } else {

        criarNiveis()

    }

}

function limparCampos(pergunta, respostaCorreta, respostaIncorreta, urlCorreta, color) {

    pergunta.forEach(element => {
        element.value = '';
    });
    respostaCorreta.forEach(element => {
        element.value = '';
    });
    respostaIncorreta.forEach(element => {
        element.value = '';
    });
    urlCorreta.forEach(element => {
        element.value = '';
    });
    color.forEach(element => {
        element.value = '';
    });

}


function verificaColor(elemento) {
    elemento.forEach(element => {
        if (element.value.indexOf("#") !== -1) {
            if (element.value.length === 7) {
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < corHex; j++) {
                        if (element.value.indexOf(corHex[j]) === -1) {
                            return false;
                        }
                    }
                }
            }
        }
    });
    return true;
}

function verificarURL(tela){

    const urlCorreta = [...document.querySelectorAll(`.${tela} .url-correta`)]

    let controlador = 0
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;


    for (let i = 0; i < urlCorreta.length; i++) {

        if(regexp.test(urlCorreta[i].value) === false){
            controlador++
            break;
        }

    }

    return (controlador !== 0) ? false : true
}

function verificarPorcentagem(){

        
    const porcentagem = [...document.querySelectorAll(`.tela3-niveis .porcentagem`)]

    let nivelZero = 0
    let controlador = 0

    for (let i = 0; i < porcentagem.length; i++) {

        if(parseInt(porcentagem[i].value) === 0){
            nivelZero++
        }else{
            if((parseInt(porcentagem[i].value) >= 0 &&  parseInt(porcentagem[i].value) <=100)){
               controlador++
            }
        }

    }

    
    return (nivelZero !== 0 && controlador !== 0) ? true : false
}

function criarNiveis() {

    const pergunta = document.querySelector(".tela3-perguntas"); //tela 3.1 onde cria as perguntas
    const niveis = document.querySelector(".tela3-niveis"); //tela 3.1 onde cria as perguntas
    const remocao = document.querySelector(".tela3"); //Tela 3 inicial
    remocao.classList.add("escondido"); //Some com a tela 3 inicial
    pergunta.classList.add("escondido"); //Some com a tela 3 inicial
    niveis.classList.remove("escondido"); //Faz aparecer a tela 3.1 onde cria as perguntas

    for (let i = 0; i < qtdNiveis - 1; i++) {
        niveis.innerHTML += `<div class="selecione">
        <h2>Nivel ${i + 2}</h2>
        <ion-icon name="create-outline" onclick="apareceCriacaoDaPergunta(this, 'p${i + 2}')"></ion-icon>
    </div>
    <div class="cria-niveis p${i + 2} escondido">

        <input type="textarea" class="nivel" placeholder="Titulo do Nivel">
        <input type="textarea" class="porcentagem" placeholder="% de acerto mínima">
        <input type="url" class="url-correta" placeholder="URL da imagem do nível">
        <input type="textarea" class="descricao" placeholder="Descrição do nível">

    </div>`
    }
    //Após o fim do laço, adiciono o botão dinamicamente no final da página
    niveis.innerHTML += `<button class="p-perguntas" onclick="validaInformacoesNiveis()"><p> Finalizar Quizz </p></button>`;
    
}

function validaInformacoesNiveis(){
    let controlador = 0

    const nivel = [...document.querySelectorAll(".nivel")];
    const porcentagem = [...document.querySelectorAll(".porcentagem")];
    const urlCorreta = [...document.querySelectorAll(".url-correta")];
    const descricao = [...document.querySelectorAll(".descricao")];

    for (let i = 0; i < nivel.length; i++) {

        const verificarTituloNivel = nivel[i].value.length < 10
        const verificarDescricao = descricao[i].value.length < 30
        const verificarIntervaloPorcetagem = !verificarPorcentagem()
        const verificarUrl = !verificarURL('tela3-niveis')

        if (verificarTituloNivel || verificarDescricao|| verificarIntervaloPorcetagem || verificarUrl) {
            controlador++
            break;
        }
    }

    if(controlador !== 0){
        alert("Por favor preencha os dados corretamente!");
        // limparCampos(pergunta, respostaCorreta, respostaIncorreta, urlCorreta, color)

    } else {
        criarSucessoQuizz()
    }

}

function criarSucessoQuizz(){
    const sucessoQuizz = document.querySelector(".tela3-sucessoQuizz"); //tela 3.1 onde cria as perguntas
    const niveis = document.querySelector(".tela3-niveis"); //tela 3.1 onde cria as perguntas
    niveis.classList.add("escondido"); //Some com a tela 3 inicial
    sucessoQuizz.classList.remove("escondido"); //Faz aparecer a tela 3.1 onde cria as perguntas

}

function comparador() {
    return Math.random() - 0.5;
}
