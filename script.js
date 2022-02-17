
function listarTodosQuizzes(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta)=>{
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

function exibirQuizz(quizz){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta)=>{
        resposta.data.forEach(element => {
            if(element.id === quizz){
                document.querySelector('main').classList.add('mainTela2')
                document.querySelector('.criarQuizz').classList.add('escondido')
                document.querySelector('.todosQuizzes').classList.add('escondido')

                const tela2 = document.querySelector('.tela2')
                // console.log(element.questions[0])
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

function criarQuiz(){
    window.location.href = "criacaoQuiz.html";
}

function irCriarPerguntas(){
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
        let limpaTitulo = document.querySelector(".titulo1");
        limpaTitulo.value = "";
        let limpaURL = document.querySelector(".url1");
        limpaURL.value = "";
        let limpaPerguntas = document.querySelector(".perguntas1");
        limpaPerguntas.value = "";
        let limpaNiveis = document.querySelector(".niveis1");
        limpaNiveis.value = "";
        window.location.href = "https://www.google.com/"; 
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