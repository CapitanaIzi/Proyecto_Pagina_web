class Flecha {
    constructor(width = '100px', left = '50%', top = '50%', rotation = 'rotate(0deg)') {
        this.type = 'flecha';
        this.width = width;
        this.left = left;
        this.top = top;
        this.rotation = rotation;

        // Crear el elemento y añadirlo al DOM
        this.element = this.crearElemento();
        this.habilitarArrastre();
        this.habilitarRotacion();
        this.habilitarTamano();
    }

    /**
     * Crea el elemento de la flecha y lo agrega al DOM.
     * @returns {HTMLElement} El elemento div que representa la flecha.
     */
    crearElemento() {
        const flecha = document.createElement('div');
        flecha.classList.add('flecha');
        flecha.style.width = this.width;
        flecha.style.left = this.left;
        flecha.style.top = this.top;
        flecha.style.transform = this.rotation;

        // Agregar al DOM
        document.getElementById('mapa-conceptual').appendChild(flecha);
        return flecha;
    }

    /**
     * Habilita el arrastre de la flecha.
     */
    habilitarArrastre() {
        this.element.addEventListener('mousedown', (e) => this.iniciarArrastre(e));
        document.addEventListener('mousemove', (e) => this.moverElemento(e));
        document.addEventListener('mouseup', () => this.terminarArrastre());
    }

    /**
     * Inicia el proceso de arrastre de la flecha.
     * @param {MouseEvent} e - Evento de mouse.
     */
    iniciarArrastre(e) {
        this.isDragging = true;
        this.offsetX = e.offsetX;
        this.offsetY = e.offsetY;
        this.element.style.cursor = 'grabbing';
    }

    /**
     * Mueve el elemento mientras se arrastra.
     * @param {MouseEvent} e - Evento de movimiento del mouse.
     */
    moverElemento(e) {
        if (this.isDragging) {
            this.element.style.left = (e.pageX - this.offsetX) + 'px';
            this.element.style.top = (e.pageY - this.offsetY) + 'px';
        }
    }

    /**
     * Termina el proceso de arrastre de la flecha.
     */
    terminarArrastre() {
        this.isDragging = false;
        this.element.style.cursor = 'grab';
    }

    /**
     * Habilita la rotación de la flecha.
     */
    habilitarRotacion() {
        const controlRotacion = document.createElement('div');
        controlRotacion.classList.add('control-rotacion');
        this.element.appendChild(controlRotacion);

        let isRotating = false;
        let lastAngle = 0;

        controlRotacion.addEventListener('mousedown', (e) => {
            isRotating = true;
            e.stopPropagation();  // Evitar que el evento se propague al mover el cuadro
        });

        document.addEventListener('mousemove', (e) => {
            if (isRotating) {
                const rect = this.element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                this.element.style.transform = `rotate(${angle}deg)`;
                lastAngle = angle;
            }
        });

        document.addEventListener('mouseup', () => {
            isRotating = false;
        });
    }

    /**
     * Habilita la funcionalidad de cambiar el tamaño de la flecha.
     */
    habilitarTamano() {
        const controlTamano = document.createElement('div');
        controlTamano.classList.add('control-tamano');
        this.element.appendChild(controlTamano);

        let isResizing = false;
        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialWidth = 0;
        let initialHeight = 0;

        controlTamano.addEventListener('mousedown', (e) => {
            isResizing = true;
            e.stopPropagation();  // Evitar que el evento se propague al mover el cuadro
            const rect = this.element.getBoundingClientRect();
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            initialWidth = rect.width;
            initialHeight = rect.height;
        });

        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const transform = window.getComputedStyle(this.element).transform;
                let angle = 0;

                // Obtener el ángulo de rotación si hay una transformación
                if (transform !== 'none') {
                    const values = transform.split('(')[1].split(')')[0].split(',');
                    const a = values[0];
                    const b = values[1];
                    angle = Math.atan2(b, a); // Ángulo en radianes
                }

                const mouseDiffX = e.clientX - initialMouseX;
                const mouseDiffY = e.clientY - initialMouseY;

                // Ajustar el cálculo en función de la rotación
                let deltaX = Math.cos(angle) * mouseDiffX + Math.sin(angle) * mouseDiffY;
                let deltaY = Math.sin(angle) * mouseDiffX - Math.cos(angle) * mouseDiffY;

                // Determinar si el ajuste se hace en el ancho o alto según la orientación
                let newWidth = initialWidth + deltaX;

                // Asegurar que el nuevo tamaño sea coherente (evitar valores negativos)
                if (newWidth > 20) {
                    this.element.style.width = Math.abs(newWidth) + 'px';
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    }

    /**
     * Obtiene los datos de la flecha como un objeto.
     * @returns {Object} Datos de la flecha.
     */
    obtenerDatos() {
        return {
            type: this.type,
            width: this.width,
            left: this.left,
            top: this.top,
            rotation: this.rotation,
        };
    }
}
