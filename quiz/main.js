const questions = [
  {
    question: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
    answers: [
      "Exibir uma mensagem de erro",
      "Imprimir dados no console",
      "Criar uma variável",
    ],
    correct: 1,
  },
  {
    question: "Qual é a função do operador '===' em comparações em JavaScript?",
    answers: [
      "Comparação de valores sem considerar o tipo",
      "Atribuição de valores",
      "Comparação estrita de valores e tipos",
    ],
    correct: 2,
  },
  {
    question: "Como se declara uma variável em JavaScript?",
    answers: [
      "let myVar;",
      "const myVar = 10;",
      "ambas as opções acima estão corretas",
    ],
    correct: 2,
  },
  {
    question: "O que é uma função em JavaScript?",
    answers: [
      "Um tipo de dado",
      "Um bloco de código reutilizável",
      "Uma variável global",
    ],
    correct: 1,
  },
  {
    question:
      "Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
    answers: [
      "Nenhuma, são sinônimos",
      "let é usado para valores constantes, const para variáveis",
      "let permite reatribuição, const cria variáveis imutáveis",
    ],
    correct: 2,
  },
  {
    question: "O que é o DOM em JavaScript?",
    answers: [
      "Um método de criptografia",
      "Um modelo de objeto para manipular documentos HTML",
      "Uma linguagem de programação",
    ],
    correct: 1,
  },
  {
    question:
      "Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
    answers: [
      "Usando a estrutura 'if-else'",
      "Com a declaração 'switch'",
      "Utilizando loops como 'for' ou 'forEach'",
    ],
    correct: 2,
  },
  {
    question: "O que é o JSON em JavaScript?",
    answers: [
      "Um método de formatação de texto",
      "Uma linguagem de estilização",
      "Um formato de dados leve e intercambiável",
    ],
    correct: 2,
  },
  {
    question: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
    answers: [
      "São iguais, usados de forma intercambiável",
      "'null' representa a ausência de valor, 'undefined' é atribuído explicitamente",
      "Ambos representam valores vazios",
    ],
    correct: 1,
  },
  {
    question:
      "Como se adiciona um evento a um elemento HTML usando JavaScript?",
    answers: [
      "Apenas com CSS",
      "Usando o atributo 'event'",
      "Através do método 'addEventListener'",
    ],
    correct: 2,
  },
];

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");
const corrects = new Set();
const showTotal = document.querySelector("#hits span");
showTotal.textContent = corrects.size + " de " + questions.length;

for (const item of questions) {
  const quizItem = template.content.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.question;

  for (let answer of item.answers) {
    const dt = quizItem.querySelector("dl dt").cloneNode(true);
    dt.querySelector("span").textContent = answer;
    dt.querySelector("input").setAttribute(
      "name",
      "question-" + questions.indexOf(item)
    );
    dt.querySelector("input").value = item.answers.indexOf(answer);
    dt.querySelector("input").onchange = (e) => {
      const isCorrect = e.target.value == item.correct;

      corrects.delete(item);

      if (isCorrect) {
        corrects.add(item);
      }

      showTotal.textContent = corrects.size + " de " + questions.length;
    };

    quizItem.querySelector("dl").appendChild(dt);
  }

  quizItem.querySelector("dl dt").remove();

  quiz.appendChild(quizItem);
}
