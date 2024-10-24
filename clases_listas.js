document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});

// -------------------- CLASES --------------------

// Clase Tarea
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

        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        opcionesBtn.addEventListener('click', () => mostrarOpciones(this));

        tareaDiv.appendChild(checkbox);
        tareaDiv.appendChild(inputTexto);
        tareaDiv.appendChild(opcionesBtn);

        return tareaDiv;
    }
}

// Clase Lista
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

        listaDiv.appendChild(tituloInput);

        this.tareas.forEach(tarea => {
            listaDiv.appendChild(tarea.crearTarea());
        });

        const btnAgregarTarea = document.createElement('button');
        btnAgregarTarea.textContent = 'Agregar Tarea';
        btnAgregarTarea.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.tareas.push(nuevaTarea);
            listaDiv.insertBefore(nuevaTarea.crearTarea(), btnAgregarTarea);
        });

        listaDiv.appendChild(btnAgregarTarea);
        return listaDiv;
    }
}

// -------------------- FUNCIONES --------------------

// Función para agregar listas en la sección correspondiente
function agregarLista(container, titulo) {
    const nuevaLista = new Lista(titulo);
    container.appendChild(nuevaLista.crearLista());
}

// Función para crear una lista semanal completa con los días de la semana
function agregarListaSemanal() {
    const nuevaListaSemanal = document.createElement('div');
    nuevaListaSemanal.classList.add('lista-semanal');

    const titulo = document.createElement('h3');
    titulo.textContent = 'Lista Semanal';
    nuevaListaSemanal.appendChild(titulo);

    diasDeLaSemana.forEach(dia => {
        agregarLista(nuevaListaSemanal, dia); // Reutilizamos agregarLista para cada día
    });

    listaSemanalContainer.appendChild(nuevaListaSemanal); // Añadimos la lista al contenedor
}

// Función para mostrar las opciones de las tareas (Eliminar, Duplicar, Destacar)
function mostrarOpciones(tarea) {
    const opciones = prompt('Opciones: (1) Eliminar, (2) Duplicar, (3) Destacar');
    switch (opciones) {
        case '1':
            // Implementar método eliminar
            break;
        case '2':
            // Implementar método duplicar
            break;
        case '3':
            // Implementar método destacar
            break;
    }
}

// -------------------- VARIABLES --------------------
const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const listaSemanalContainer = document.getElementById('lista-semanal');
const listaPersonalContainer = document.getElementById('listas-personales');
const listaMesContainer = document.getElementById('listas-mes');

// -------------------- EVENTOS --------------------

// Al cargar la página, crea la primera lista semanal
document.addEventListener('DOMContentLoaded', () => {
    agregarListaSemanal();

    document.getElementById('btn-personal').addEventListener('click', () => {
        agregarLista(listaPersonalContainer, 'Lista Personal');
    });

    document.getElementById('btn-mensual').addEventListener('click', () => {
        agregarLista(listaMesContainer, 'Lista por Mes');
    });

    document.getElementById('btn-semanal').addEventListener('click', function() {
        agregarListaSemanal();
    });
});

