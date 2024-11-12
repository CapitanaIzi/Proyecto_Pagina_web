class Cuadro {
    constructor(content = '', left = '50%', top = '50%', backgroundColor = 'white') {
        // Atributos del cuadro
        this.type = 'cuadro';
        this.content = content;
        this.left = left;
        this.top = top;
        this.backgroundColor = backgroundColor;

        // Llamada a crear el elemento cuando se inicializa la clase
        this.element = this.crearElemento();
        this.habilitarArrastre();  // Habilitar la funcionalidad de arrastre
    }

    /**
     * Crea el elemento div para el cuadro y lo agrega al DOM.
     */
    crearElemento() {
        const cuadro = document.createElement('div');
        cuadro.classList.add('cuadro');
        cuadro.setAttribute('contenteditable', 'true');  // Permite la edición del contenido
        cuadro.innerText = this.content;
        cuadro.style.left = this.left;
        cuadro.style.top = this.top;
        cuadro.style.backgroundColor = this.backgroundColor;
        
        // Agregar al DOM
        document.getElementById('mapa-conceptual').appendChild(cuadro);
        return cuadro;
    }

    /**
     * Habilita la capacidad de arrastrar el cuadro.
     */
    habilitarArrastre() {
        let isDragging = false;
        let offsetX, offsetY;

        this.element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            this.element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.element.style.left = (e.pageX - offsetX) + 'px';
                this.element.style.top = (e.pageY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.element.style.cursor = 'grab';
        });
    }

    /**
     * Obtiene los datos del cuadro como un objeto.
     * @returns {Object} Objeto que contiene los datos del cuadro.
     */
    obtenerDatos() {
        return {
            type: this.type,
            content: this.content,
            left: this.left,
            top: this.top,
            backgroundColor: this.backgroundColor,
        };
    }
}
