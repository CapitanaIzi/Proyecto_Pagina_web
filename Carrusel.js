class Carrusel {
   /**
   * Constructor de la clase Carrusel.
   * 
   * @param {string} selector - Selector CSS que identifica los elementos del carrusel.
   */
  constructor(selector) {
    this.elementos = document.querySelectorAll(selector);
    this.totalElementos = this.elementos.length;
    this.indiceActual = 0;
    this.elementos[this.indiceActual].classList.add('active');
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
    this.elementos[this.indiceActual].classList.remove('active');
    this.indiceActual = (this.indiceActual + direccion + this.totalElementos) % this.totalElementos;
    this.elementos[this.indiceActual].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Carrusel === 'function') {
    new Carrusel('.carousel-item');
  }
});