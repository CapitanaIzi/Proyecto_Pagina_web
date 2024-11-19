class InteraccionesPagina {
  constructor() {
    this.configurarCambioTema();
    this.aplicarTemaGuardado();
    this.ConfigurarDocumentoClick();
  }

  /**
    * Verifica si el clic fue fuera del menú y del checkbox (el icono) si es asi cierra el menú
    */
  ConfigurarDocumentoClick() {
    const menuPrincipal = document.querySelector('.menuPrincipal');
    const menuCheckbox = document.getElementById('check');

    document.addEventListener('click', (e) => {
      if (!menuCheckbox.contains(e.target) && !menuPrincipal.contains(e.target)) {
        menuCheckbox.checked = false;
      }
    });
  }

  /**
     * Aplica el cambio de tema y cambia el color del SVG y logo segun el Tema y Guarda la preferencia de tema en localStorage
     */
  configurarCambioTema() {
    const enlaceApariencia = document.getElementById('toggleAppearance');
    const logo = document.getElementById('logo');
    const menuIcon = document.getElementById('menu-icon');
    const calendarContainer = document.getElementById('calendar-container');

    enlaceApariencia.addEventListener('click', (evento) => {
      evento.preventDefault();
      document.body.classList.toggle('dark-theme');
      const esTemaOscuro = document.body.classList.contains('dark-theme');
      enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';
      logo.src = esTemaOscuro ? 'logo Oscuro.png' : 'logo terminado.png';

      if (esTemaOscuro) {
        menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
      } else {
        menuIcon.setAttribute('fill', 'black');
      }

      // Cambiar el tema del calendario, si ya está inicializado
      if (calendarContainer && calendarContainer.classList.contains('initialized')) {
        this.aplicarTemaCalendario(esTemaOscuro, calendarContainer);
      }

      // Guardar la preferencia de tema en localStorage
      localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
    });
  }

  /**
   * Aplica el tema al calendario
   * @param {boolean} esTemaOscuro - Si el tema es oscuro o no
   * @param {HTMLElement} calendarContainer - El contenedor del calendario
   */
  aplicarTemaCalendario(esTemaOscuro, calendarContainer) {
    if (esTemaOscuro) {
      calendarContainer.classList.add('dark-theme');
      calendarContainer.classList.remove('light-theme');
    } else {
      calendarContainer.classList.add('light-theme');
      calendarContainer.classList.remove('dark-theme');
    }
  }

  /**
  * Aplica el tema guardado en localStorage 
  */
  aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem('theme');
    const enlaceApariencia = document.getElementById('toggleAppearance');
    const logo = document.getElementById('logo');
    const menuIcon = document.getElementById('menu-icon');
    const calendarContainer = document.getElementById('calendar-container');

    // Aplicar el tema al body
    if (temaGuardado === 'dark') {
      document.body.classList.add('dark-theme');
      enlaceApariencia.textContent = 'Tema Claro';
      logo.src = 'logo Oscuro.png';
      menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
    } else {
      enlaceApariencia.textContent = 'Tema Oscuro';
      logo.src = 'logo terminado.png';
      menuIcon.setAttribute('fill', 'black');
    }

    // Aplicar el tema al calendario si ya está inicializado
    if (calendarContainer && calendarContainer.classList.contains('initialized')) {
      this.aplicarTemaCalendario(temaGuardado === 'dark', calendarContainer);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InteraccionesPagina();
});
