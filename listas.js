// Menu desplegable
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Funciones POO para las tareas y listas
class Tarea {
    constructor(texto) {
        this.texto = texto;
        this.completada = false;
    }

    marcarCompletada() {
        this.completada = !this.completada;
    }
}

class Lista {
    constructor(titulo) {
        this.titulo = titulo;
        this.tareas = [];
    }

    agregarTarea(texto) {
        const nuevaTarea = new Tarea(texto);
        this.tareas.push(nuevaTarea);
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
    }

    duplicarTarea(index) {
        const tareaDuplicada = Object.assign({}, this.tareas[index]);
        this.tareas.push(tareaDuplicada);
    }

    destacarTarea(index) {
        this.tareas[index].destacada = true;
    }
}

// Crear lista semanal como ejemplo
const listasContainer = document.getElementById('listas-container');

function crearListaSemanal() {
    const listaSemanal = new Lista('Semana 1');
    listaSemanal.agregarTarea('Ejemplo de tarea');

    const listaDiv = document.createElement('div');
    listaDiv.className = 'lista';

    const titulo = document.createElement('h2');
    titulo.textContent = listaSemanal.titulo;
    listaDiv.appendChild(titulo);

    listaSemanal.tareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = 'tarea';
        
        const tareaCheckbox = document.createElement('input');
        tareaCheckbox.type = 'checkbox';
        tareaCheckbox.addEventListener('change', () => tarea.marcarCompletada());

        const tareaTexto = document.createElement('span');
        tareaTexto.textContent = tarea.texto;

        tareaDiv.appendChild(tareaCheckbox);
        tareaDiv.appendChild(tareaTexto);

        // Agregar tres puntitos con opciones
        const opciones = document.createElement('span');
        opciones.textContent = '⋮';
        opciones.style.cursor = 'pointer';
        opciones.addEventListener('click', () => mostrarOpciones(tarea, index, listaSemanal));

        tareaDiv.appendChild(opciones);
        listaDiv.appendChild(tareaDiv);
    });

    listasContainer.appendChild(listaDiv);
}

function mostrarOpciones(tarea, index, lista) {
    const opciones = prompt('Opciones: (1) Eliminar, (2) Duplicar, (3) Destacar');
    switch(opciones) {
        case '1':
            lista.eliminarTarea(index);
            break;
        case '2':
            lista.duplicarTarea(index);
            break;
        case '3':
            lista.destacarTarea(index);
            break;
    }
}

// Botón para crear lista semanal
document.getElementById('btn-semanal').addEventListener('click', crearListaSemanal);
