
function siguientePregunta(numPregunta) {
     document.getElementById("pregunta" + numPregunta).style.display = "none";
}


function p1(){

      const pregunta1 = document.querySelectorAll(".pregunta1");
      pregunta1.forEach(pregunta1 => {
        pregunta1.style.display = "block";
      });

      const pantallaInicial = document.querySelectorAll(".pantalla_inicial");
      pantallaInicial.forEach(pantallaInicial => {
        pantallaInicial.style.display = "none";
      });

  }  

function p2(){
    const pregunta2 = document.querySelectorAll(".pregunta2");
    pregunta2.forEach(pregunta2 => {
        pregunta2.style.display = "block";
      });
}

function p3(){
    const pregunta3 = document.querySelectorAll(".pregunta3");
    pregunta3.forEach(pregunta3 => {
        pregunta3.style.display = "block";
      });
}

// Esta tiene que ser la ultima funcion para que imprima la pagina de resultado final
function p4(){
    const pregunta4 = document.querySelectorAll(".pregunta4");
    pregunta4.forEach(pregunta4 => {
        pregunta4.style.display = "block";
      });

      const pantallaPreguntas = document.querySelectorAll(".pantalla_preguntas");
      pantallaPreguntas.forEach(pantallaPreguntas => {
        pantallaPreguntas.style.display = "none";
      });
    
      const pantallaFinal = document.querySelectorAll(".pantalla_final");
      pantallaFinal.forEach(pantallaFinal => {
        pantallaFinal.style.display = "block";
      });

}


