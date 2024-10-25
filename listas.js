// -------------------- MENU DESPLEGABLE --------------------
document.querySelector('.menu-btn').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('active');
});



class Tarea {
    constructor(nombre = "Tarea") {
        this.nombre = nombre;
        this.completada = false;
    }

    crearTarea(listaDiv) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');

        // Crear el checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            this.completada = checkbox.checked;
            if (this.completada) {
                textArea.classList.add('tachado'); // Añadir clase de tachado
            } else {
                textArea.classList.remove('tachado'); // Quitar clase de tachado
            }
        });

        // Crear el campo de texto (textarea)
        const textArea = document.createElement('textarea');
        textArea.placeholder = this.nombre;
        textArea.addEventListener('input', (e) => {
            this.nombre = e.target.value;
        });

        // Crear el botón de opciones
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuTarea);
        });

        // Crear el menú desplegable
        const menuTarea = document.createElement('div');
        menuTarea.classList.add('menuTarea');
        menuTarea.style.display = 'none';
 // Crear opciones del menú
 const eliminarOpcion = document.createElement('div');
 eliminarOpcion.textContent = 'Eliminar tarea';
 eliminarOpcion.addEventListener('click', () => {
     this.eliminarTarea(tareaDiv);
 });
        // Crear opciones del menú
        const destacarOpcion = document.createElement('div');
        destacarOpcion.textContent = 'Destacar';
        destacarOpcion.addEventListener('click', () => {
            tareaDiv.classList.toggle('destacada'); // Alternar clase de destacada
        });

        const duplicarOpcion = document.createElement('div');
        duplicarOpcion.textContent = 'Duplicar';
        duplicarOpcion.addEventListener('click', () => {
            this.duplicarTarea(listaDiv);
        });

        // Añadir opciones al menú
        menuTarea.appendChild(eliminarOpcion);
        menuTarea.appendChild(destacarOpcion);
        menuTarea.appendChild(duplicarOpcion);
        tareaDiv.appendChild(menuTarea);

        // Añadir elementos a la tarea
        tareaDiv.appendChild(checkbox);
        tareaDiv.appendChild(textArea);
        tareaDiv.appendChild(opcionesBtn);
        tareaDiv.addEventListener('click', () => {
            menuTarea.style.display = 'none'; // Ocultar menú al hacer clic fuera
        });

        return tareaDiv;
    }

    duplicarTarea(listaDiv) {
        const nuevaTarea = new Tarea(this.nombre); // Crear una nueva tarea con el mismo nombre
        const nuevaTareaDiv = nuevaTarea.crearTarea(listaDiv);
        listaDiv.appendChild(nuevaTareaDiv); // Añadir la nueva tarea a la lista
    }

    eliminarTarea(tareaDiv) {
        tareaDiv.remove(); // Eliminar la tarea del DOM
    }
}

function toggleMenu(menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
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
        tituloInput.placeholder = this.titulo; // Usar 'placeholder' en lugar de 'value'
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
function crearListaSemanal() {
    // Obtener el contenedor de "Lista Semanal" donde se añadirán las nuevas listas
    const listaSemanalGeneral = document.getElementById('lista-semanal');
    // Crear el contenedor principal para la nueva lista semanal
    const nuevoContenedor = document.createElement('div');
    nuevoContenedor.classList.add('container');

    // Crear el campo de título editable
    const tituloEditable = document.createElement('input');
    tituloEditable.classList.add('editable-title');
    tituloEditable.placeholder = 'Agregue la semana aquí (Ejemplo: 21/10 al 27/10)';

    // Crear el contenedor para las listas básicas
    const listaSemanalContainer = document.createElement('div');
    listaSemanalContainer.classList.add('listas-basicas');

    // Agregar el título no editable, el campo de título editable y el contenedor de listas al contenedor principal
    nuevoContenedor.appendChild(tituloEditable); // Añadir el campo de título editable
    nuevoContenedor.appendChild(listaSemanalContainer);

    // Crear las 7 listas básicas para cada día de la semana
    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    diasDeLaSemana.forEach(dia => {
        agregarLista(listaSemanalContainer, dia); // Usar la función para agregar las listas por día

    });

    // Añadir el nuevo contenedor al final de la página (o en el contenedor adecuado)
    listaSemanalGeneral.appendChild(nuevoContenedor); // Cambia esto si necesitas agregarlo a otro contenedor específico
}

// -------------------- EVENTOS --------------------

// Crear una lista semanal al cargar la página
document.addEventListener('DOMContentLoaded', () => {

    const listaPersonalContainer = document.getElementById('listas-personales');
    crearListaSemanal();
    const listaMesContainer = document.getElementById('listas-mes');


    document.getElementById('btn-semanal').addEventListener('click', () => {
        crearListaSemanal();
    });
    // Evento para agregar nuevas listas personales o por mes
    document.getElementById('btn-personal').addEventListener('click', () => {
        agregarLista(listaPersonalContainer, 'Agrege Titulo ');
    });

    document.getElementById('btn-mensual').addEventListener('click', () => {
        agregarLista(listaMesContainer, 'Agosto');
    });
});