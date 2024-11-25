class GestorExpandirContraer {
    /**
   * Constructor de la clase GestorExpandirContraer.
   * 
   * @param {string} contenedorSelector - Selector CSS del contenedor que agrupa el título y contenido.
   * @param {string} tituloSelector - Selector CSS del elemento que actúa como título o encabezado del contenedor.
   * @param {string} contenidoSelector - Selector CSS del elemento cuyo contenido puede expandirse o contraerse.
   */
    constructor(contenedorSelector, tituloSelector, contenidoSelector) {
        this.contenedorSelector = contenedorSelector;
        this.tituloSelector = tituloSelector;
        this.contenidoSelector = contenidoSelector;
    }

    /**
     * Inicializa la funcionalidad de expandir/contraer en los contenedores seleccionados.
     */
    agregarIconosExpandirContraer() {
        const contenedores = document.querySelectorAll(this.contenedorSelector);

        contenedores.forEach((contenedor) => {
            const titulo = contenedor.querySelector(this.tituloSelector);
            const contenido = contenedor.querySelector(this.contenidoSelector);

            if (titulo && contenido) {
                this.inicializarIconoExpandir(titulo, contenido);
            }
        });
    }

    /**
     * Configura el ícono de expandir/contraer para un contenedor específico.
     * @param {HTMLElement} titulo - Elemento del título no editable.
     * @param {HTMLElement} contenido - Elemento del contenido colapsable.
     */
    inicializarIconoExpandir(titulo, contenido) {
        const iconoExpandir = document.createElement('span');
        iconoExpandir.classList.add('icono-expandir', 'fas', 'fa-chevron-down');
        iconoExpandir.style.cursor = 'pointer';
        iconoExpandir.style.marginLeft = '10px';

        titulo.appendChild(iconoExpandir);

        iconoExpandir.addEventListener('click', () => {
            this.toggleExpandirContraer(contenido, iconoExpandir);
        });
    }

    /**
     * Alterna entre expandir y contraer el contenido de un contenedor.
     * @param {HTMLElement} contenido - Elemento del contenido colapsable.
     * @param {HTMLElement} icono - Ícono de expandir/contraer.
     */
    toggleExpandirContraer(contenido, icono) {
        const isCollapsed = contenido.classList.contains('colapsada');

        if (isCollapsed) {
            contenido.classList.remove('colapsada');
            icono.classList.remove('fa-chevron-up');
            icono.classList.add('fa-chevron-down');
        } else {
            contenido.classList.add('colapsada');
            icono.classList.remove('fa-chevron-down');
            icono.classList.add('fa-chevron-up');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const gestor = new GestorExpandirContraer(
        '.container',                
        '.non-editable-title',        
        '.listas-basicas, .listas-basicas-container' 
    );
    gestor.agregarIconosExpandirContraer();
});
   

