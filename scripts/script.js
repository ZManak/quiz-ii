let principal = document.querySelector("main")
let seccion = document.querySelector("section")

//Fetch preguntas
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10");
    let rawData = await resp.json();
    return rawData
}

let questions = getQuestions();

//Pintar preguntas
function printQuestions(questions) {
    let tarjeta = document.createElement("div");
    seccion.appendChild(tarjeta)
    let card = `<fieldset>
        <legend id=pregunta`+i+`>${lasPreguntas[i].pregunta}</legend>
        <div>
        <input id=${lasPreguntas[i].respuestas[0]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[0]}>
        <label for=${lasPreguntas[i].respuestas[0]}>${lasPreguntas[i].respuestas[0]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[1]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[1]}>
        <label for=${lasPreguntas[i].respuestas[1]}>${lasPreguntas[i].respuestas[1]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[2]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[2]}>
        <label for=${lasPreguntas[i].respuestas[2]}>${lasPreguntas[i].respuestas[2]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[3]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[3]}>
        <label for=${lasPreguntas[i].respuestas[3]}>${lasPreguntas[i].respuestas[3]}</label>
        </div>
        </fieldset >`
    return tarjeta
}

getQuestions()

