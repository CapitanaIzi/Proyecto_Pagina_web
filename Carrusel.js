class Carrusel {
    constructor(selector) {
      this.elementos = document.querySelectorAll(selector);
      this.totalElementos = this.elementos.length;
      this.indiceActual = 0;
  
      // Inicializa el carrusel mostrando la primera imagen
      this.elementos[this.indiceActual].classList.add('active');
  
      // Asocia las flechas del carrusel
      this.botonAnterior = document.querySelector('.prev');
      this.botonSiguiente = document.querySelector('.next');
  
      this.botonAnterior.addEventListener('click', () => this.mover(-1));
      this.botonSiguiente.addEventListener('click', () => this.mover(1));
    }

  /**
   * Mueve el carrusel en la dirección que se le indica.
   * @param {number} direccion - La dirección del movimiento. 1 para siguiente, -1 para anterior.
   */
  mover(direccion) {
      this.elementos[this.indiceActual].classList.remove('active'); // Esconde la imagen actual
      this.indiceActual = (this.indiceActual + direccion + this.totalElementos) % this.totalElementos; // Mueve al siguiente o anterior
      this.elementos[this.indiceActual].classList.add('active'); // Muestra la nueva imagen
    }
    
  }
  
  // Crear instancia de la clase cuando la página se cargue
  document.addEventListener('DOMContentLoaded', () => {
    new InteraccionesPagina(); 
  // Instancia del carrusel si la clase Carrusel está definida
  if (typeof Carrusel === 'function') {
    const carrusel = new Carrusel('.carousel-item');
  }
});