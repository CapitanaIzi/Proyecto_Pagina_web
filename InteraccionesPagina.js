// Clase para las interacciones de la página
class InteraccionesPagina {
  constructor() {
    this.configurarCambioTema();
    this.aplicarTemaGuardado();
    this.setupDocumentClick();
  }
  setupDocumentClick() {
    const menuPrincipal = document.querySelector('.menuPrincipal');
    const menuCheckbox = document.getElementById('check');
  
    // Agrega un evento al documento para cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (e) => {
      // Verifica si el clic fue fuera del menú y del checkbox (el icono)
      if (!menuCheckbox.contains(e.target) && !menuPrincipal.contains(e.target)) {
        menuCheckbox.checked = false; // Desmarca el checkbox para cerrar el menú
      }
    });
  }
  configurarCambioTema() {
    const enlaceApariencia = document.getElementById('toggleAppearance');

    enlaceApariencia.addEventListener('click', (evento) => {
      evento.preventDefault();
      document.body.classList.toggle('dark-theme');

      const esTemaOscuro = document.body.classList.contains('dark-theme');
      enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';

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
      enlaceApariencia.textContent = 'Tema Claro';
    } else {
      enlaceApariencia.textContent = 'Tema Oscuro';
    }
  }
}

// Crear instancias de las clases cuando la página se cargue
document.addEventListener('DOMContentLoaded', () => {
  // Instancia de InteraccionesPagina para manejar el tema
  const interaccionesPagina = new InteraccionesPagina();

  // Instancia del carrusel si la clase Carrusel está definida
  if (typeof Carrusel === 'function') {
    const carrusel = new Carrusel('.carousel-item');
  }
});
