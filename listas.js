// -------------------- MENU DESPLEGABLE --------------------
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

        // Crear opciones desplegables (Eliminar, Duplicar, Destacar)
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

        // Botón para agregar más tareas
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

// Función para agregar una lista en la sección correspondiente
function agregarLista(container, titulo) {
    const nuevaLista = new Lista(titulo);
    container.appendChild(nuevaLista.crearLista());
}

// Función para mostrar las opciones de las tareas (Eliminar, Duplicar, Destacar)
function mostrarOpciones(tarea) {
    const opciones = prompt('Opciones: (1) Eliminar, (2) Duplicar, (3) Destacar');
    switch (opciones) {
        case '1':
            tarea.eliminar(); // Implementar método eliminar en la clase Tarea si es necesario
            break;
        case '2':
            tarea.duplicar(); // Implementar método duplicar
            break;
        case '3':
            tarea.destacar(); // Implementar método destacar
            break;
    }
}

// -------------------- EVENTOS --------------------

// Crear una lista semanal al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const listaSemanalContainer = document.getElementById('lista-semanal');
    const listaPersonalContainer = document.getElementById('listas-personales');
    const listaMesContainer = document.getElementById('listas-mes');

    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    // Crear 7 listas básicas para la lista semanal
    diasDeLaSemana.forEach(dia => {
        agregarLista(listaSemanalContainer, dia);
    });

    // Evento para agregar nuevas listas personales o por mes
    document.getElementById('btn-personal').addEventListener('click', () => {
        agregarLista(listaPersonalContainer, 'Lista Personal');
    });

    document.getElementById('btn-mensual').addEventListener('click', () => {
        agregarLista(listaMesContainer, 'Lista por Mes');
    });
});
