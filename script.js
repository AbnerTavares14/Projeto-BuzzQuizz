
function listarTodosQuizzes(){

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')

    promise.then((resposta)=>{
        const todosQuizzes = document.querySelector('.todosQuizzes')
        todosQuizzes.innerHTML = '<h2>Todos os Quizzes</h2>'

        resposta.data.forEach(element => {
            todosQuizzes.innerHTML += `

                <div class="quizz">
                    <figure>
                        <img src=${element.image} />
                        <p>${element.title}</p>
                    </figcation>    
                </div>
            
            `
            console.log(element)
        });
    })
}

listarTodosQuizzes()

function criarQuiz(){
    window.location.href = "criacaoQuiz.html";
}

function irCriarPerguntas(){
    let re = "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?";
    const titulo = document.querySelector(".titulo1").value;
    const url = document.querySelector(".url1").value;
    const perguntas = document.querySelector(".perguntas1").value;
    const niveis = document.querySelector(".niveis1").value;
    let condicoes = 0;
    if((titulo.length >= 20 && titulo.length <= 65) && (niveis >= 2) && (perguntas >= 3)){
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