let qtdNiveis = null;
let qtdPerguntas = null;


function listarTodosQuizzes(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta)=>{
        const todosQuizzes = document.querySelector('.todosQuizzes')
        todosQuizzes.innerHTML = '<h2>Todos os Quizzes</h2>'

        resposta.data.forEach(element => {
            todosQuizzes.innerHTML += `

                <div class="quizz " onclick ='exibirQuizz(${element.id})' >
                    <figure>
                        <div class="degradê"></div>
                        <img src=${element.image} />
                        <p>${element.title}</p>
                    </figcation>    
                </div>
            
            `
        });
    })
}

function exibirQuizz(quizz){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta)=>{
        resposta.data.forEach(element => {
            if(element.id === quizz){
            console.log(element) // vai criar a tela 2 
            }
        })

    })
}

listarTodosQuizzes()

function criarQuiz(){
    window.location.href = "criacaoQuiz.html";
}

function validaInformacoesBasicas(){
    const titulo = document.querySelector(".titulo1").value;
    const url = document.querySelector(".url1").value;
    const perguntas = document.querySelector(".perguntas1").value;
    const niveis = document.querySelector(".niveis1").value;
    let condicoes = 0;
    let flag = false;
    if(((url.indexOf("http://") !== -1)||(url.indexOf("https://") !== -1))){
        flag = true;
    }
    if((titulo.length >= 20 && titulo.length <= 65) && (niveis >= 2) && (perguntas >= 3) && flag === true ){
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
        // window.location.href = "criacaoQuizPerguntas.html";
    }else{
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

// function criarPerguntas(){
//     const pergunta = document.querySelector(".tela3-perguntas");
//     for(let i = 0; i < qtdPerguntas; i++){
//         pergunta.innerHTML += `<h1>Crie suas perguntas</h1>
//         <section class="perguntas-respostas">
//             <div class="pergunta">
//                 <div.texto>
//                     <h2>Pergunta ${i+1}</h2>
//                     <ion-icon name="create-outline" onclick="apareceCriacaoDaPergunta()"></ion-icon>
//                 </div>
//                 <div class="pergunta${i+1}">
//                 <input type="textarea" class="questao" placeholder="Texto da pergunta">
//                 <input type="color" class="textarea" placeholder="Cor de fundo da pergunta">
//                 <h2>Resposta correta</h2>
//                 <input type="textarea" class="resposta-correta" placeholder="Resposta correta">
//                 <input type="url" class="url-correta">
//                 <h2>Respostas incorretas</h2>
//                 <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 1">
//                 <input type="url" class="URL-resposta" placeholder="URL da imagem 1">
//                 <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 2">
//                 <input type="url" class="URL-resposta" placeholder="URL da imagem 2">
//                 <input type="textarea" class="resposta-incorreta" placeholder="Resposta incorreta 3">
//                 <input type="url" class="URL-resposta" placeholder="URL da imagem 3">
//                 </div>
//             </div>`
//     }
// }

