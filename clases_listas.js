 // Función para agregar los eventos de arrastre y soltado
 function agregarEventosArrastre(tareaDiv, listaDiv) {
    // Evento para el inicio de arrastre
    tareaDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('tarea-id', tareaDiv.id);
        tareaDiv.classList.add('arrastrando');
    });

    // Evento para permitir arrastrar sobre otros elementos
    tareaDiv.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permitir que el elemento se arrastre sobre esta tarea
        tareaDiv.classList.add('sobre'); // Visualización durante el arrastre
    });

    // Evento cuando el arrastre sale del elemento
    tareaDiv.addEventListener('dragleave', () => {
        tareaDiv.classList.remove('sobre'); // Quitar clase de visualización
    });

    // Evento de soltado
    tareaDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        tareaDiv.classList.remove('sobre');

        const tareaId = e.dataTransfer.getData('tarea-id');
        const tareaArrastrada = document.getElementById(tareaId);

        if (tareaArrastrada && tareaArrastrada !== tareaDiv) {
            listaDiv.insertBefore(tareaArrastrada, tareaDiv); // Insertar la tarea arrastrada antes de la tarea actual
            tareaArrastrada.classList.remove('arrastrando');
        }
    });
}
class Tarea {
    constructor(nombre = "Tarea") {
        this.nombre = nombre;
        this.completada = false;
    }

    crearTarea(listaDiv) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');
        tareaDiv.draggable = true; // Hacer la tarea arrastrable
        // Asigna un ID único
        tareaDiv.id = `tarea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        // Llamamos a la función para agregar los eventos de arrastre y soltado
        agregarEventosArrastre(tareaDiv, listaDiv);

        // Crear el checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            this.completada = checkbox.checked;
            if (this.completada) {
                textArea.classList.add('tachado');
            } else {
                textArea.classList.remove('tachado');
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

        const destacarOpcion = document.createElement('div');
        destacarOpcion.textContent = 'Destacar';
        destacarOpcion.addEventListener('click', () => {
            tareaDiv.classList.toggle('destacada');
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
        const nuevaTarea = new Tarea(this.nombre);
        const nuevaTareaDiv = nuevaTarea.crearTarea(listaDiv);
        listaDiv.appendChild(nuevaTareaDiv);
    }

    eliminarTarea(tareaDiv) {
        tareaDiv.remove();
    }
   
}

    function toggleMenu(menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }   
    

class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
    }

    crearListaElement() {
        const listaDiv = document.createElement('div');
        listaDiv.classList.add('lista-basica');
        // Permitir arrastrar elementos dentro de esta lista
        listaDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir el evento de soltado
        });

        listaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const tareaId = e.dataTransfer.getData('tarea-id');
            const tarea = document.getElementById(tareaId);
            if (tarea) {
                listaDiv.appendChild(tarea); // Mover la tarea a esta lista
            }
        });
        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.placeholder = this.titulo;
        tituloInput.addEventListener('input', (e) => {
            this.titulo = e.target.value;
        });

        listaDiv.appendChild(tituloInput);

        this.tareas.forEach(tarea => {
            listaDiv.appendChild(tarea.crearTarea(listaDiv)); // Asegúrate de pasar listaDiv
        });

        // Botón para agregar más tareas
        const btnAgregarTarea = document.createElement('button');
        btnAgregarTarea.textContent = 'Agregar Tarea';
        btnAgregarTarea.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.tareas.push(nuevaTarea);
            listaDiv.insertBefore(nuevaTarea.crearTarea(listaDiv), btnAgregarTarea);
        });

        listaDiv.appendChild(btnAgregarTarea);
        return listaDiv;
    }
}

class ListaSemanal {
    constructor(container) {
        this.container = container;
        this.semanas = [];
    }

    crearListaSemanal() {
        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.classList.add('container');

        const tituloEditable = document.createElement('input');
        tituloEditable.classList.add('editable-title');
        tituloEditable.placeholder = 'Agregue la semana aquí (Ejemplo: 21/10 al 27/10)';

        const listaSemanalContainer = document.createElement('div');
        listaSemanalContainer.classList.add('listas-basicas');

        nuevoContenedor.appendChild(tituloEditable);
        nuevoContenedor.appendChild(listaSemanalContainer);

        const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        diasDeLaSemana.forEach(dia => {
            const lista = new Lista(dia);
            listaSemanalContainer.appendChild(lista.crearListaElement());
            this.semanas.push(lista);
        });

        this.container.appendChild(nuevoContenedor);
    }
}

class App {
    constructor() {
        this.listaSemanalContainer = document.getElementById('lista-semanal');
        this.listaPersonalContainer = document.getElementById('listas-personales');
        this.listaMesContainer = document.getElementById('listas-mes');

        this.listaSemanal = new ListaSemanal(this.listaSemanalContainer);
        this.init();
    }

    init() {
        document.querySelector('.menu-btn').addEventListener('click', () => {
            document.querySelector('.menu').classList.toggle('active');
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.listaSemanal.crearListaSemanal();

            document.getElementById('btn-semanal').addEventListener('click', () => {
                this.listaSemanal.crearListaSemanal();
            });

            document.getElementById('btn-personal').addEventListener('click', () => {
                const nuevaLista = new Lista('Agregue Titulo');
                this.listaPersonalContainer.appendChild(nuevaLista.crearListaElement());
            });

            document.getElementById('btn-mensual').addEventListener('click', () => {
                const nuevaLista = new Lista('Agosto');
                this.listaMesContainer.appendChild(nuevaLista.crearListaElement());
            });
        });
    }
}

// Inicializa la aplicación
const app = new App();