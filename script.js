let qtdNiveis = null;
let qtdPerguntas = null;
let guardaCor = null;
const quizzDoUsuario = [];

let dadosSerializados = null;

let qtdAcertos = 0;
let qtdRespondidos = 0;

let dadosDeSerializados = JSON.parse(dadosSerializados);

let quiz = null;

let novoQuizzTitulo = null;
let novoQuizzImagem = null;
let novoQuizzPeguntas = [];
let novoQuizzNiveis = [];



const corHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

function listarTodosQuizzes() {

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta) => {

        const todosQuizzes = document.querySelector('.todosQuizzes .conteudo');
        const criarQ = document.querySelector(".criarQuizz");
        // const criarQImagem = document.querySelector(".criarQuizz img");
        const botaoCriarQuizz = document.querySelector(".botao-criarQuiz");
        if( todosQuizzes !== null){
            const localStorageItem = JSON.parse(localStorage.getItem('buzzquizz-ids'));
            // todosQuizzes.innerHTML = '<h2>Todos os Quizzes</h2>'
            resposta.data.forEach((element,index) => {
                    if(localStorageItem.ids.includes(element.id)){
                        botaoCriarQuizz.classList.remove("escondido");
                        criarQ.innerHTML = "";
                        criarQ.classList.remove("borda");
                        // criarQImagem.classList.add("expandir");
                        criarQ.innerHTML += `
                        <div class="seus-quizzes">
                        <div class="quizz " onclick ="exibirQuizz('.criarQuizz',${element.id})" >
                        <figure>
                            <div class="degrade"></div>
                                <img src=${element.image} />
                                <p>${element.title}</p>
                        </figcation>    
                             </div>
                        </div>
                        `;
                    }else{
                    todosQuizzes.innerHTML += `
                        <div class="quizz " onclick ="exibirQuizz('.criarQuizz',${element.id})" >
                            <figure>
                                <div class="degrade"></div>
                                <img src=${element.image} />
                                <p>${element.title}</p>
                            </figcation>    
                        </div>
                    
                    `
                }
            });
        }
    })
}


function exibirQuizz(tela, quizz) {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizz}`);
    quiz = quizz;
    promise.then((resposta) => {
        let element = resposta.data;
        // console.log(resposta.data);
        // resposta.data.forEach(element => {
        // if (element.id === quizz) {
        // console.log(element.questions);
        const tela2 = document.querySelector('.tela2')
        tela2.innerHTML = "";
        if (tela === '.criarQuizz') {
            document.querySelector('main').classList.add('mainTela2')
            document.querySelector('.criarQuizz').classList.add('escondido')
            document.querySelector('.todosQuizzes').classList.add('escondido')
        } else {
            document.querySelector('.tela3-sucessoQuizz').classList.add('escondido')
        }
        // console.log(element.questions);
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
    const qtdPerguntas = document.querySelectorAll(".pergunta");
    //console.log(elementos);
    if (!elemento.classList.contains("nao-selecionado")) {
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
            promiseLevels.then((resposta) => {
                const levels = resposta.data.levels;
                const tela2 = document.querySelector('.tela2')
                console.log(qtdAcertos);
                let nivelExibido = {};
                if (qtdRespondidos === qtdPerguntas.length) {
                    let percent = Math.ceil((qtdAcertos / qtdPerguntas.length)*100);
                    for (let i = 0; i < levels.length; i++) {
                        console.log(percent);
                        if (percent >= levels[i].minValue ) {                          
                            nivelExibido = levels[i];
                        } 
                    }
                    console.log(nivelExibido);
                    tela2.innerHTML += `
                        <div class="caixa-resposta">
                            <h3>${nivelExibido.minValue}%:${nivelExibido.title} </h3>
                        </div>
                        <div class="imagem-resposta">
                            <img src=${nivelExibido.image}/>
                            <h4>${nivelExibido.text}</h4>
                        </div>
                        <button class='p-perguntas' onclick="reiniciarQuizz()"><p>Reiniciar Quizz</p></button>
                            <div class="back-home" onclick="voltarParaPaginaInicial()"><p>Voltar para home</p></div>
                        `
                }
            });
            elemento.scrollIntoView();
        }, 2000);
    }
}

listarTodosQuizzes()



function reiniciarQuizz() {
    window.scroll({
        top: 1
    });
    exibirQuizz(".criarQuizz",quiz);
}

function voltarParaPaginaInicial() {
    window.location.reload();
}


function voltarHome() {
    window.location.href = "index.html";
}


function criarQuiz() {
    window.location.href = "criacaoQuiz.html";
}

function validaInformacoesBasicas() {
    //Recupera o valor escrito nas caixas de texto
    const titulo = document.querySelector(".titulo1").value;
    const perguntas = document.querySelector(".perguntas1").value;
    const niveis = document.querySelector(".niveis1").value;
    const urlCorreta = document.querySelector(".url-correta").value;

    const verificarUrl = verificarURL('tela3')

    if ((titulo.length >= 20 && titulo.length <= 65) && (niveis >= 2) && (perguntas >= 3) && verificarUrl) {
        qtdNiveis = niveis;
        qtdPerguntas = perguntas;
        novoQuizzTitulo = titulo;
        novoQuizzImagem = urlCorreta;
        limparCampos('tela3')
        criarPerguntas();

    } else { //Caso seja falso, ?? exibido um alert e os inputs s??o limpos e a p??gina recarregada.
        criarPerguntas();
        //criarSucessoQuizz()
        alert("Por favor, preencha os dados corretamente!");
        limparCampos('tela3')
        window.location.reload;
    }
}


//Funcao responsavel por fazer aparecer as perguntas posteriores a primeira assim que o usuario clicar no icone.
function removerEscondido(elemento, tela, item) {
    const novoItem = document.querySelector(`.${tela} .${item}`);
    novoItem.classList.remove("escondido");
    elemento.classList.add("escondido");
}



function criarPerguntas() {
    document.querySelector(".tela3").classList.add("escondido");
    const pergunta = document.querySelector(".tela3-perguntas");
    pergunta.classList.remove("escondido");

    for (let i = 0; i < qtdPerguntas - 1; i++) {
        pergunta.innerHTML += `<div class="selecione">
        <h2>Pergunta ${i + 2}</h2>
        <ion-icon name="create-outline" onclick="removerEscondido(this,'tela3-perguntas', 'p${i + 2}')"></ion-icon>
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
    //Ap??s o fim do la??o, adiciono o bot??o dinamicamente no final da p??gina
    pergunta.innerHTML += `<button class="p-perguntas" onclick="validaInformacoesPerguntas()"><p> Prosseguir pra criar n??veis </p></button>`;
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


//Funcao que valida as informacoes digitadas na tela 3.1, funcao incompleta, ainda n??o est?? funcionando
function validaInformacoesPerguntas() {
    let controlador = 0
    let cont = 0

    const pergunta = [...document.querySelectorAll(".questao")]; //Aqui eu tento converter a lista retornada pelo querySelectorAll em um array.
    const color = document.querySelectorAll(".color");
    const respostaCorreta = [...document.querySelectorAll(".resposta-correta")];
    const respostaIncorreta = [...document.querySelectorAll(".resposta-incorreta")];
    const urlCorreta = [...document.querySelectorAll(".tela3-perguntas .url-correta")];
    const urlRespostaIncorretas = [...document.querySelectorAll(".url-resposta")];


    const verificarUrl = !verificarURL('tela3-perguntas')

    for (let i = 0; i < pergunta.length; i++) {

        console.log(pergunta[i].value.length < 20)
        console.log(respostaCorreta[i].value === "")
        console.log(verificarUrl)
        console.log(!verificaColor(color))
        console.log(!verificarRepostasIncorretas(respostaIncorreta))

        if (pergunta[i].value.length < 20 || respostaCorreta[i].value === "" || verificarUrl || !verificaColor(color) || !verificarRepostasIncorretas(respostaIncorreta)) {
            controlador++

        } else {
            controlador = 0

        }
    }

    if (controlador !== 0) {
        alert("Por favor preencha os dados corretamente!");
        limparCampos('tela3-perguntas')

    } else {

        for (let i = 0; i < pergunta.length; i++) {
            let respostas = []
            novoQuizzPeguntas.push({
                title: pergunta[i].value,
                color: color[i].value,
                answers: respostas
            })

            respostas.push(
                {
                    text: respostaCorreta[i].value,
                    image: urlCorreta[i].value,
                    isCorrectAnswer: true
                }

            )


            respostaIncorreta.forEach((element, indice) => {

                if (element.value !== "" && indice < 3 && i === 0) {
                    respostas.push({
                        text: element.value,
                        image: urlRespostaIncorretas[indice].value,
                        isCorrectAnswer: false
                    })
                }

                if (element.value !== "" && indice > 2 && indice < 6 && i === 1) {
                    respostas.push({
                        text: element.value,
                        image: urlRespostaIncorretas[indice].value,
                        isCorrectAnswer: false
                    })
                }

                if (element.value !== "" && indice > 5 && i === 2) {
                    respostas.push({
                        text: element.value,
                        image: urlRespostaIncorretas[indice].value,
                        isCorrectAnswer: false
                    })
                }



            })

        }

        limparCampos('tela3-perguntas')
        criarNiveis()

    }

}

function limparCampos(tela) {
    if (tela === 'tela3') {

        let limpaTitulo = document.querySelector(" .tela3 .titulo1");
        limpaTitulo.value = "";
        let limpaURL = document.querySelector(".tela3 .url-correta");
        limpaURL.value = "";
        let limpaPerguntas = document.querySelector(".tela3 .perguntas1");
        limpaPerguntas.value = "";
        let limpaNiveis = document.querySelector(".tela3 .niveis1");
        limpaNiveis.value = "";

    } else {
        if (tela === 'tela3-perguntas') {

            const pergunta = [...document.querySelectorAll(".tela3-perguntas .questao")];
            const color = document.querySelectorAll(".tela3-perguntas .color");
            const respostaCorreta = [...document.querySelectorAll(".tela3-perguntas .resposta-correta")];
            const respostaIncorreta = [...document.querySelectorAll(".tela3-perguntas .resposta-incorreta")];
            const urlCorreta = [...document.querySelectorAll(".tela3-perguntas .url-correta")];

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

        } else {

            const nivel = [...document.querySelectorAll(".nivel")];
            const porcentagem = [...document.querySelectorAll(".porcentagem")];
            const urlCorreta = [...document.querySelectorAll(".url-correta")];
            const descricao = [...document.querySelectorAll(".descricao")];

            nivel.forEach(element => {
                element.value = '';
            });

            porcentagem.forEach(element => {
                element.value = '';
            });

            urlCorreta.forEach(element => {
                element.value = '';
            });

            descricao.forEach(element => {
                element.value = '';
            });

        }
    }


}


function verificaColor(elemento) {
    let controlador = 0
    regexp = /^#[0-9A-F]{6}$/
    elemento.forEach(element => {

        if (regexp.test(element.value) === false || element.value === "") {
            controlador++

        }
    });

    return (controlador !== 0) ? false : true

}

function verificarURL(tela) {

    const urlCorreta = [...document.querySelectorAll(`.${tela} .url-correta`)]

    let controlador = 0
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;


    for (let i = 0; i < urlCorreta.length; i++) {

        if (regexp.test(urlCorreta[i].value) === false) {
            controlador++
            break;
        }

    }

    return (controlador !== 0) ? false : true
}

function verificarPorcentagem() {


    const porcentagem = [...document.querySelectorAll(`.tela3-niveis .porcentagem`)]

    let nivelZero = 0
    let controlador = 0

    for (let i = 0; i < porcentagem.length; i++) {

        if (parseInt(porcentagem[i].value) === 0) {
            nivelZero++
        } else {
            if ((parseInt(porcentagem[i].value) >= 0 && parseInt(porcentagem[i].value) <= 100)) {
                controlador++
            }
        }

    }


    return (nivelZero !== 0 && controlador !== 0) ? true : false
}

function criarNiveis() {
    const pergunta = document.querySelector(".tela3-perguntas"); //tela 3.1 onde cria as perguntas
    const niveis = document.querySelector(".tela3-niveis"); //tela 3.1 onde cria as perguntas
    pergunta.classList.add("escondido"); //Some com a tela 3 inicial
    niveis.classList.remove("escondido"); //Faz aparecer a tela 3.1 onde cria as perguntas
    document.querySelector(".tela3-perguntas").classList.add("escondido");
    niveis.classList.remove("escondido");

    for (let i = 0; i < qtdNiveis - 1; i++) {
        niveis.innerHTML += `<div class="selecione">
        <h2>Nivel ${i + 2}</h2>
        <ion-icon name="create-outline" onclick="removerEscondido(this,'tela3-niveis', 'p${i + 2}')"></ion-icon>
    </div>
    <div class="cria-niveis p${i + 2} escondido">

        <input type="textarea" class="nivel" placeholder="Titulo do Nivel">
        <input type="textarea" class="porcentagem" placeholder="% de acerto m??nima">
        <input type="url" class="url-correta" placeholder="URL da imagem do n??vel">
        <input type="textarea" class="descricao" placeholder="Descri????o do n??vel">

    </div>`
    }
    //Ap??s o fim do la??o, adiciono o bot??o dinamicamente no final da p??gina



    niveis.innerHTML += `<button class="p-perguntas" onclick="validaInformacoesNiveis()"><p> Finalizar Quizz </p></button>`;

}

function validaInformacoesNiveis() {
    let controlador = 0

    const nivel = [...document.querySelectorAll(".nivel")];
    const porcentagem = [...document.querySelectorAll(".porcentagem")];
    const urlCorreta = [...document.querySelectorAll(".tela3-niveis .url-correta")];
    const descricao = [...document.querySelectorAll(".descricao")];

    for (let i = 0; i < nivel.length; i++) {

        const verificarTituloNivel = nivel[i].value.length < 10
        const verificarDescricao = descricao[i].value.length < 30
        const verificarIntervaloPorcetagem = !verificarPorcentagem()
        const verificarUrl = !verificarURL('tela3-niveis')

        if (verificarTituloNivel || verificarDescricao || verificarIntervaloPorcetagem || verificarUrl) {
            controlador++

        }
    }

    if (controlador !== 0) {
        alert("Por favor preencha os dados corretamente!");
        limparCampos('tela3-niveis')

    } else {
        for (let i = 0; i < nivel.length; i++) {
            novoQuizzNiveis.push({
                title: nivel[i].value,
                image: urlCorreta[i].value,
                text: descricao[i].value,
                minValue: parseInt(porcentagem[i].value)
            })
        }

        criarSucessoQuizz()
    }

}

function criarSucessoQuizz() {

    const sucessoQuizz = document.querySelector(".tela3-sucessoQuizz"); 
    const niveis = document.querySelector(".tela3-niveis"); 
    niveis.classList.add("escondido"); 
    sucessoQuizz.classList.remove("escondido"); 
    document.querySelector(".tela3-sucessoQuizz").classList.remove("escondido");
    document.querySelector(".tela3-niveis").classList.add("escondido");
    document.querySelector(".tela3").classList.add("escondido");

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', {
        title: novoQuizzTitulo,
        image: novoQuizzImagem,
        questions: novoQuizzPeguntas,
        levels: novoQuizzNiveis
    });

    promise.then((resposta) => {
        const quizzFinalizado = document.querySelector('.tela3-sucessoQuizz .quizzFinalizado')

        quizzFinalizado.innerHTML += `

                <div class="quizz ">
                    <figure>
                        <div class="degrade"></div>
                        <img src=${resposta.data.image} />
                        <p>${resposta.data.title}</p>
                    </figcation>    
                </div>
            
            `;
        quizzFinalizado.innerHTML += `
        
        <button class="p-perguntas" onclick ="exibirQuizz('.tela3-sucessoQuizz',${resposta.data.id})"><p> Acessar Quizz </p></button>
        <p class='voltarHome' onclick='voltarHome()'> Voltar pra home </p>
        `;
        
        let localStorageItem = { ids: [] }

        if(localStorage.getItem('buzzquizz-ids')) {
          localStorageItem = JSON.parse(localStorage.getItem('buzzquizz-ids'));
        }
        
        localStorageItem.ids.push(resposta.data.id);
        
        localStorage.setItem('buzzquizz-ids', JSON.stringify(localStorageItem));
    })

}

function substituirTelaCriaQuizz(element,tamanho){
    const criarQ = document.querySelector(".criarQuizz");
    criarQ.innerHTML = "";
    for(let i = 0; i < tamanho; i++ ){
        criarQ.innerHTML += `<div class="botao-criarQuiz">
        <h1>Seus Quizzes</h1>
        <ion-icon name="add-circle-outline"></ion-icon>
        </div>
        <div class="seus-quizzes">
        <div class="quizz " onclick ="exibirQuizz('.criarQuizz',${element.id})" >
        <figure>
            <div class="degrade"></div>
                <img src=${element.image} />
                <p>${element.title}</p>
        </figcation>    
             </div>
        </div>
        `;
    }
}

function comparador() {
    return Math.random() - 0.5;
}