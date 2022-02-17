let qtdNiveis = null;
let qtdPerguntas = null;


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
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta) => {
        resposta.data.forEach(element => {
            if (element.id === quizz) {
                document.querySelector('main').classList.add('mainTela2')
                document.querySelector('.criarQuizz').classList.add('escondido')
                document.querySelector('.todosQuizzes').classList.add('escondido')

                const tela2 = document.querySelector('.tela2')
                console.log(element.questions);
                tela2.innerHTML += `

                <div class="banner" >
                    <figure>
                        <div class="degradeBanner"></div>
                        <img src=${element.image} />
                        <p>${element.title}</p>
                    </figcation>    
                </div>
                <div class='perguntas'>
                    <div class=" pergunta pergunta01" >
                        <div class= "conteudo">
                            <div class="titulo">
                            <h3>${element.questions[0].title}</h3>
                            </div>
                            <div class="opcoes">
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                `
                const cor = element.questions[0].color
                document.querySelector('.pergunta01 .titulo').style.background = cor;
                const perguntaOpcoes = element.questions[0].answers
                const opcoes = document.querySelector('.pergunta01 .opcoes')
                perguntaOpcoes.forEach(element => {
                    opcoes.innerHTML += `
                        <figure>
                            <img src=${element.image} />
                            <p>${element.text}</p>
                        </figcation>  
                      
                    `
                    console.log(element)
                })

                console.log(element) // vai criar a tela 2 
            }
        })

    })
}

listarTodosQuizzes()

function criarQuiz() {
    window.location.href = "criacaoQuiz.html";
}

function validaInformacoesBasicas() {
    //Recupera o valor escrito nas caixas de texto
    const titulo = document.querySelector(".titulo1").value;
    const url = document.querySelector(".url1").value;
    const perguntas = document.querySelector(".perguntas1").value;
    const niveis = document.querySelector(".niveis1").value;
    let flag = false; // Flag usada para validar se a url escrita pelo usuário está no formato de url.
    //Caso as substrings nao existam na string que url está guardando, retornará -1.
    //Ou seja, se for diferente de -1, é porque essas substrings estão presentes na string url.
    if (((url.indexOf("http://") !== -1) || (url.indexOf("https://") !== -1))) {
        flag = true;
    }

    //Nesse if está sendo verificado se o titulo digitado tem no mínimo 20 caracteres e no máximo 65 caracteres.
    //Se a quantidade de níveis é no mínimo 2 e se a quantidade de perguntas é pelo menos 3. Caso tudo seja verdadeiro
    //Duas variaveis globais guardarão a quantidade de níveis e perguntas, os inputs serão limpos e a funcao
    //criarPerguntas é chamada
    if ((titulo.length >= 20 && titulo.length <= 65) && (niveis >= 2) && (perguntas >= 3) && flag === true) {
        qtdNiveis = niveis;
        qtdPerguntas = perguntas;
        let limpaTitulo = document.querySelector(".titulo1");
        limpaTitulo.value = "";
        let limpaURL = document.querySelector(".url1");
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
        let limpaURL = document.querySelector(".url1");
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


//Funcao que valida as informacoes digitadas na tela 3.1, funcao incompleta, ainda não está funcionando
function validaInformacoesPerguntas() {
    const pergunta = [...document.querySelectorAll(".questao")]; //Aqui eu tento converter a lista retornada pelo querySelectorAll em um array.
    const color = document.querySelectorAll(".color");
    const respostaCorreta = [...document.querySelectorAll(".resposta-correta")];
    const respostaIncorreta = [...document.querySelectorAll(".resposta-incorreta")];
    const urlCorreta = [...document.querySelectorAll(".url-correta")];
    let flag = true; // Mesma estrategia da flag anterior
    //laço para validar o formato URL. Nesse caso, usei uma estratégia contrária, caso o valor retornado de algum elemento do array for -1
    // Mudo a flag para false e forço a saída do laço
    for (let i = 0; i < urlCorreta.length; i++) {
        if (((urlCorreta[i].indexOf("http://") === -1) || (urlCorreta[i].indexOf("https://") === -1))) {
            flag = false;
            break;
        }
    }
    //Aqui tentei usar o forEach para verificar se os campos das respostas incorretas não estavam nulos. Caso algum campo estivesse, 
    //Limparia os campos e emitira e alert, ainda não foi feito o alert
    respostaIncorreta.forEach(element => {
        if (element.value === null) {
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
        }
    });

    //Laço que verifica se a pergunta tem menos de 20 caracteres, se a resposta correta está vazia e se a url não tem formato de url.
    //Caso as validaçoes sejam verdadeiras, os campos dos inputs são limpados, é emitido um alert e forçado um break no laço
    for (let i = 0; i < pergunta.length; i++) {
        if (pergunta[i].value.lenght < 20 || respostaCorreta[i].value.lenght === null || flag === false) {
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
            alert("Por favor preencha os dados corretamente!");
            break;
        }
    }
}

