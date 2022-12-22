const lienzo = document.getElementsByClassName("pantalla_preguntas")[0]

//Fetch preguntas
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    let rawData = await resp.json();
    return rawData
}
//Randomizar preguntas
function randomizar(array) {
    let copia = Array.from(array); // Create a copy of input array
    return function()  {
        if (copia.length < 1) { copia = Array.from(array); } // This line exist to create copy and make a new array from actual array whenever all possible options are selected once
        const index = Math.floor(Math.random() * copia.length); // Select an index randomly
        const item = copia[index]; // Get the index value
        copia.splice(index, 1); // Remove selected element from copied array
        return item; // Return selected element
      };
  }
//Pintar preguntas

function printQuestions(rawData, lienzo) {
    console.log(rawData.results[0].question)
    console.log(rawData.results)
    console.log(rawData);
    const arrQuest = (({ results }) => ({ results }))(rawData);
    console.log(arrQuest)
    const comp = [];
    comp.push(...arrQuest.results);
    console.log(comp);
    console.log(comp[0].incorrect_answers[2])
    for (let i = 0; i < comp.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "pregunta" + i);
        tarjeta.setAttribute("id", "pregunta" + i);
        const answers = randomizar([comp[i].correct_answer, comp[i].incorrect_answers[0], comp[i].incorrect_answers[1], comp[i].incorrect_answers[2]])
        //const copiaAnswers = answers;
        console.log(answers)
        //console.log(copiaAnswers())
        tarjeta.innerHTML =
            `<fieldset>
        <legend id=`+i+`>${comp[i].question}</legend>
        <div>
        <input class="pregunta`+ i + `" id="a`+i+`" type="radio" name=pregunta` + i + `" value=${answers}>
        <label for="a`+ i +`">${answers()}</label>
        </div>
        <div>
        <input class="pregunta`+ i + `" id="b` + i +`" type="radio" name=pregunta` + i + `" value=${comp[i].type}>
        <label for="b`+ i +`">${answers()}</label>
        </div>
        <div>
        <input class="pregunta`+ i + `" id="c` + i +`" type="radio" name=pregunta` + i + `" value=${comp[i].type}>
        <label for="c`+ i +`">${answers()}</label>
        </div>
        <div>
        <input class="pregunta`+ i + `" id="d` + i +`" type="radio" name=pregunta` + i + `" value=${comp[i].type}>
        <label for="d`+ i +`">${answers()}</label>
        </div>
        </fieldset >
        <button class="btnPreguntas`+i+` boton">SIGUIENTE PREGUNTA</button>`

        lienzo.appendChild(tarjeta);
    }
}

getQuestions()
    .then((rawData) => {
        printQuestions(rawData, lienzo)
    })
    .catch(error => alert("Error en el fetch" + error));



//LOGICA DE HTML IMPRIMIR UNA PREGUNTA POR PAGINA

let contador = 0;

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
    const ultimaPregunta = document.querySelector(".pregunta3");
    ultimaPregunta.style.display = "none";

    const pantallaFinal = document.querySelector(".pantalla_final");
    pantallaFinal.style.display = "block";

    const todasLasPantallasPreguntas = document.querySelectorAll(
        ".pantalla_preguntas"
    );
    todasLasPantallasPreguntas.forEach(
        (pantalla) => (pantalla.style.display = "none")
    );
}

// añadimos evento de al clickar el boton comenzar a jugar haga la funcion empezar.
document.getElementById("botonEmpezar").addEventListener("click", empezar);

// recorremos los botones de la pagina.
const botones = [];
for (let i = 0; i < 10; i++) {
    const boton = document.querySelector(".btnPreguntas" + i);
    botones.push(boton);
}

botones.forEach((element) => element.addEventListener("click", rotar));

// funcion de cambiar de pregunta. al clickar siguiente pregunta, desaparece la pregunta actual y aparece la siguiente pregunta.

function rotar() {
    if (contador === 3) {// cambiar a longitud del botones 10.) {
        pantallaFinal();
    } else {
        ocultarPregunta(contador);
        mostrarPregunta(++contador);
    };
}


