class Diagrama {
    constructor() {
        this.cuadroActivo = null;
        this.guardarBtn = document.getElementById('btn-guardar');
        this.eliminarBtn = document.getElementById('btn-eliminar');
        this.btnInsertar = document.getElementById('btn-insertar');
        this.menuInsertar = document.getElementById('menu-insertar');
        this.btnEditar = document.getElementById('btn-editar');
        this.menuEditar = document.getElementById('menu-editar');
        this.btnColor = document.getElementById('btn-color');
        this.menuColor = document.getElementById('menu-color');
        this.titulo = document.getElementById('titulo');
        
        this.init();
    }

   
 // Métodos para obtener y cargar el título del mapa conceptual
    /**
     * Obtiene el título del mapa conceptual.
     * @returns {Object} Objeto que representa el título.
     */
    obtenerTitulo() {
        const titulo = this.titulo.innerText || ''; // Obtener el texto del título
        return {
            type: 'titulo',
            content: titulo,
        };
    }

    /**
     * Carga el título en el DOM.
     * @param {string} content - El contenido del título.
     */
    cargarTitulo(content) {
        this.titulo.innerText = content; // Establecer el nuevo texto del título
    }

    init() {
        this.configurarEventos();
        this.cargarElementos();
        this.configurarMenu();
        this.configurarColor();
        this.seleccionarCuadroActivo();
    }

    configurarEventos() {
        this.guardarBtn.addEventListener('click', () => {
            this.guardarEstado();
            alert('Estado guardado.');
        });

        document.getElementById('insertar-cuadro').addEventListener('click', () => this.crearCuadro());
        document.getElementById('insertar-flecha').addEventListener('click', () => this.crearFlecha());
        this.configurarEventoEliminar();
    }

    configurarMenu() {
        this.configurarMenuDiagrama(this.btnInsertar, this.menuInsertar);
        this.configurarMenuDiagrama(this.btnEditar, this.menuEditar);
        this.configurarMenuDiagrama(this.btnColor, this.menuColor);
    }

    configurarMenuDiagrama(button, menu) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.display = 'none';
            }
        });
    }

    configurarEventoEliminar() {
        this.eliminarBtn.addEventListener('mousemove', (e) => {
            const rectEliminarBtn = this.eliminarBtn.getBoundingClientRect();
            const elementos = document.querySelectorAll('.cuadro, .flecha');

            elementos.forEach(element => {
                const rectElemento = element.getBoundingClientRect();
                if (this.isElementoSobreBotonEliminar(rectElemento, rectEliminarBtn)) {
                    element.remove();
                }
            });
        });
    }
    /**
     * Evalua si el elemento entra en el rango permitido para eliminar
     * @param {Object} rectElemento Elemento que va ser eliminado
     * @param {HTMLButtonElement} rectEliminarBtn Boton para eliminar
     * @returns true si esta sobre el boton, sino False
     */
    isElementoSobreBotonEliminar(rectElemento, rectEliminarBtn) {
        return rectElemento.bottom > rectEliminarBtn.top &&
               rectElemento.top < rectEliminarBtn.bottom &&
               rectElemento.right > rectEliminarBtn.left &&
               rectElemento.left < rectEliminarBtn.right;
    }

    crearCuadro() {
        const nuevoCuadro = new Cuadro();
        this.cuadroActivo = nuevoCuadro.element;
    }

    crearFlecha() {
        new Flecha();
    }

    configurarColor() {
        document.querySelectorAll('.color-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.getAttribute('data-color');
                if (this.cuadroActivo) {
                    this.cuadroActivo.style.backgroundColor = color;
                }
            });
        });
    }

    seleccionarCuadroActivo() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cuadro')) {
                this.cuadroActivo = e.target;
            }
        });
    }

    guardarEstado() {
        console.log("Estado guardado");
    }

    cargarElementos() {
        // Lógica para cargar el estado de los elementos
    }

}


