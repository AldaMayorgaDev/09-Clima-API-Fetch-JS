const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    

    //Validar el formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Todos los campos son obligatorios');
        return;
    }else{
        console.log('Buscando el clima');
    }

    //Consultar la API
    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
   const alerta = document.querySelector('.bg-red-100');

   if(!alerta){ //Si no hay alerta crea una.
       //crear una alerta con scripting
       const alerta = document.createElement('DIV');

       alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
       alerta.innerHTML = `
         <strong class="font-bold">Error!</strong>
         <span class="block">${mensaje}</span>
        `;

       container.appendChild(alerta);

       //Elimina la alerta despues de 2 segundos.
       setTimeout(() => {
            alerta.remove();
       }, 2000);
   } 
};

function consultarAPI(ciudad, pais) {
    const appId = 'c63b03294260d002492332226542661d';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner(); //muestra un spinner de carga

    setTimeout(() => {
        fetch(url)
        .then(respuesta =>{
            console.log('respuesta', respuesta);
            return respuesta.json();
        })
        .then(datos =>{
            
            //Limpiar HTML previo
            limpiarHTML();

            //Valida si la ciudad existe o no
            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return;
            };

            //Imprime la respuesta en HTML
            mostrarClima(datos);
        })
        .catch(error =>{
            console.log('error', error);
        })
    }, 1500);
};


function mostrarClima(datos){
    const {name, main: {temp, temp_max, temp_min}} = datos; //Destruction de un objeto que esta dentro de otro objeto.

    //Convertir las temperaturas a grados centigrados
    const centigrados = kelvinACentigrados(temp);
    const maxima = kelvinACentigrados(temp_max);
    const minima = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');
    

    //Temperatura Actual
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    //Temperatura Maxima
    const tempMax = document.createElement('P');
    tempMax.innerHTML = `Max: ${maxima} &#8451;`;
    tempMax.classList.add('text-xl');

    
    //Temperatura Minima
    const tempMin = document.createElement('P');
    tempMin.innerHTML = `Min: ${minima} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

/* function kelvinACentigrados(grados){
    return parseInt(grados -273.15);
} */

const kelvinACentigrados= (grados) => parseInt(grados -273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function spinner(){

    limpiarHTML();

    /* El spinner es tomado de esta URL  https://tobiasahlin.com/spinkit/*/
    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-cube-grid');
    divSpinner.innerHTML = `
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    `;
    resultado.appendChild(divSpinner);
};