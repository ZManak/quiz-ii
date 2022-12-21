//Fetch preguntas
async function getQuestions() {
    let resp = await fetch("https://opentdb.com/api.php?amount=10");
    let rawData = await resp.json();
    return rawData
}

//Pintar preguntas

function printQuestions(rawData) {
    const lienzo = document.getElementById("lienzo");
    console.log(rawData.results[0].question)
    console.log(rawData.results)
    console.log(rawData);
    const arrQuest = (({ results }) => ({ results }))(rawData);
    console.log(arrQuest)
    const comp = [];
    comp.push(...arrQuest.results);
    console.log(comp);
    return comp;

}
    /*for (let i = 0; i < rawData.results.lenght; i++) {
        let tarjeta = document.createElement("div");

        tarjeta.innerHTML =
            `   <legend>${rawData.results[0].question}</legend>´
        <div>
        <input id=${lasPreguntas[i].respuestas[0]} type="radio" name=pregunta` + [i] + ` value=${lasPreguntas[i].respuestas[0]}>
        <label for=${lasPreguntas[i].respuestas[0]}>${lasPreguntas[i].respuestas[0]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[1]} type="radio" name=pregunta` + [i] + ` value=${lasPreguntas[i].respuestas[1]}>
        <label for=${sPreguntas[i].respuestas[1]}>${lasPreguntas[i].respuestas[1]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[2]} type="radio" name=pregunta` + [i] + ` value=${lasPreguntas[i].respuestas[2]}>
        <label for=${lasPreguntas[i].respuestas[2]}>${lasPreguntas[i].respuestas[2]}</label>
        </div>
        <div>
        <input id=${lasPreguntas[i].respuestas[3]} type="radio" name=pregunta` + [i] + ` value=${lasPreguntas[i].respuestas[3]}>
        <label for=${lasPreguntas[i].respuestas[3]}>${lasPreguntas[i].respuestas[3]}</label>
        </div>
        </fieldset >`


        lienzo.appendChild(tarjeta);
        //return tarjeta*/



getQuestions()
    .then(rawdata => {
        printQuestions(rawdata)
    })
    .catch(error => alert("Error en el fetch" + error));