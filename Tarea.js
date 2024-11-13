class Tarea {
    constructor(nombre = "Tarea") {
        this.nombre = nombre;
        this.completada = false;
    }
    /**
     * Agrega los eventos necesarios para el comportamiento de arrastre (drag & drop) de las tareas.
     * Permite que las tareas puedan ser arrastradas dentro de la lista o entre listas.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea visualmente.
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista en la que se encuentra la tarea.
     */
    agregarEventosArrastre(tareaDiv, listaDiv) {
        tareaDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', tareaDiv.id);
            tareaDiv.classList.add('arrastrando');
        });
    
        tareaDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        tareaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const tareaId = e.dataTransfer.getData('text/plain');
            const tareaArrastrada = document.getElementById(tareaId);
    
            if (tareaArrastrada && tareaArrastrada !== tareaDiv) {
                listaDiv.insertBefore(tareaArrastrada, tareaDiv);
                tareaArrastrada.classList.remove('arrastrando');
            }
    
            // Obtén la lista actual y la lista de destino
            const listaDestino = listaDiv.closest('.lista-basica');
    
            // Aquí gestionamos la visibilidad de las tareas de la lista de destino
            listaDestino.querySelectorAll('.tarea').forEach(tareaDiv => {
                const tareaInstancia = getTareaById(tareaDiv.id);
                if (tareaInstancia) {
                    // Si la lista está expandida, aseguramos que la tarea sea visible
                    tareaInstancia.setVisible(listaDestino.expandida);
                }
            });
    
            // Si la lista de destino no está expandida, ocultar la tarea al arrastrarla allí
            if (listaDestino && !listaDestino.expandida) {
                const tareaInstancia = getTareaById(tareaId);
                if (tareaInstancia) {
                    tareaInstancia.setVisible(false);  // Oculta la tarea si la lista no está expandida
                }
            } else {
                // Si la lista está expandida, mostrar la tarea
                const tareaInstancia = getTareaById(tareaId);
                if (tareaInstancia) {
                    tareaInstancia.setVisible(true);  // Muestra la tarea si la lista está expandida
                }
            }
        });
    }
    
    
    /**
     * Crea un checkbox para la tarea, el cual permite marcarla como completada.
     * Al marcar el checkbox, la tarea se tachará si se completa.
     * 
     * @param {HTMLTextAreaElement} textArea - El `textarea` que representa el nombre de la tarea.
     * @returns {HTMLInputElement} El checkbox para la tarea.
     */
    crearCheckbox(textArea) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            this.completada = checkbox.checked;
            textArea.classList.toggle('tachado', this.completada);
        });
        return checkbox;
    }

    /**
     * Crea el área de texto que permite editar el nombre de la tarea.
     * 
     * @returns {HTMLTextAreaElement} El área de texto para el nombre de la tarea.
     */
    crearTextArea() {
        const textArea = document.createElement('textarea');
        textArea.placeholder = this.nombre;
        textArea.addEventListener('input', (e) => {
            this.nombre = e.target.value;
        });
        return textArea;
    }
 /**
 * Crea el `div` que representa visualmente la tarea. 
 * Este `div` contiene un área de texto para editar el nombre de la tarea, un checkbox para marcarla como completada,
 * y un botón con un menú de opciones que permite realizar varias acciones sobre la tarea (eliminar, destacar, duplicar).
 * 
 * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de tareas a la cual se va a agregar la tarea.
 * @returns {HTMLDivElement} El `div` que representa la tarea con todos sus elementos hijos.
 */
    crearTarea(listaDiv) {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');
        tareaDiv.draggable = true;
        tareaDiv.id = `tarea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        this.agregarEventosArrastre(tareaDiv, listaDiv);
        const textArea = this.crearTextArea();
        const checkbox = this.crearCheckbox(textArea);
        const { opcionesBtn, menuTarea } = this.crearBotonOpciones(tareaDiv, listaDiv);

        tareaDiv.append(checkbox, textArea, opcionesBtn, menuTarea);

        return tareaDiv;
    }


    /**
     * Crea el botón de opciones (⋮) de la tarea, que permite mostrar un menú con acciones como eliminar,
     * destacar y duplicar la tarea.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea.
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de la tarea.
     * @returns {Object} Un objeto con las propiedades `opcionesBtn` (el botón de opciones) y `menuTarea` (el menú de opciones).
     */
    crearBotonOpciones(tareaDiv, listaDiv) {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        const menuTarea = this.crearMenuOpciones(tareaDiv, listaDiv);

        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuTarea);
        });

        document.addEventListener('click', (e) => {
            if (!tareaDiv.contains(e.target)) {
                menuTarea.style.display = 'none';
            }
        });

        return { opcionesBtn, menuTarea };
    }

    /**
     * Crea el menú de opciones (Eliminar, Destacar, Duplicar) de la tarea.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea.
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de la tarea.
     * @returns {HTMLDivElement} El menú con las opciones disponibles.
     */
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

    /**
     * Duplicar la tarea actual. Crea una nueva instancia de la tarea con el mismo nombre
     * y la agrega a la lista.
     * 
     * @param {HTMLDivElement} listaDiv - El contenedor `div` que representa la lista de tareas.
     */
    duplicarTarea(listaDiv) {
        const nuevaTarea = new Tarea(this.nombre);
        const nuevaTareaDiv = nuevaTarea.crearTarea(listaDiv);
        listaDiv.appendChild(nuevaTareaDiv);
    }

    /**
     * Elimina la tarea del DOM.
     * 
     * @param {HTMLDivElement} tareaDiv - El elemento `div` que representa la tarea a eliminar.
     */
    eliminarTarea(tareaDiv) {
        tareaDiv.remove();
    }

    /**
     * Establece la visibilidad de la tarea (mostrar u ocultar).
     * 
     * @param {boolean} visible - Si es `true`, la tarea será visible. Si es `false`, la tarea estará oculta.
     */
    setVisible(visible) {
        const tareaDiv = document.getElementById(this.id);
        if (tareaDiv) {
            tareaDiv.style.display = visible ? 'block' : 'none';
        }
    }
}
/**
 * Alterna la visibilidad del menú. Si el menú está visible (display !== 'none'), lo oculta; 
 * si está oculto (display === 'none'), lo muestra.
 * 
 * @param {HTMLElement} menu - El menú que se quiere mostrar u ocultar. Este debe ser un elemento HTML con una propiedad `style.display`.
 */
function toggleMenu(menu) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

/**
 * Obtiene la instancia de la clase `Tarea` correspondiente al ID de un elemento del DOM.
 * Utiliza una propiedad `__tarea__` que debe haberse agregado previamente a la tarea al crearla,
 * para referenciar la instancia de la tarea.
 * 
 * @param {string} id - El ID del `div` que representa la tarea. Este debe ser el ID de un elemento `tarea` en el DOM.
 * @returns {Tarea|null} La instancia de la clase `Tarea` asociada al elemento del DOM, o `null` si no se encuentra el elemento.
 */
function getTareaById(id) {
    const tareaDiv = document.getElementById(id);
    if (tareaDiv) {
        return tareaDiv.__tarea__ || null;
    }
    return null;
}