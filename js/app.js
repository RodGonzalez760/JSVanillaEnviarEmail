
import { 
    asunto, 
    btnEnviar, 
    btnReset, 
    email, 
    erMail, 
    formulario,
    mensaje
} from './selectores.js';



eventListener();
function eventListener() {  
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    btnReset.addEventListener('click', resetearFormulario);

    formulario.addEventListener('submit', enviarEmail);
}


function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){

    if (e.target.value.length > 0) {

        const error = document.querySelector('p.error');
        if (error) {
            error.remove();            
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {

        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError("Todos los campos son obligatorios");
    }

    if (e.target.type === 'email') {

  
        if ( erMail.test(e.target.value) ) {

            const error = document.querySelector('p.error');
            if (error) {
                error.remove();                
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError("Email No Válido");
        }
    }

    if ( erMail.test( email.value ) && asunto.value != "" && mensaje.value != "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(textoError){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = textoError;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = "El mensaje se envió correctamente";
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase' );
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetearFormulario();
        }, 5000);
    }, 3000);
}

function resetearFormulario(){

    formulario.reset();

    iniciarApp();
}