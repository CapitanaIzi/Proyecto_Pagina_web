class Lista {
    constructor(titulo = "Título") {
        this.titulo = titulo;
        this.tareas = [new Tarea(), new Tarea(), new Tarea()];
        this.listaDiv = this.crearListaElement();
        this.expandida = true;
    }
    moverTarea(tareaId, posicionDestino) {
        // Obtenemos la lista de tareas de la lista actual
        const tareas = Array.from(this.listaDiv.querySelectorAll('.tarea'));
        const tarea = document.getElementById(`tarea-${tareaId}`); // Obtener la tarea a mover

        // Asegurarnos de que la tarea y la posición de destino sean válidas
        if (tarea && posicionDestino >= 0 && posicionDestino <= tareas.length) {
            this.listaDiv.insertBefore(tarea, tareas[posicionDestino] || null);
        }
        console.log(`Moviendo tarea ${tareaId} a la posición ${posicion}`);
    }
    crearListaElement() {
        this.listaDiv = document.createElement('div');
        this.listaDiv.classList.add('lista-basica');

        // Evento para permitir que se suelte una tarea sobre la lista
        this.listaDiv.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir que el elemento sea soltado
        });

        // Evento para manejar el 'drop' de una tarea
        this.listaDiv.addEventListener('drop', (e) => {
            e.preventDefault();

            const tareaId = e.dataTransfer.getData('text/plain'); // Obtener el id de la tarea arrastrada
            const tarea = document.getElementById(tareaId); // Obtener el div de la tarea arrastrada

            // Obtener la posición de donde se suelta la tarea (antes o después de otra tarea)
            const tareas = Array.from(this.listaDiv.querySelectorAll('.tarea'));
            const y = e.clientY; // Coordenada vertical donde se suelta la tarea
            let nextTask = null;

            for (const tareaElement of tareas) {
                const rect = tareaElement.getBoundingClientRect();
                if (y < rect.top + rect.height / 2) {
                    nextTask = tareaElement;
                    break;
                }
            }

            // Insertar la tarea en la posición correcta (antes o después de otras)
            if (nextTask) {
                this.listaDiv.insertBefore(tarea, nextTask);
            } else {
                this.listaDiv.appendChild(tarea);
            }

            // Actualizar el modelo de datos si es necesario (puedes usar un método como moverTarea)
            this.moverTarea(tareaId, this.tareas.length); // Ajusta si se quiere en una posición específica
        });

        // Crear y agregar el título de la lista
        const tituloContainer = this.crearTituloContainer();
        this.listaDiv.appendChild(tituloContainer);

        // Crear las tareas en la lista y agregarlas al DOM
        this.tareas.forEach((tarea) => {
            const tareaElement = tarea.crearTarea();
            tarea.element = tareaElement;
            tareaElement.style.display = this.expandida ? 'block' : 'none';
            this.listaDiv.appendChild(tareaElement);
        });

        return this.listaDiv;
    }
    
    

 
    // Actualiza el orden de las tareas en el DOM
    actualizarLista() {
        this.listaDiv.innerHTML = ''; // Borra la lista actual
        this.crearListaElement(); // Vuelve a crear la lista con el nuevo orden

        // Guardar el nuevo orden en localStorage
        localStorage.setItem('tareas', JSON.stringify(this.tareas.map(t => t.titulo)));
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

        // Crear el ícono para expandir/contraer usando Font Awesome
        const iconoExpandir = document.createElement('span');
        iconoExpandir.classList.add('icono-expandir');
        iconoExpandir.classList.add('fas', 'fa-chevron-down');  // Ícono de Font Awesome para expandir
        iconoExpandir.style.cursor = 'pointer';

        // Cambiar el ícono al hacer clic
        iconoExpandir.addEventListener('click', () => {
            this.expandida = !this.expandida;
            iconoExpandir.classList.toggle('fa-chevron-down', !this.expandida);  // Ícono de expandir
            iconoExpandir.classList.toggle('fa-chevron-up', this.expandida);     // Ícono de contraer
            this.actualizarVisibilidadTareas();
        });

        const opcionesBtn = this.crearBotonOpciones();
        tituloContainer.appendChild(tituloInput);
        tituloContainer.appendChild(iconoExpandir); // Añadir el ícono al contenedor del título
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




    crearMenuOpciones() {
        const menuLista = document.createElement('div');
        menuLista.classList.add('menu-lista');
        menuLista.style.display = 'none';

        // Crear la opción "Eliminar" con ícono de tacho de basura
        const opcionEliminar = this.crearOpcionEliminar(menuLista);

        // Crear la opción "Agregar" con ícono de más
        const opcionAgregar = this.crearOpcionAgregar(menuLista);

        menuLista.append(opcionEliminar, opcionAgregar);
        return menuLista;
    }

    crearOpcionAgregar(menuLista) {
        const opcionAgregar = document.createElement('div');

        // Crear el ícono de agregar (Font Awesome)
        const iconoAgregar = document.createElement('i');
        iconoAgregar.classList.add('fas', 'fa-plus'); // Ícono de Font Awesome para agregar
        opcionAgregar.appendChild(iconoAgregar);

        opcionAgregar.addEventListener('click', () => {
            const nuevaTarea = new Tarea();
            this.agregarTarea(nuevaTarea);
            menuLista.style.display = 'none';
        });

        return opcionAgregar;
    }

    crearOpcionEliminar() {
        const opcionEliminar = document.createElement('div');

        // Crear el ícono de eliminar (Font Awesome)
        const iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash'); // Ícono de Font Awesome para eliminar
        opcionEliminar.appendChild(iconoEliminar);

        opcionEliminar.addEventListener('click', () => {
            this.listaDiv.remove();
        });

        return opcionEliminar;
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

  