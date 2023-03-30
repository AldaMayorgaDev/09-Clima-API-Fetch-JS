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

    console.log('url', url);

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
};


function mostrarClima(datos){
    const {main: {temp, temp_max, tem_min}} = datos; //Destruction de un objeto que esta dentro de otro objeto
    const centigrados = kelvinACentigrados(temp);
    
    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('DIV');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);

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