class Tarea {
    static contadorId = 0; // Contador estático para generar un ID único

    constructor(nombre = "Tarea") {
        this.id = Date.now(); // Generar un id único usando el timestamp
        this.nombre = nombre;

        this.completada = false;
    }

    // Método estático para generar un ID único
    static generarId() {
        return ++Tarea.contadorId;
    }

// En tu clase Tarea:
crearTarea() {
    const tareaDiv = document.createElement('div');
    tareaDiv.classList.add('tarea');
    tareaDiv.draggable = true;
    const tareaId = `tarea-${this.id}`; // Genera un ID único para la tarea
    tareaDiv.id = tareaId; // Asignar el ID único al div de la tarea

    // Evento para iniciar el arrastre
    tareaDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tareaId); // Usar el ID completo en dataTransfer
    });

    const contenidoDiv = document.createElement('div');
    contenidoDiv.classList.add('contenido-tarea');

    const textArea = this.crearTextArea();  // Crea el campo de texto
    const checkbox = this.crearCheckbox(textArea); // Crea el checkbox vinculado al textArea
    const { opcionesBtn, menuTarea } = this.crearBotonOpciones(tareaDiv); // Botón de opciones (Expandir, Eliminar, etc.)

    // Agregar los elementos al contenedor de la tarea
    contenidoDiv.append(checkbox, textArea, opcionesBtn);  // Añadir checkbox, textarea y el botón de opciones
    tareaDiv.append(contenidoDiv, menuTarea);  // Añadir el contenedor con las tareas y el menú de opciones

    // Devolver el div completo para agregarlo a la lista
    return tareaDiv;
}

    
    

    crearTextArea() {
        const textArea = document.createElement('textarea');
        textArea.placeholder = 'Tarea';
        textArea.value = this.nombre;
        return textArea;
    }

    crearCheckbox(textArea) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            textArea.disabled = checkbox.checked;
        });
        return checkbox;
    }

    crearBotonOpciones(tareaDiv) {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
        const menuTarea = this.crearMenuOpciones(tareaDiv);
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuTarea.style.display = menuTarea.style.display === 'none' ? 'block' : 'none';
        });
        return { opcionesBtn, menuTarea };
    }

    crearMenuOpciones(tareaDiv) {
        const menuTarea = document.createElement('div');
        menuTarea.classList.add('menu-tarea');
        menuTarea.style.display = 'none';

        const opcionEliminar = this.crearOpcionEliminar(tareaDiv);
        menuTarea.appendChild(opcionEliminar);

        return menuTarea;
    }

    crearOpcionEliminar(tareaDiv) {
        const opcionEliminar = document.createElement('div');
        opcionEliminar.textContent = 'Eliminar';
        opcionEliminar.addEventListener('click', () => {
            tareaDiv.remove(); // Elimina la tarea del DOM
        });
        return opcionEliminar;
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
