class MapaConceptual {
    constructor() {
        this.elementos = []; 
        this.diagrama = new Diagrama();    
    }

    /**
     * Aquí eliminamos cualquier función de guardar estado, ya que ya no utilizaremos LocalStorage.
     */
    // Esta función ya no es necesaria
    // guardarEstado() {
    //     console.log("Estado guardado");
    // }

    /**
     * Esta función de carga tampoco es necesaria.
     */
    // cargarElementos() {
    //     const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
    //     if (elementosGuardados) {
    //         elementosGuardados.forEach(item => {
    //             if (item.type === 'titulo') {
    //                 this.diagrama.cargarTitulo(item.content);
    //             } else if (item.type === 'cuadro') {
    //                 new Cuadro(item.content, item.left, item.top, item.backgroundColor);
    //             } else if (item.type === 'flecha') {
    //                 new Flecha(item.width, item.left, item.top, item.rotation);
    //             }
    //         });
    //     }
    // }
}

document.addEventListener('DOMContentLoaded', () => {
    const mapa = new MapaConceptual();
});
