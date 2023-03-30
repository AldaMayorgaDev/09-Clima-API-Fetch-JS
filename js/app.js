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

    //consumo de API
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
}