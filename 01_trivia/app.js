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
const mensajeTxt = document.querySelector('#mensaje');
const contenedorAlternativas = document.querySelector('.contenedor__alternativas');

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

    respuestaSeleccionada = e.target.textContent;

    if (respuestaSeleccionada === preguntaActual.respuesta) {
        puntaje++;
        mensajeTxt.textContent = "¡Correcto!";
        mensajeTxt.classList.add("correcto");
        mensajeTxt.classList.remove("incorrecto");
    } else {
        mensajeTxt.textContent = "Incorrecto";
        mensajeTxt.classList.add("incorrecto");
        mensajeTxt.classList.remove("correcto");
    }

    setTimeout(() => {
        mensajeTxt.textContent = "";
        mensajeTxt.classList.remove("correcto", "incorrecto");
        contador++;

        if (contador < limitePreguntas) {
            mostrarPregunta();
        } else {
            preguntaTxt.textContent = "¡Juego terminado!";
            contenedorAlternativas.innerHTML = `<img src="./img/cat05.png" alt="imagen final"> <p class="puntaje">"Has acertado ${puntaje} de un total de ${limitePreguntas}"</p>`;
            
            alternativasBnt.forEach((boton) => {
                boton.textContent = "";
                boton.removeEventListener("click", seleccionarRespuesta);
            });
        }

        alternativasBnt.forEach((boton) => {
            boton.disabled = false;
        });
    }, 1000);
};

const reiniciarJuego = async () => {
    
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

cargarPreguntas();