//Fetch preguntas
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10");
    let rawData = await resp.json();
    return rawData
}

//Pintar preguntas

function printQuestions(rawData) {
    const lienzo = document.getElementById("lienzo");
    let tarjeta = document.createElement("div");
    tarjeta.innerHTML = "HOLA" + 
    ` <h1>${rawData.results[1].incorrect_answers}</h1>`
    console.log(rawData.results)
        /*<div>
        <input id=${lasPreguntas[i].respuestas[0]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[0]}>
        <label for=${lasPreguntas[i].respuestas[0]}>${lasPreguntas[i].respuestas[0]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[1]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[1]}>
        <label for=${sPreguntas[i].respuestas[1]}>${lasPreguntas[i].respuestas[1]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[2]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[2]}>
        <label for=${lasPreguntas[i].respuestas[2]}>${lasPreguntas[i].respuestas[2]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[3]} type="radio" name=pregunta`+[i]+` value=${lasPreguntas[i].respuestas[3]}>
        <label for=${lasPreguntas[i].respuestas[3]}>${lasPreguntas[i].respuestas[3]}</label>
        </div>
        </fieldset >`*/
    
        
        lienzo.appendChild(tarjeta);
        return tarjeta
}

getQuestions()
    .then(rawdata => {
        printQuestions(rawdata)
    })
    .catch(error => alert("Busca otro pokemon" + error));