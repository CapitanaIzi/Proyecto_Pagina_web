class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
        this.listaDiv = this.crearListaElement();
        this.expandida = true;
        this.lineaGuia = document.createElement('div');
        this.lineaGuia.classList.add('linea-guia');
        this.listaDiv.appendChild(this.lineaGuia);


        this.agregarComportamientoDeArrastre();
    }
    
    /**
     * Configura el comportamiento de arrastre y soltado en la lista.
     * Permite mover tareas dentro de la lista y muestra una línea guía cuando se arrastra una tarea.
     */
    agregarComportamientoDeArrastre() {
        this.configurarArrastreSobreLista();
        this.configurarSueltaEnLista();
        this.configurarArrastreFueraDeLista();
    }

    /**
     * Configura el evento dragover para permitir el arrastre dentro de la lista.
     * Muestra la línea guía en la posición de la tarea objetivo.
     */
    configurarArrastreSobreLista() {
        this.listaDiv.addEventListener('dragover', (e) => {
            e.preventDefault();
            const tarea = e.target.closest('.tarea');
            if (tarea) {
                this.mostrarLineaGuia(tarea);
            } else {
                this.ocultarLineaGuia();
            }
        });
    }

    /**
     * Configura el evento dragleave para ocultar la línea guía cuando se sale de la lista.
     */
    configurarArrastreFueraDeLista() {
        this.listaDiv.addEventListener('dragleave', () => {
            this.ocultarLineaGuia();
        });
    }

    /**
     * Configura el evento drop para mover la tarea dentro de la lista.
     */
    configurarSueltaEnLista() {
        this.listaDiv.addEventListener('drop', (e) => {
            e.preventDefault();
            const tareaId = e.dataTransfer.getData('text/plain');
            const tarea = document.getElementById(tareaId);
            
            if (tarea) {
                // Llama a `moverTarea` para manejar la tarea correctamente en la nueva lista
                this.moverTarea(tarea);
            }
            this.ocultarLineaGuia();
        });
    }
    

    /**
     * Muestra la línea guía en la posición de la tarea objetivo.
     * @param {Element} tarea - La tarea objetivo en la que se debe mostrar la línea guía.
     */
    mostrarLineaGuia(tarea) {
        this.lineaGuia.style.display = 'block';
        this.lineaGuia.style.top = tarea.offsetTop + 'px';
    }

    /**
     * Oculta la línea guía.
     */
    ocultarLineaGuia() {
        this.lineaGuia.style.display = 'none';
    }

     /**
     * Mueve una tarea a esta lista y la guarda en el array de tareas.
     * 
     * @param {Tarea} tarea - La tarea que se mueve.
     */
     moverTarea(tarea, nuevaLista) {
        // Eliminar la tarea de la lista actual
        const index = this.tareas.indexOf(tarea);
        if (index > -1) {
            this.tareas.splice(index, 1);
        }
    
        // Añadir la tarea a la nueva lista
        nuevaLista.tareas.push(tarea);
        nuevaLista.listaDiv.appendChild(tarea.element);
    
        // Actualizar visibilidad de la tarea según el estado de expansión de la nueva lista
        tarea.element.style.display = nuevaLista.expandida ? 'block' : 'none';
    
        // Asegurarse de que todas las tareas en la nueva lista estén visibles según el estado de expansión
        nuevaLista.actualizarVisibilidadTareas();
    }
    
    
    
    
    /**
  * Crea el elemento visual de la lista, que incluye el contenedor de la lista, el título,
  * y las tareas asociadas a la lista. Este método organiza los elementos en el DOM y los
  * prepara para ser mostrados.
  * 
  * @returns {HTMLDivElement} El contenedor principal de la lista, que incluye el título
  *                           y las tareas en su interior.
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
 * Crea un contenedor para el título de la lista y el botón de opciones.
 * Este contenedor incluye un campo de entrada para modificar el título y un botón que
 * despliega un menú de opciones.
 * 
 * @returns {HTMLDivElement} El contenedor del título con las opciones asociadas.
 */
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

    /**
     * Crea el botón de opciones, que abre un menú al hacer clic.
     * El botón tendrá un ícono de tres puntos ('⋮') y al hacer clic en él, 
     * se despliega un menú con varias opciones.
     * 
     * @returns {HTMLButtonElement} El botón de opciones.
     */
    crearBotonOpciones() {
        const opcionesBtn = document.createElement('button');
        opcionesBtn.textContent = '⋮';
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

    /**
     * Crea el menú de opciones que se desplegará al hacer clic en el botón de opciones.
     * Este menú tiene varias acciones, como agregar, eliminar y expandir/contraer la lista.
     * 
     * @returns {HTMLDivElement} El contenedor del menú de opciones.
     */
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

  /**
 * Añade una nueva tarea a la lista visualmente y en el array `this.tareas`.
 * 
 * @param {Tarea} tarea - La tarea que se va a añadir.
 */
  agregarTarea() {
    const nuevaTarea = new Tarea();
    const tareaElement = nuevaTarea.crearTarea();
    tareaElement.style.display = this.expandida ? 'block' : 'none'; // Establecer visibilidad según el estado de expansión
    nuevaTarea.element = tareaElement;
    this.tareas.push(nuevaTarea);
    this.listaDiv.appendChild(tareaElement);
    
    // Asegurarse de que la visibilidad de todas las tareas se actualice
    this.actualizarVisibilidadTareas();
}




/**
 * Crea la opción "Agregar" dentro del menú de opciones. Al hacer clic en esta opción, 
 * se añade una nueva tarea a la lista.
 * 
 * @param {HTMLDivElement} menuLista - El contenedor donde se añadirá la opción "Agregar".
 * @returns {HTMLDivElement} La opción "Agregar" del menú.
 */
crearOpcionAgregar(menuLista) {
    const opcionAgregar = document.createElement('div');
    opcionAgregar.textContent = 'Agregar';

    opcionAgregar.addEventListener('click', () => {
        const nuevaTarea = new Tarea();
        this.agregarTarea(nuevaTarea);
        menuLista.style.display = 'none';
    });

    return opcionAgregar;
}


    /**
     * Crea la opción "Eliminar" dentro del menú de opciones. Al hacer clic en esta opción, 
     * se eliminará la lista completa.
     * 
     * @returns {HTMLDivElement} La opción "Eliminar" del menú.
     */
    crearOpcionEliminar() {
        const opcionEliminar = document.createElement('div');
        opcionEliminar.textContent = 'Eliminar';

        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove();
        });

        return opcionEliminar;
    }

    /**
     * Crea la opción "Expandir/Contraer" dentro del menú de opciones. Al hacer clic en esta opción,
     * se cambiará el estado de expansión de la lista (expandir o contraer todas las tareas).
     * 
     * @param {HTMLDivElement} menuLista - El contenedor donde se añadirá la opción "Expandir/Contraer".
     * @returns {HTMLDivElement} La opción "Expandir/Contraer" del menú.
     */
    crearOpcionExpandirContraer(menuLista) {
        const opcionExpandirContraer = document.createElement('div');
        opcionExpandirContraer.textContent = 'Contraer';
    
        opcionExpandirContraer.addEventListener('click', () => {
            // Cambiar el estado de expansión
            this.expandida = !this.expandida;
            opcionExpandirContraer.textContent = this.expandida ? 'Contraer' : 'Expandir';
    
            // Aplicar la visibilidad a todas las tareas de la lista
            this.actualizarVisibilidadTareas();
            
            // Ocultar el menú de opciones después de hacer clic
            menuLista.style.display = 'none';
        });
    
        return opcionExpandirContraer;
    }
    
    actualizarVisibilidadTareas() {
        // Iterar sobre todas las tareas y actualizar su visibilidad
        this.tareas.forEach((tarea) => {
            if (tarea.element && tarea.element.parentElement === this.listaDiv) {
                tarea.element.style.display = this.expandida ? 'block' : 'none';
            }
        });
    }

    

}
