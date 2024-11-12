class PageInteractions {
    constructor() {
      this.setupMenuToggle();
      this.setupDocumentClick();
      this.setupThemeToggle();
      this.applySavedTheme();
    }
  
    // Configura la interacción del menú
    setupMenuToggle() {
      const menuBtn = document.querySelector('.menu-btn');
      const menuPrincipal = document.querySelector('.menuPrincipal');
  
      menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuPrincipal.classList.toggle('active');
      });
    }
  
    // Cierra el menú si se hace clic fuera de él
    setupDocumentClick() {
      const menuBtn = document.querySelector('.menu-btn');
      const menuPrincipal = document.querySelector('.menuPrincipal');
  
      document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menuPrincipal.contains(e.target)) {
          menuPrincipal.classList.remove('active');
        }
      });
    }
  
    // Configura el cambio de tema
    setupThemeToggle() {
      const appearanceLink = document.getElementById('toggleAppearance');
  
      appearanceLink.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.toggle('dark-theme');
  
        const isDarkTheme = document.body.classList.contains('dark-theme');
        appearanceLink.textContent = isDarkTheme ? 'Apariencia Clara' : 'Apariencia Oscura';
  
        // Guardar la preferencia de tema en localStorage
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
      });
    }
  
    // Aplica el tema guardado en localStorage
    applySavedTheme() {
      const savedTheme = localStorage.getItem('theme');
      const appearanceLink = document.getElementById('toggleAppearance');
  
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        appearanceLink.textContent = 'Apariencia Clara';
      } else {
        appearanceLink.textContent = 'Apariencia Oscura';
      }
    }
  }
  
  // Clase del carrusel
  class Carousel {
    constructor(selector) {
      this.items = document.querySelectorAll(selector);
      this.totalItems = this.items.length;
      this.currentIndex = 0;
  
      // Inicializa el carrusel mostrando la primera imagen
      this.items[this.currentIndex].classList.add('active');
  
      // Asocia las flechas del carrusel
      this.prevButton = document.querySelector('.prev');
      this.nextButton = document.querySelector('.next');
  
      this.prevButton.addEventListener('click', () => this.move(-1));
      this.nextButton.addEventListener('click', () => this.move(1));
    }
  
    move(direction) {
      this.items[this.currentIndex].classList.remove('active'); // Esconde la imagen actual
      this.currentIndex = (this.currentIndex + direction + this.totalItems) % this.totalItems; // Mueve al siguiente o anterior
      this.items[this.currentIndex].classList.add('active'); // Muestra la nueva imagen
    }
  }
  
  // Crear instancias de las clases cuando la página se cargue
  document.addEventListener('DOMContentLoaded', () => {
    // Instancia de la clase de Interacciones de la Página
    const pageInteractions = new PageInteractions();
  
    // Instancia del carrusel
    const carousel = new Carousel('.carousel-item');
  });
  