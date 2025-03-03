//! 01 Analizador de texto.

/* La aplicación debe calcular : 
Recuento de palabras
Recuento de caracteres incluidos espacios y signos de puntuación
Recuento de caracteres excluyendo espacios y signos de puntuación
Recuento de números
Suma total de números
Longitud media de las palabras
 */

let textoIngresado = "3 tristes tigres tragaban trigo en 1 trigal"
let soloNumeros;
let palabras;
let eliminarEspacios;

const contadorCaracteres = (texto) => {

    let caracteresexcluyendo = textoIngresado.replace(/[^\wáéíóúñÁÉÍÓÚÑ]/g, "");
    let caracteresGenerales = texto.length

    console.log(`Tu texto tiene un total de ${caracteresGenerales} caracteres`);
    console.log(`y ${caracteresexcluyendo.length} caracteres si descontamos los espacios y los signos de puntuación`);
};

const contadorPalabrasNumeros = (texto) => {
    palabras = texto.split(" ")
    eliminarEspacios = palabras.filter(palabra => palabra !== "" && isNaN(palabra))
    soloNumeros = palabras.filter(palabra => palabra !== "" && !isNaN(palabra))

    console.log(`Has escrito un total de ${eliminarEspacios.length} palabras`);
    console.log(`y ${soloNumeros.length} números`);
};

const calculosMatematicos = (texto) =>{

    let suma = soloNumeros.map(Number).reduce((acc, num) => acc + num, 0)
    console.log(`Si sumamos los números de tu texto nos da un valor de ${suma}`);

    let longitudPalabras = eliminarEspacios.map(palabra =>palabra.length)    
    let promedio = Math.floor(longitudPalabras.reduce((acc, num) => acc + num, 0) / longitudPalabras.length);

    console.log(`Tu palabra más larga tiene ${Math.max(...longitudPalabras)} carácteres`);    
    console.log(`y el promedio de longitud de tus palabra es de ${promedio}`);
    
}

const analizador = (texto) => {
    contadorCaracteres(texto)
    contadorPalabrasNumeros(texto)
    calculosMatematicos(texto)

};


analizador(textoIngresado)