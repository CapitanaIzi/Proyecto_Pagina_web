class MapaConceptual {
    constructor() {
        this.elementos = []; 
        this.diagrama = new Diagrama();    
        this.cargarElementos(); 
    }
   
    /**
     * Guarda el estado del mapa conceptual en localStorage.
     */
    guardarEstado() {
        this.elementos = [];
        const titulo = this.diagrama.obtenerTitulo();
        this.elementos.push(titulo);

        this.agregarElementosPorClase('cuadro', (element) => {
            const cuadro = new Cuadro (element.innerText, element.style.left, element.style.top, element.style.backgroundColor);
            this.elementos.push(cuadro.obtenerDatos());
        });
        this.agregarElementosPorClase('flecha', (element) => {
            const flecha = new Flecha (element.style.width, element.style.left, element.style.top, element.style.transform);
            this.elementos.push(flecha.obtenerDatos());
        });
        localStorage.setItem('mapaConceptual', JSON.stringify(this.elementos));
        console.log('Estado guardado:', this.elementos);
    }

    /**
     * Carga los elementos guardados desde localStorage.
     */
    cargarElementos() {
        const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
        if (elementosGuardados) {
            elementosGuardados.forEach(item => {
                if (item.type === 'titulo') {
                    this.diagrama.cargarTitulo(item.content);
                } else if (item.type === 'cuadro') {
                    new Cuadro(item.content, item.left, item.top, item.backgroundColor);
                } else if (item.type === 'flecha') {
                    new Flecha(item.width, item.left, item.top, item.rotation);
                }
            });
        }
    }

    /**
     * Agrega elementos de una clase específica al array de elementos.
     * 
     * @param {string} clase - Nombre de la clase de los elementos a guardar.
     * @param {Function} callback - Función que obtiene los datos del elemento.
     */
    agregarElementosPorClase(clase, callback) {
        const elementosDom = document.getElementsByClassName(clase);
        for (let element of elementosDom) {
            callback(element);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const mapa = new MapaConceptual();
});
