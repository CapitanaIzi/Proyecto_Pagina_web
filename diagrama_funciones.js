

/**
 * Guarda el estado del mapa conceptual en localStorage.
 */
function guardarEstado() {
    const elementos = [];
    const titulo = obtenerTitulo(); // Obtener el título
    elementos.push(titulo); // Guardar el título

    // Guardar cuadros
    agregarElementosPorClase(elementos, 'cuadro', obtenerDatosCuadro);

    // Guardar flechas
    agregarElementosPorClase(elementos, 'flecha', obtenerDatosFlecha);

    // Guardar en localStorage
    localStorage.setItem('mapaConceptual', JSON.stringify(elementos));
    console.log('Estado guardado:', elementos);
}

/**
 * Carga los elementos guardados desde localStorage.
 */
function cargarElementos() {
    const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
    if (elementosGuardados) {
        elementosGuardados.forEach(item => {
            if (item.type === 'titulo') {
                cargarTitulo(item.content);
            } else if (item.type === 'cuadro') {
                crearCuadroDesdeDatos(item);
            } else if (item.type === 'flecha') {
                crearFlechaDesdeDatos(item);
            }
        });
    }
}

/**
 * Obtiene el título del mapa conceptual.
 * 
 * @returns {Object} Objeto que representa el título.
 */
function obtenerTitulo() {
    const titulo = document.getElementById('titulo').innerText || '';
    return {
        type: 'titulo',
        content: titulo,
    };
}

/**
 * Agrega elementos de una clase específica al array de elementos.
 * 
 * @param {Array} elementos - Array donde se guardarán los elementos.
 * @param {string} clase - Nombre de la clase de los elementos a guardar.
 * @param {Function} obtenerDatos - Función que obtiene los datos del elemento.
 */
function agregarElementosPorClase(elementos, clase, obtenerDatos) {
    const elementosDom = document.getElementsByClassName(clase);
    for (let element of elementosDom) {
        elementos.push(obtenerDatos(element));
    }
}

/**
 * Obtiene los datos de un cuadro.
 * 
 * @param {HTMLElement} cuadro - El elemento cuadro del DOM.
 * @returns {Object} Objeto que representa el cuadro.
 */
function obtenerDatosCuadro(cuadro) {
    return {
        type: 'cuadro',
        content: cuadro.innerText,
        left: cuadro.style.left,
        top: cuadro.style.top,
        backgroundColor: cuadro.style.backgroundColor,
    };
}

/**
 * Obtiene los datos de una flecha.
 * 
 * @param {HTMLElement} flecha - El elemento flecha del DOM.
 * @returns {Object} Objeto que representa la flecha.
 */
function obtenerDatosFlecha(flecha) {
    return {
        type: 'flecha',
        width: flecha.style.width,
        left: flecha.style.left,
        top: flecha.style.top,
        rotation: flecha.style.transform,
    };
}

/**
 * Carga el título en el DOM.
 * 
 * @param {string} content - El contenido del título.
 */
function cargarTitulo(content) {
    const tituloElemento = document.getElementById('titulo');
    tituloElemento.innerText = content;
}

/**
 * Crea un cuadro desde los datos guardados.
 * 
 * @param {Object} item - Objeto que contiene los datos del cuadro.
 */
function crearCuadroDesdeDatos(item) {
    const cuadro = new Cuadro(item.content, item.left, item.top);
    cuadro.element.style.backgroundColor = item.backgroundColor;
}

/**
 * Crea una flecha desde los datos guardados.
 * 
 * @param {Object} item - Objeto que contiene los datos de la flecha.
 */
function crearFlechaDesdeDatos(item) {
    new Flecha(item.width, item.left, item.top, item.rotation);
}
