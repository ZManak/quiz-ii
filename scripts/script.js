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

//boton final de las  10 preguntas para mostrar la pantalla final.







// //LOGICA DE HTML IMPRIMIR UNA PREGUNTA POR PAGINA ARRIBA.


// const arrayAciertos =[];


// async function grafica (){

//   const resultado = await fetch (grafica fire base);
//   const baseDatos = await resultado.json();
//   let listaResultados = baseDatos.results;

//   for (let i = 0; i < listaResultados.length; i++) {

//     arrayAciertos.push(listaResultados[i])


// }
// const data = {
//   labels: preguntas,
//   series:[arrayAciertos],
// }


// const options = {
// width: '40%',
// height: '30%',
// // Don't draw the line chart points
// showPoint: true,
// // Disable line smoothing
// lineSmooth: false,
// // X-Axis specific configuration
// axisX: {
//     // We can disable the grid for this axis
//     showGrid: true,
//     // and also don't show the label
//     showLabel: true,
// },
// // Y-Axis specific configuration
// axisY: {
//     // Lets offset the chart a bit from the labels
//     // stepSize: 1,//opciones para definir Y
//     low: 1977,
//     high: 2005,
//     scaleMinSpace: 10,
//     divisor: preguntas.length,
//     onlyInteger: true,
//     ticks: arrayAciertos,
//     stepSize: 3,
//     // The label interpolation function enables you to modify the values
//     // used for the labels on each axis. Here we are converting the
//     // values into million pound.
//     // labelInterpolationFnc: function (value) {
//     //     return (value);
//     // }
// }
// };

// }
// hecho por javi en clase
// let contador = 0;

// // // }

// function empezar() {

//   const pregunta1 = document.querySelector(".pregunta0");
//   pregunta1.style.display = "block";

//   const pantallaInicial = document.querySelector(".pantalla_inicial");
//   pantallaInicial.style.display = "none";
// };

// function mostrarPregunta(contador) {

//   const pregunta = document.querySelector(".pregunta" + contador);
//   //pregunta.forEach(pregunta => {
//     pregunta.style.display = "block";
//   };

// function ocultarPregunta(numPregunta) {
//   document.getElementById("pregunta" + numPregunta).style.display = "none";
// }

// // Esta tiene que ser la ultima funcion para que imprima la pagina de resultado final
// function pantallaFinal() {
//   const pregunta3 = document.querySelector(".pregunta3");
//     pregunta3.style.display = "none";
//   };

//   const pantallaPreguntas = document.querySelectorAll(".pantalla_preguntas");
//   pantallaPreguntas.forEach(pantallaPreguntas => {
//     pantallaPreguntas.style.display = "none";
//   });

//   const ultimaPantalla = document.querySelector(".pantalla_final");
//   //ultimaPantalla.forEach(pantallaFinal =>
//   ultimaPantalla.style.display = "block";

// document.getElementById("botonEmpezar").addEventListener("click", empezar)

// let botones = []
// for (i = 0; i <= 10; i++) {
//   let boton = document.querySelector(".btnPreguntas" + i)
//   botones.push(boton)
// }

// document.querySelector(".btnPreguntas" + contador).addEventListener("click", rotar(contador))

// function rotar(contador) {
//       if (contador = botones.length) {
//       pantallaFinal()
//     } else {
//       ocultarPregunta(contador);
//       mostrarPregunta(contador++)
//     }
//   contador++
//   return contador
//   }

// hecho por javi en clase  lo de arriba.








// // JS DE GRAFICAS

// async function makeSWFilmsChart() {
//   let resultado = await fetch("");
//   let dataBase = await resultado.json();
//   const filmList = dataBase.results;
//   const arrCorrectas = filmList.map(element => element.  );
//   const arrIncorrectas = filmList.map(element => element)

//   var data = {
//     labels: arrCorrectas,
//     series: [arrIncorrectas]
//   };
//   var options = {

//     width: 1000,
//     height: 500,
//     onlyInteger: true,
//     showPoint: true,
//     showArea: true,
//     lineSmooth: true,
//     axisX: {
//       offset:80
//     },
//     axisY: {
//       scaleMinSpace: 1,
//       onlyInteger: true,
//       offset: 80,
//       labelInterpolationFnc: function (value) {
//         return '' + value + '';
//       }
//     }

//   };
//   new Chartist.Line('.ct-chart', data, options);
// }
// makeSWFilmsChart();

