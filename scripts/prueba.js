// const arrayPelis = [];
// const arrayFechas =[];
// async function starWars() {

//     const resultado = await fetch(`https://swapi.dev/api/films/`);
//     const baseDatos = await resultado.json();
//     let listaPeliculas = baseDatos.results;

//     for (let i = 0; i < listaPeliculas.length; i++) {

//         arrayPelis.push(listaPeliculas[i].title)
//         arrayFechas.push((listaPeliculas[i].release_date.slice(0,4)));
        
//     }
// }

const lienzo = document.getElementsByClassName("pantalla_preguntas")[0]

const arrayPreguntas = [];
const arrayRespuestas = [];
let contador = 0
let aciertos = 0

async function sacarPreguntas() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let rawData = await resp.json();
    let listaPreguntas = rawData.results
    for (let i = 0; i < listaPreguntas.length; i++)
        arrayPreguntas.push(listaPreguntas[i])
}

function printQuestions(arrayPreguntas, lienzo) {
    
    for (let i = 0; i < arrayPreguntas.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "pregunta" + i);
        tarjeta.setAttribute("id", "pregunta" + i);
        const que = randomizar([arrayPreguntas[i].correct_answer, arrayPreguntas[i].incorrect_answers[0], arrayPreguntas[i].incorrect_answers[1], arrayPreguntas[i].incorrect_answers[2]])
        let q1 = que()
        let q2 = que()
        let q3 = que()
        let q4 = que()

        tarjeta.innerHTML =
            `<fieldset>
        <legend id=${i}>${arrayPreguntas[i].question}</legend>
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

function activarBotones() {
    const botones = [];
    for (let i = 0; i <= 9; i++) {
        let boton = document.querySelector(`.btnPreguntas${i}`);
        console.log(boton)
        botones.push(boton);

    }
    botones.forEach((element) => element.addEventListener("click", rotar));
    // añadimos evento de al clickar el boton comenzar a jugar haga la funcion empezar.
    document.getElementById("botonEmpezar").addEventListener("click", empezar);

}

function empezar() {
    const primeraPregunta = document.querySelector(".pregunta0");
    primeraPregunta.style.display = "block";

    const pantallaInicial = document.querySelector(".pantalla_inicial");
    pantallaInicial.style.display = "none";
}

function rotar() {
    
    if (contador === 9) {
        pantallaFinal();
    } else {
        ocultarPregunta(contador);
        mostrarPregunta(++contador);
    };
}

// funcion que muestra la pregunta
function mostrarPregunta(contador) {
    const pregunta = document.querySelector(".pregunta" + contador);
    pregunta.style.display = "block";
    contador++;
}

//funcion que oculta la pregunta
function ocultarPregunta(contador) {
    const pregunta = document.getElementById("pregunta" + contador);
    pregunta.style.display = "none";
}

function pantallaFinal() {
    let respuestas = document.querySelectorAll('input:checked')
    
    for (let i = 0; i < arrayPreguntas.length; i++) {
        let chosen = respuestas[i].value
        arrayRespuestas.push(chosen)  
       }
    
    validar()

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

function validar() {
    if (arrayRespuestas.length !== arrayPreguntas.length) {
        alert("No se respondieron todas")
        pantallaFinal()
    }
    for (let i = 0; i < arrayPreguntas.length; i++){
        if (arrayRespuestas[i] === arrayPreguntas[i].correct_answer.split(' ').join('')){
            aciertos++
        }
    }
}

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




async function startQuiz() {
    await sacarPreguntas();
    printQuestions(arrayPreguntas, lienzo)
    activarBotones();
}


startQuiz()

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