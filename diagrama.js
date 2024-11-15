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
        this.isMouseDown = false;
        this.init();
    }
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
        this.configurarMenu();
        this.configurarColor();
        this.seleccionarCuadroActivo();

    }
        /**
         * configura los eventos de click respecto a cuadrado, flecha 
         */
    configurarEventos() {
        this.guardarBtn.addEventListener('click', () => {
            this.guardarEstado();
            alert('Estado guardado.');
        });
        this.seleccionarCuadroActivo();
        document.getElementById('insertar-cuadro').addEventListener('click', () => this.crearCuadro());
        document.getElementById('insertar-flecha').addEventListener('click', () => this.crearFlecha());
        this.configurarEventoEliminar();
    }
    /**
    * configura el menu de Insertar Editar y Color
    */
    configurarMenu() {
        this.configurarMenuDiagrama(this.btnInsertar, this.menuInsertar);
        this.configurarMenuDiagrama(this.btnEditar, this.menuEditar);
        this.configurarMenuDiagrama(this.btnColor, this.menuColor);
    }

    /**
 * Configura el comportamiento de un menú en el diagrama.
 * Permite mostrar y ocultar el menú al hacer clic sobre un botón,y cerrar el menú si se hace clic fuera de él o del botón que lo activa.
 * @param {HTMLElement} button - El botón que activa la visibilidad del menú.
 * @param {HTMLElement} menu - El menú que se muestra o se oculta.
 */
configurarMenuDiagrama(button, menu) {
    // Al hacer clic en el botón, alternamos la visibilidad del menú
    button.addEventListener('click', (e) => {
        e.stopPropagation();  // Previene que el evento se propague al documento
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        // Verifica si el clic no ocurrió dentro del menú ni en el botón
        if (!menu.contains(e.target) && e.target !== button) {
            menu.style.display = 'none';
        }
    });
}

    /**
    * configura el evento eliminar pata cuando el elemento pase sobre el sea eliminado
    */
    configurarEventoEliminar() {
        // Detecta cuando el mouse está presionado
        document.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });

        // Detecta cuando el mouse se libera
        document.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        // Detecta el movimiento del mouse para eliminar elementos
        this.eliminarBtn.addEventListener('mousemove', (e) => {
            if (this.isMouseDown && this.cuadroActivo) {  // Solo eliminar si el clic está presionado
                const rectEliminarBtn = this.eliminarBtn.getBoundingClientRect();
                const rectCuadroActivo = this.cuadroActivo.getBoundingClientRect();

                if (this.ElementoSobreBotonEliminar(rectCuadroActivo, rectEliminarBtn)) {
                    this.cuadroActivo.remove();  // Elimina el cuadro activo
                    this.cuadroActivo = null;  // Resetea el cuadro activo
                }
            }
        });
    }
    /**
     * Evalua si el elemento entra en el rango permitido para eliminar
     * @param {Object} rectElemento Elemento que va ser eliminado
     * @param {HTMLButtonElement} rectEliminarBtn Boton para eliminar
     * @returns true si esta sobre el boton, sino False
     */
    ElementoSobreBotonEliminar(rectElemento, rectEliminarBtn) {
        return rectElemento.bottom > rectEliminarBtn.top &&
            rectElemento.top < rectEliminarBtn.bottom &&
            rectElemento.right > rectEliminarBtn.left &&
            rectElemento.left < rectEliminarBtn.right;
    }
    /**
   * Crea el cuadro usando Clase Cuadro
   */
    crearCuadro() {
        const nuevoCuadro = new Cuadro();
        this.cuadroActivo = nuevoCuadro.element;
    }
    /**
   * Crea la flecha usando Clase Flecha
   */
    crearFlecha() {
        new Flecha();
    }
    /**
   * Configura el color del cuadro seleccionado
   */
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
    /**
   * Aca selecciona el cuadro que sera modificado el color
   */
    seleccionarCuadroActivo() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cuadro')) {
                this.cuadroActivo = e.target;
            }
        });
    }
    /**
   * guarda el estado de todos los elementos
   */
    guardarEstado() {
        console.log("Estado guardado");
    }
  
  

}


