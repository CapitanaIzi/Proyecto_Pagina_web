// Clase para las interacciones de la página
class InteraccionesPagina {
  constructor() {
    this.configurarCambioMenu();
    this.configurarClicFueraDelMenu();
    this.configurarCambioTema();
    this.aplicarTemaGuardado();
  }

  // Configura la interacción del menú
  configurarCambioMenu() {
    const botonMenu = document.querySelector('.menu-btn');
    const menuPrincipal = document.querySelector('.menuPrincipal');

    botonMenu.addEventListener('click', (e) => {
      e.stopPropagation();
      menuPrincipal.classList.toggle('active');
    });
  }

  // Cierra el menú si se hace clic fuera de él
  configurarClicFueraDelMenu() {
    const botonMenu = document.querySelector('.menu-btn');
    const menuPrincipal = document.querySelector('.menuPrincipal');

    document.addEventListener('click', (e) => {
      if (!botonMenu.contains(e.target) && !menuPrincipal.contains(e.target)) {
        menuPrincipal.classList.remove('active');
      }
    });
  }

  // Configura el cambio de tema
  configurarCambioTema() {
    const enlaceApariencia = document.getElementById('toggleAppearance');

    enlaceApariencia.addEventListener('click', (evento) => {
      evento.preventDefault();
      document.body.classList.toggle('dark-theme');

      const esTemaOscuro = document.body.classList.contains('dark-theme');
      enlaceApariencia.textContent = esTemaOscuro ? 'Apariencia Clara' : 'Apariencia Oscura';

      // Guardar la preferencia de tema en localStorage
      localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
    });
  }

  // Aplica el tema guardado en localStorage
  aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem('theme');
    const enlaceApariencia = document.getElementById('toggleAppearance');

    if (temaGuardado === 'dark') {
      document.body.classList.add('dark-theme');
      enlaceApariencia.textContent = 'Apariencia Clara';
    } else {
      enlaceApariencia.textContent = 'Apariencia Oscura';
    }
  }
}



// Crear instancias de las clases cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
  // Instancia de la clase de Interacciones de la Página
  const interaccionesPagina = new InteraccionesPagina();

  // Instancia del carrusel
  const carrusel = new Carrusel('.carousel-item');
});
