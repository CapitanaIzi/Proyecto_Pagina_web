class ListaSemanal {
    /**
   * Constructor de la clase ListaSemanal.
   * 
   * @param {HTMLElement} container - Contenedor DOM donde se agregarán las listas semanales.
   */
    constructor(container) {
        this.container = container;
        this.semanas = [];
    }

    /**
     * Crea y agrega un nuevo contenedor de lista semanal al DOM.
     */
    crearListaSemanal() {
        const nuevoContenedor = this.crearContenedorSemanal();
        const tituloEditable = this.crearTituloEditable();
        const iconoExpandir = this.crearIconoExpandir(nuevoContenedor);
        const iconoEliminar = this.crearIconoEliminar(nuevoContenedor);
        const listaSemanalContainer = this.crearListaSemanalContainer();

        nuevoContenedor.appendChild(tituloEditable);
        nuevoContenedor.appendChild(iconoExpandir);
        nuevoContenedor.appendChild(iconoEliminar);
        nuevoContenedor.appendChild(listaSemanalContainer);
        this.agregarDiasDeLaSemana(listaSemanalContainer);
        this.container.appendChild(nuevoContenedor);
    }

    /**
     * Crea el contenedor principal para la lista semanal.
     * @returns {HTMLDivElement} El contenedor principal de la lista semanal.
     */
    crearContenedorSemanal() {
        const contenedor = document.createElement('div');
        contenedor.classList.add('bloque');
        return contenedor;
    }

    /**
     * Crea un campo de entrada editable para el título de la lista semanal.
     * @returns {HTMLInputElement} El campo de entrada del título editable.
     */
    crearTituloEditable() {
        const titulo = document.createElement('input');
        titulo.classList.add('editable-title');
        titulo.placeholder = 'Agregue la semana aquí (Ejemplo: 21/10 al 27/10)';
        return titulo;
    }

    /**
     * Crea el ícono de expandir/contraer y configura su funcionalidad.
     * @param {HTMLDivElement} nuevoContenedor - El contenedor principal que contiene la lista semanal.
     * @returns {HTMLSpanElement} El elemento del ícono de expandir/contraer.
     */
    crearIconoExpandir(nuevoContenedor) {
        const icono = document.createElement('span');
        icono.classList.add('icono-expandir', 'fas', 'fa-chevron-down');
        icono.style.cursor = 'pointer';
        icono.addEventListener('click', () => {
            const listaSemanalContainer = nuevoContenedor.querySelector('.listas-basicas');
            listaSemanalContainer.classList.toggle('colapsada');
            icono.classList.toggle('fa-chevron-down');
            icono.classList.toggle('fa-chevron-up');
        });
        return icono;
    }

    /**
     * Crea el ícono de eliminar y configura su funcionalidad.
     * @param {HTMLDivElement} nuevoContenedor - El contenedor principal que contiene la lista semanal.
     * @returns {HTMLSpanElement} El elemento del ícono de eliminar.
     */
    crearIconoEliminar(nuevoContenedor) {
        const icono = document.createElement('span');
        icono.classList.add('icono-eliminar', 'fas', 'fa-trash');
        icono.style.cursor = 'pointer';
        icono.addEventListener('click', () => {
            this.container.removeChild(nuevoContenedor);
        });
        return icono;
    }

    /**
     * Crea el contenedor que almacenará las listas básicas de la semana.
     * @returns {HTMLDivElement} El contenedor de las listas básicas.
     */
    crearListaSemanalContainer() {
        const container = document.createElement('div');
        container.classList.add('listas-basicas');
        return container;
    }

    /**
     * Agrega los días de la semana como listas básicas al contenedor proporcionado.
     * @param {HTMLDivElement} listaSemanalContainer - El contenedor donde se agregarán las listas básicas.
     */
    agregarDiasDeLaSemana(listaSemanalContainer) {
        const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        diasDeLaSemana.forEach(dia => {
            const lista = new Lista(dia);
            const listaElement = lista.crearListaElement();
            const inputTitulo = listaElement.querySelector('.titulo'); 
            if (inputTitulo) {
                inputTitulo.value = dia;
                inputTitulo.setAttribute('readonly', 'true'); 
            }
            listaSemanalContainer.appendChild(listaElement);
            this.semanas.push(lista);
        });
    }
}