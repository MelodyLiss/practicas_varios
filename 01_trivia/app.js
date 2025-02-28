//Variable de preguntas y respuestas
let preguntas = {};

//Variables de control
let puntaje = 0;
let contador = 0;
let limitePreguntas = 10;
let preguntaActual = "";
let respuestaSeleccionada = "";

// Variables del Dom
const nPreguntaTxt = document.querySelector('#pregunta__digito');
const preguntaTxt = document.querySelector('.pregunta__titulo');
const alternativasBnt = document.querySelectorAll('.alternativa');
const categoriaTxt = document.querySelector('#categoria');
const mensajeTxt = document.querySelector('#mensajeCorroborar');
const contenedorAlternativas = document.querySelector('.contenedor__alternativas');
const rCorrectasTxt = document.querySelector('#rCorrectas');
const rIncorrectasTxt = document.querySelector('#rIncorrectas');
const btnReinicio = document.querySelector('#btnReinicio');

//Funciones 
const cargarPreguntas = async () => {
    const categorias = [
        'matematica',
        'reinoAnimal',
        'historiaUniversal',
        'quimica',
        'biologia',
        'fisica',
        'lenguaje',
        'arte',
        'astronomia',
        'geografia'
    ];    

    for (const categoria of categorias) {
        const response = await fetch(`./preguntas/${categoria}.json`);
        const data = await response.json();
        preguntas[categoria] = data;

    }

    mostrarPregunta();
};


const mostrarPregunta = () => {
    nPreguntaTxt.textContent = contador + 1;
    let categoriasPregunta = Object.keys(preguntas);
    let nCategoriaAleatoria = Math.floor(Math.random() * categoriasPregunta.length);
    let categoriaElegida = categoriasPregunta[nCategoriaAleatoria];
    categoriaTxt.textContent = categoriaElegida;

    let nPreguntaAleatoria = Math.floor(Math.random() * preguntas[categoriaElegida].length);
    preguntaActual = preguntas[categoriaElegida][nPreguntaAleatoria];
    preguntaTxt.textContent = preguntaActual.pregunta;

    alternativasBnt.forEach((boton, index) => {
        boton.textContent = preguntaActual.alternativas[index];
    });

    preguntas[categoriaElegida].splice(nPreguntaAleatoria, 1);
};

const seleccionarRespuesta = (e) => {
    alternativasBnt.forEach((boton) => {
        boton.disabled = true;
    });

    let botonSeleccionado = e.target; // Captura el botón clickeado
    respuestaSeleccionada = botonSeleccionado.textContent;

    if (respuestaSeleccionada === preguntaActual.respuesta) {
        puntaje++;

        botonSeleccionado.classList.add("correcto"); // Poner fondo verde
    } else {
        botonSeleccionado.classList.add("incorrecto"); // Poner fondo rojo

        // También marcar la respuesta correcta en verde
        alternativasBnt.forEach((boton) => {
            if (boton.textContent === preguntaActual.respuesta) {
                boton.classList.add("correcto");
            }
        });


    }

    setTimeout(() => {
        mensajeTxt.textContent = "";
        mensajeTxt.classList.remove("correcto", "incorrecto");

        // Eliminar los estilos de color de los botones
        alternativasBnt.forEach((boton) => {
            boton.classList.remove("correcto", "incorrecto");
            boton.disabled = false;
        });

        contador++;

        if (contador < limitePreguntas) {
            mostrarPregunta();
        } else {
            resultados();

            alternativasBnt.forEach((boton) => {
                boton.textContent = "";
                boton.removeEventListener("click", seleccionarRespuesta);
            });
        }
    }, 1000); // Retraso de 1 segundo para mostrar los colores antes de cambiar de pregunta
};

const resultados = () => {

    document.querySelector('.pantalla_final').classList.remove('oculto');
    document.querySelector('.pregunta__contenedor').classList.add('oculto');

    let  rIncorrectas = limitePreguntas - puntaje //valor2
    let porcentajeCorrecto = Math.round((puntaje/limitePreguntas)*100);
    let porcentajeIncorrecto = Math.round((rIncorrectas/limitePreguntas)*100);

    rCorrectasTxt.innerHTML =`<p>${porcentajeCorrecto} %</p>`
    rCorrectasTxt.style.width= `${porcentajeCorrecto}%`
    rIncorrectasTxt.innerHTML =`<p>${porcentajeIncorrecto} %</p>`
    rIncorrectasTxt.style.width= `${porcentajeIncorrecto}%`

    document.querySelector('#nCorrectas').innerHTML = puntaje
    document.querySelector('#nTotal').innerHTML = limitePreguntas

};


const reiniciarJuego = async () => {

    document.querySelector('.pantalla_final').classList.add('oculto');
    document.querySelector('.pregunta__contenedor').classList.remove('oculto');
    
    puntaje = 0;
    contador = 0;
    preguntas = {}; 

    alternativasBnt.forEach((boton) => {
        boton.addEventListener("click", seleccionarRespuesta);
        boton.disabled = false;
    });

    await cargarPreguntas();
};


alternativasBnt.forEach((boton) => {
    boton.addEventListener("click", seleccionarRespuesta);
});

btnReinicio.addEventListener("click",reiniciarJuego)

cargarPreguntas();