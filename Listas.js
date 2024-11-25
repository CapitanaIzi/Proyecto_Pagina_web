let menuListaAbierto = null;

class Lista {
   /**
   * Constructor de la clase Lista.
   * 
   * @param {string} titulo - El título inicial de la lista (por defecto, "Título").
   */
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()]; 
        this.listaDiv = this.crearListaElement(); 
        this.expandida = true; 
    }

    /**
     * Crea el contenedor visual de la lista, incluyendo el título y las tareas.
     * 
     * @returns {HTMLDivElement} El contenedor de la lista con título y tareas.
     */
    crearListaElement() {
        this.listaDiv = document.createElement('div');
        this.listaDiv.classList.add('lista-basica');
        const tituloContainer = this.crearTituloContainer();
        this.listaDiv.appendChild(tituloContainer);
        this.tareas.forEach((tarea) => {
            const tareaElement = tarea.crearTarea(this.listaDiv);
            tarea.element = tareaElement;
            tareaElement.style.display = this.expandida ? 'block' : 'none'; 
            this.listaDiv.appendChild(tareaElement);
        });

        return this.listaDiv;
    }

    /**
     * Crea el contenedor del título de la lista y el botón de opciones.
     * 
     * @returns {HTMLDivElement} El contenedor del título con el botón de opciones.
     */
    crearTituloContainer() {
        const tituloContainer = this.crearContenedorTitulo();
        const tituloInput = this.crearTituloInput();
        const iconoExpandir = this.crearIconoExpandir();
        const opcionesBtn = this.crearBotonOpciones();
    
        tituloContainer.appendChild(tituloInput);
        tituloContainer.appendChild(iconoExpandir);
        tituloContainer.appendChild(opcionesBtn);
    
        return tituloContainer;
    }
    
    /**
     * Función para crear el contenedor principal
     * @returns el contenerdor
     */
    crearContenedorTitulo() {
        const container = document.createElement('div');
        container.classList.add('titulo-container');
        return container;
    }
    /**
     * Función para crear y configurar el input del título
     * @returns el input
     */
    crearTituloInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = this.titulo;
        input.addEventListener('input', (e) => {
            this.titulo = e.target.value; 
        });
        return input;
    }
    
     /**
      * Función para crear y configurar el ícono de expandir/contraer
      * @returns icono
      */
    crearIconoExpandir() {
        const icono = document.createElement('span');
        icono.classList.add('icono-expandir', 'fas', 'fa-chevron-down');
        icono.style.cursor = 'pointer';
        icono.addEventListener('click', () => {
            this.expandida = !this.expandida;
            icono.classList.toggle('fa-chevron-down', !this.expandida); 
            icono.classList.toggle('fa-chevron-up', this.expandida);  
            this.actualizarVisibilidadTareas(); 
        });
    
        return icono;
    }
    

    /**
     * Crea el botón de opciones, que despliega un menú al hacer clic.
     * 
     * @returns {HTMLButtonElement} El botón de opciones.
     */
    crearBotonOpciones() {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮'; 
        const menuLista = this.crearMenuOpciones(); 
    
        opcionesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(menuLista); 
        });
    
        document.addEventListener('click', (e) => {
            if (!this.listaDiv.contains(e.target)) {
                menuLista.style.display = 'none'; 
                if (menuListaAbierto === menuLista) {
                    menuListaAbierto = null; 
                }
            }
        });
    
        opcionesBtn.appendChild(menuLista);
        return opcionesBtn;
    }

    /**
     * Crea un menú con las opciones disponibles: agregar, eliminar y ordenar.
     * 
     * @returns {HTMLDivElement} El menú con las opciones.
     */
    crearMenuOpciones() {
        const menuLista = document.createElement('div');
        menuLista.classList.add('menu-lista');
        menuLista.style.display = 'none'; 
    
        const opcionEliminar = this.crearOpcionEliminar(menuLista);
        const opcionAgregar = this.crearOpcionAgregar(menuLista);
        const opcionOrdenar = this.crearOpcionOrdenar(menuLista);
    
        menuLista.append(opcionEliminar, opcionAgregar, opcionOrdenar);
        return menuLista;
    }
    
    /**
     * Crea la opción para agregar una tarea en el menú.
     * 
     * @param {HTMLDivElement} menuLista - El contenedor del menú.
     * @returns {HTMLDivElement} El ítem de la opción "Agregar".
     */
    crearOpcionAgregar(menuLista) {
        const opcionAgregar = document.createElement('div');
        const iconoAgregar = document.createElement('i');
        iconoAgregar.classList.add('fas', 'fa-plus'); 
        opcionAgregar.appendChild(iconoAgregar);
        opcionAgregar.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.agregarTarea(nuevaTarea);
            menuLista.style.display = 'none'; 
        });
    
        return opcionAgregar;
    }
    
    /**
     * Crea la opción para eliminar la lista en el menú.
     * 
     * @returns {HTMLDivElement} El ítem de la opción "Eliminar".
     */
    crearOpcionEliminar() {
        const opcionEliminar = document.createElement('div');
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash'); 
        opcionEliminar.appendChild(iconoEliminar);
    
        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove(); 
        });
    
        return opcionEliminar;
    }

    /**
     * Crea la opción para ordenar las tareas en el menú.
     * 
     * @returns {HTMLDivElement} El ítem de la opción "Ordenar".
     */
    crearOpcionOrdenar() {
        const opcionOrdenar = document.createElement('div');
        const iconoOrdenar = document.createElement('i');
        iconoOrdenar.classList.add('fas', 'fa-sort'); 
        opcionOrdenar.appendChild(iconoOrdenar);
    
        opcionOrdenar.addEventListener('click', () => {
            this.ordenarTareas(); 
        });
        return opcionOrdenar;
    }

    /**
     * Ordena las tareas de la lista por su estado de completado.
     * Las tareas completadas se colocan al final.
     */
    ordenarTareas() {
        this.tareas.sort((a, b) => a.completada - b.completada); 
    
        this.tareas.forEach((tarea) => {
            if (tarea.element && tarea.element.parentElement === this.listaDiv) {
                this.listaDiv.removeChild(tarea.element);
            }
        });
    
        this.tareas.forEach((tarea) => {
            if (tarea.completada) {
                tarea.element.querySelector('textarea').classList.add('tachado'); // Aplicar el estilo de tachado
            }
            this.listaDiv.appendChild(tarea.element);
        });
    }
   
    /**
   * Añade una nueva tarea a la lista visualmente y en el array `this.tareas`.
   * 
   * @param {Tarea} tarea - La tarea que se va a añadir.
   */
    agregarTarea() {
        const nuevaTarea = new Tarea();
        const tareaElement = nuevaTarea.crearTarea();
        tareaElement.style.display = this.expandida ? 'block' : 'none'; 
        nuevaTarea.element = tareaElement;
        this.tareas.push(nuevaTarea);
        this.listaDiv.appendChild(tareaElement);

        this.actualizarVisibilidadTareas();
    }
    /**
     * Actualiza la visibilidad de las tareas dependiendo del estado de expansión de la lista.
     */
    actualizarVisibilidadTareas() {
        this.tareas.forEach((tarea) => {
            if (tarea.element && tarea.element.parentElement === this.listaDiv) {
                tarea.element.style.display = this.expandida ? 'block' : 'none';
            }
        });
    }
}

/**
 * Alterna la visibilidad de un menú, cerrando cualquier otro menú que esté abierto.
 * 
 * @param {HTMLDivElement} menu - El menú que se debe mostrar u ocultar.
 */
function toggleMenu(menu) {
    if (menuListaAbierto && menuListaAbierto !== menu) {
        menuListaAbierto.style.display = 'none'; 
    }

    const isMenuVisible = menu.style.display === 'block';
    menu.style.display = isMenuVisible ? 'none' : 'block';
    menuListaAbierto = isMenuVisible ? null : menu;
}