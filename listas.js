// Menu desplegable
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});


class Tarea {
    constructor(nombre = "Tarea") {
        this.nombre = nombre;
        this.completada = false;
    }

    crearTarea() {
        
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            this.completada = checkbox.checked;
        });

        const inputTexto = document.createElement('input');
        inputTexto.type = 'text';
        inputTexto.value = this.nombre;
        inputTexto.addEventListener('input', (e) => {
            this.nombre = e.target.value;
        });
        

        tareaDiv.appendChild(checkbox);
        tareaDiv.appendChild(inputTexto);
        return tareaDiv;
    }

    }


class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
    }

    crearLista() {
        const listaDiv = document.createElement('div');
        listaDiv.classList.add('lista-basica');

        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.value = this.titulo;
        tituloInput.addEventListener('input', (e) => {
            this.titulo = e.target.value;
        });

        const titulo = document.createElement('h2');
        titulo.appendChild(tituloInput);

        listaDiv.appendChild(titulo);

        this.tareas.forEach(tarea => {
            listaDiv.appendChild(tarea.crearTarea());
        });

        return listaDiv;
    }
}

function agregarLista() {
    const nuevaLista = new Lista();
    const listaSemanal = document.getElementById('listaSemanal');
    listaSemanal.appendChild(nuevaLista.crearLista());
}

// Inicialmente agregamos una lista semanal de 7 listas
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 7; i++) {
        agregarLista();
    }
});

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

