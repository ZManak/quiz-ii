const lienzo = document.getElementsByClassName("pantalla_preguntas")[0]
let aciertos = 0
//Fetch preguntas
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let rawData = await resp.json();
    return rawData
}
//Randomizar preguntas
function randomizar(array) {
    let copia = Array.from(array); // Create a copy of input array
    return function () {
        if (copia.length < 1) { copia = Array.from(array); } // This line exist to create copy and make a new array from actual array whenever all possible options are selected once
        const index = Math.floor(Math.random() * copia.length); // Select an index randomly
        const item = copia[index]; // Get the index value
        copia.splice(index, 1); // Remove selected element from copied array
        return item; // Return selected element
    };
}
//Pintar preguntas

function printQuestions(rawData, lienzo) {
    const arrQuest = (({ results }) => ({ results }))(rawData);
    const comp = [];
    comp.push(...arrQuest.results);
    for (let i = 0; i < comp.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "pregunta" + i);
        tarjeta.setAttribute("id", "pregunta" + i);
        const que = randomizar([comp[i].correct_answer, comp[i].incorrect_answers[0], comp[i].incorrect_answers[1], comp[i].incorrect_answers[2]])
        let q1 = que()
        let q2 = que()
        let q3 = que()
        let q4 = que()

        tarjeta.innerHTML =
            `<fieldset>
        <legend id=${i}>${comp[i].question}</legend>
        <div>
        <input class="pregunta" id="a${i}" type="radio" name=pregunta${i}" value=${q1.split(' ').join('')}>
        <label id=r${i}0 for="a${i}">${q1}</label>
        </div>
        <div>
        <input class="pregunta" id="b${i}" type="radio" name=pregunta${i}" value=${q2.split(' ').join('')}>
        <label id=r${i}1 for="b${i}">${q2}</label>
        </div>
        <div>
        <input class="pregunta" id="c${i}" type="radio" name=pregunta${i}" value=${q3.split(' ').join('')}>
        <label id=r${i}2 for="c${i}">${q3}</label>
        </div>
        <div>
        <input class="pregunta" id="d${i}" type="radio" name=pregunta${i}" value=${q4.split(' ').join('')}>
        <label id=r${i}3 for="d${i}">${q4}</label>
        </div>
        </fieldset >
        <button class="btnPreguntas${i} boton">SIGUIENTE PREGUNTA</button>`

        lienzo.appendChild(tarjeta);
    }

}
// recorremos los botones de la pagina.
function activarBotones() {
    const botones = [];
    for (let i = 0; i <= 9; i++) {
        let boton = document.querySelector(".btnPreguntas" + i);
        botones.push(boton);
    }
    botones.forEach((element) => element.addEventListener("click", rotar));
    // añadimos evento de al clickar el boton comenzar a jugar haga la funcion empezar.
    document.getElementById("botonEmpezar").addEventListener("click", empezar);
}

const elegidas = []
const correctas = []
async function iniciarQuiz() {
    const questions = await getQuestions()
    printQuestions(questions, lienzo)
    activarBotones()
    document.querySelector("").addEventListener("click", validar)
    }

iniciarQuiz()
//LOGICA DE HTML IMPRIMIR UNA PREGUNTA POR PAGINA

let contador = 0;
function validar(data) {
    let aciertos = 0;
    const arrQuest2 = (({ results }) => ({ results }))(data);
    const comp2 = [];
    comp2.push(...arrQuest2.results);
    console.log(comp2.correct_answer)
    const choices = document.querySelectorAll(
        "input[type='radio']:checked");
    console.log(choices[i].value)
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].value === comp2[i].correct_answer.split(' ').join('')) {
        aciertos++
        }
    }
    return aciertos
}
// funcion que al apretar el boton de comenzar a jugar, se oculte la pantalla princial y salga la primera pregunta.
function empezar() {
    const primeraPregunta = document.querySelector(".pregunta0");
    primeraPregunta.style.display = "block";

    const pantallaInicial = document.querySelector(".pantalla_inicial");
    pantallaInicial.style.display = "none";
}

// funcion que muestra la pregunta
function mostrarPregunta(contador) {
    const pregunta = document.querySelector(".pregunta" + contador);
    pregunta.style.display = "block";
    contador++;
}

//funcion que oculta la pregunta
function ocultarPregunta(numPregunta) {
    const pregunta = document.getElementById("pregunta" + numPregunta);
    pregunta.style.display = "none";
}

//funcion que imprime la pantalla final
function pantallaFinal() {
    const ultimaPregunta = document.querySelector(".pregunta9");
    ultimaPregunta.style.display = "none";

    const pantallaFinal = document.querySelector(".pantalla_final");
    pantallaFinal.style.display = "block";

    let results = document.querySelector("#numCorrectas");
    results.innerHTML = `${aciertos}/10`

    const todasLasPantallasPreguntas = document.querySelectorAll(
        ".pantalla_preguntas"
    );
    todasLasPantallasPreguntas.forEach(
        (pantalla) => (pantalla.style.display = "none")
    );
}






// funcion de cambiar de pregunta. al clickar siguiente pregunta, desaparece la pregunta actual y aparece la siguiente pregunta.

function rotar() {
    if (contador === 9) {// cambiar a longitud del botones 10.) {
        pantallaFinal();
    } else {
        ocultarPregunta(contador);
        mostrarPregunta(++contador);
    };
}

var data = {
    // A labels array that can contain any sort of values
    labels: ['fechas', 'fechas', 'fechas', 'fechas', 'fechas'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [10, 2, 4, 4, ]
    ]
  };
  var options = {
    onlyInteger: true,
    low:0,
    axisX: {
      offset:200
    },
    axisY: {
      onlyInteger: true,
      offset: 80,
      labelInterpolationFnc: function (value) {
        return '' + value + '';
      }
    }
  };
  
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
  new Chartist.Bar('.ct-chart', data, options);

