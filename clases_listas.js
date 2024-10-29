
    

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
        tareaDiv.__tarea__ = this; // Aquí se asigna la instancia de Tarea
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
        const menuTarea = this.crearMenuOpciones(tareaDiv, listaDiv);
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuTarea);
        });


        // Estructura de la tarea
        tareaDiv.append(checkbox, textArea, opcionesBtn, menuTarea);
        tareaDiv.addEventListener('click', () => {
            menuTarea.style.display = 'none';
        });

        return tareaDiv;
    }

    // Menú desplegable
    crearMenuOpciones(tareaDiv, listaDiv) {
        const menuTarea = document.createElement('div');
        menuTarea.classList.add('menuTarea');
        menuTarea.style.display = 'none';

        const eliminarOpcion = document.createElement('div');
        eliminarOpcion.textContent = 'Eliminar';
        eliminarOpcion.addEventListener('click', () => this.eliminarTarea(tareaDiv));

        const destacarOpcion = document.createElement('div');
        destacarOpcion.textContent = 'Destacar';
        destacarOpcion.addEventListener('click', () => tareaDiv.classList.toggle('destacada'));

        const duplicarOpcion = document.createElement('div');
        duplicarOpcion.textContent = 'Duplicar';
        duplicarOpcion.addEventListener('click', () => this.duplicarTarea(listaDiv));

        menuTarea.append(eliminarOpcion, destacarOpcion, duplicarOpcion);
        return menuTarea;
    }


    duplicarTarea(listaDiv) {
        const nuevaTarea = new Tarea(this.nombre);
        const nuevaTareaDiv = nuevaTarea.crearTarea(listaDiv);
        listaDiv.appendChild(nuevaTareaDiv);
    }

    eliminarTarea(tareaDiv) {
        tareaDiv.remove();
    }
    setVisible(visible) {
        const tareaDiv = document.getElementById(this.id);
        if (tareaDiv) {
            tareaDiv.style.display = visible ? 'block' : 'none';
        }
    }

}

function toggleMenu(menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// Agregar eventos de arrastre y soltado a cada tarea
function agregarEventosArrastre(tareaDiv, listaDiv) {
    // Evento para el inicio de arrastre
    tareaDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tareaDiv.id); // Establecer ID de tarea en dataTransfer
        tareaDiv.classList.add('arrastrando');
    });

    // Evento para permitir arrastrar sobre otros elementos
    tareaDiv.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permitir que el elemento se arrastre sobre esta tarea
    });

    // Evento de soltado
    tareaDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const tareaId = e.dataTransfer.getData('text/plain');
        const tareaArrastrada = document.getElementById(tareaId);

        if (tareaArrastrada && tareaArrastrada !== tareaDiv) {
            listaDiv.insertBefore(tareaArrastrada, tareaDiv); // Insertar la tarea arrastrada antes de la tarea actual
            tareaArrastrada.classList.remove('arrastrando');
        }

        if (tareaArrastrada && tareaArrastrada !== tareaDiv) {
            // Insertar la tarea arrastrada en la nueva lista
            listaDiv.insertBefore(tareaArrastrada, tareaDiv);

            // Ajustar la visibilidad de la tarea arrastrada
            const listaActual = tareaDiv.closest('.lista-basica');
            const listaDestino = listaDiv.closest('.lista-basica');

            if (listaDestino && !listaDestino.expandida) {
                // Si la lista de destino está contraída, ocultar la tarea
                const tareaInstancia = getTareaById(tareaId);
                if (tareaInstancia) {
                    tareaInstancia.setVisible(false);
                }
            } else {
                // Mostrar la tarea si la lista de destino está expandida
                const tareaInstancia = getTareaById(tareaId);
                if (tareaInstancia) {
                    tareaInstancia.setVisible(true);
                }
            }

            tareaArrastrada.classList.remove('arrastrando');
        }
    });
}

// Función para obtener la instancia de Tarea por ID
function getTareaById(id) {
    const tareaDiv = document.getElementById(id);
    if (tareaDiv) {
        return tareaDiv.__tarea__ || null; // Deberías agregar una propiedad en la instancia de Tarea que haga referencia al objeto de tarea
    }
    return null;
}
class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
        this.listaDiv = this.crearListaElement();
        this.expandida = true; // Estado de expansión de la lista
        // Crear línea guía
        this.lineaGuia = document.createElement('div');
        this.lineaGuia.classList.add('linea-guia');
        this.listaDiv.appendChild(this.lineaGuia);

        this.agregarComportamientoDeArrastre(); // Llamada al método para agregar comportamiento
    }
    agregarComportamientoDeArrastre() {
        // Permitir arrastrar elementos dentro de esta lista
        this.listaDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir el evento de soltado
            const tarea = e.target.closest('.tarea'); // Obtener la tarea objetivo
            if (tarea) {
                // Posicionar la línea guía antes de la tarea objetivo
                this.lineaGuia.style.display = 'block';
                this.lineaGuia.style.top = tarea.offsetTop + 'px'; // Posicionar la línea en la parte superior de la tarea
            } else {
                // Si no hay tarea objetivo, ocultar la línea guía
                this.lineaGuia.style.display = 'none';
            }
        });

        this.listaDiv.addEventListener('dragleave', () => {
            // Ocultar línea guía cuando el arrastre sale de la lista
            this.lineaGuia.style.display = 'none';
        });

        this.listaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const tareaId = e.dataTransfer.getData('text/plain');
            const tarea = document.getElementById(tareaId);
            if (tarea) {
                this.listaDiv.appendChild(tarea); // Mover la tarea a esta lista
            }
            // Ocultar la línea guía después de soltar
            this.lineaGuia.style.display = 'none';
        });
    }
    crearListaElement() {
        this.listaDiv = document.createElement('div');
        this.listaDiv.classList.add('lista-basica');

        const tituloContainer = this.crearTituloContainer();
        this.listaDiv.appendChild(tituloContainer);

        this.tareas.forEach((tarea) => {
            const tareaElement = tarea.crearTarea(this.listaDiv);
            tarea.element = tareaElement;
            this.listaDiv.appendChild(tareaElement);
        });

        return this.listaDiv;
    }
    // Crear el contenedor de título y opciones
    crearTituloContainer() {
        const tituloContainer = document.createElement('div');
        tituloContainer.classList.add('titulo-container');

        const tituloInput = document.createElement('input');
        tituloInput.type = 'text';
        tituloInput.placeholder = this.titulo;
        tituloInput.addEventListener('input', (e) => {
            this.titulo = e.target.value;
        });

        const opcionesBtn = this.crearBotonOpciones();
        tituloContainer.appendChild(tituloInput);
        tituloContainer.appendChild(opcionesBtn);

        return tituloContainer;
    }

    // Crear el botón de opciones y su menú
    crearBotonOpciones() {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        opcionesBtn.classList.add('opciones-btn');

        const menuLista = this.crearMenuOpciones();
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuLista.style.display = menuLista.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', () => {
            menuLista.style.display = 'none';
        });

        opcionesBtn.appendChild(menuLista);
        return opcionesBtn;
    }

    // Crear el menú de opciones
    crearMenuOpciones() {
        const menuLista = document.createElement('div');
        menuLista.classList.add('menu-lista');
        menuLista.style.display = 'none';

        const opcionAgregar = this.crearOpcionAgregar(menuLista);
        const opcionEliminar = this.crearOpcionEliminar(menuLista);
        const opcionExpandirContraer = this.crearOpcionExpandirContraer(menuLista);

        menuLista.append(opcionAgregar, opcionEliminar, opcionExpandirContraer);
        return menuLista;
    }

    // Crear cada opción del menú
    crearOpcionAgregar(menuLista) {
        const opcionAgregar = document.createElement('div');
        opcionAgregar.textContent = 'Agregar';
        opcionAgregar.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.tareas.push(nuevaTarea);
            const nuevaTareaElement = nuevaTarea.crearTarea();
            nuevaTarea.element = nuevaTareaElement;

            // Asegurar que la nueva tarea se expanda o contraiga según el estado actual
            nuevaTareaElement.style.display = this.expandida ? 'block' : 'none';
            this.listaDiv.appendChild(nuevaTareaElement);
            menuLista.style.display = 'none';
        });
        return opcionAgregar;
    }

    crearOpcionEliminar(menuLista) {
        const opcionEliminar = document.createElement('div');
        opcionEliminar.textContent = 'Eliminar';
        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove();
        });
        return opcionEliminar;
    }

    crearOpcionExpandirContraer(menuLista) {
        const opcionExpandirContraer = document.createElement('div');
        opcionExpandirContraer.textContent = 'Contraer';
        opcionExpandirContraer.addEventListener('click', () => {
            this.expandida = !this.expandida;
            opcionExpandirContraer.textContent = this.expandida ? 'Contraer' : 'Expandir';

            // Cambiar la visibilidad de todas las tareas según el estado expandida
            this.tareas.forEach((tarea) => {
                if (tarea.element) {
                    ""
                    tarea.element.style.display = this.expandida ? 'block' : 'none';
                }
            });
            menuLista.style.display = 'none';
        });
        return opcionExpandirContraer;
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