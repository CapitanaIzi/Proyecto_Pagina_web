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

      localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
    });
  }

  /**
  * Aplica el tema guardado en localStorage 
  */
  aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem('theme');
    const enlaceApariencia = document.getElementById('toggleAppearance');
    const logo = document.getElementById('logo');
    const menuIcon = document.getElementById('menu-icon');

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
  }
}
document.addEventListener('DOMContentLoaded', () => {
  new InteraccionesPagina();
});
