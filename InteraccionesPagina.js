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
 
    // Configura el cambio de tema
    configurarCambioTema() {
      const enlaceApariencia = document.getElementById('toggleAppearance');
      const logo = document.getElementById('logo');
      const menuIcon = document.getElementById('menu-icon');
  
      enlaceApariencia.addEventListener('click', (evento) => {
        evento.preventDefault();
        document.body.classList.toggle('dark-theme');
        const esTemaOscuro = document.body.classList.contains('dark-theme');
        
        // Cambiar texto del enlace de apariencia
        enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';
        
        // Cambiar logo dependiendo del tema
        logo.src = esTemaOscuro ? 'logo Oscuro.png' : 'logo terminado.png';
        
        // Cambiar SVG icono del menú
        if (esTemaOscuro) {
          menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
        } else {
          menuIcon.setAttribute('fill', 'black'); // Cambiar el color del SVG a negro
        }
        
        // Guardar la preferencia de tema en localStorage
        localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
      });
    }
  
    // Aplica el tema guardado en localStorage
    aplicarTemaGuardado() {
      const temaGuardado = localStorage.getItem('theme');
      const enlaceApariencia = document.getElementById('toggleAppearance');
      const logo = document.getElementById('logo');
      const menuIcon = document.getElementById('menu-icon');
  
      if (temaGuardado === 'dark') {
        document.body.classList.add('dark-theme');
        enlaceApariencia.textContent = 'Tema Claro';
        logo.src = 'logo Oscuro.png'; // Logo claro
        menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
      } else {
        enlaceApariencia.textContent = 'Tema Oscuro';
        logo.src = 'logo terminado.png'; // Logo oscuro
        menuIcon.setAttribute('fill', 'black'); // Cambiar el color del SVG a negro
      }
    }
  }
  
  // Crear instancia de la clase cuando la página se cargue
  document.addEventListener('DOMContentLoaded', () => {
    new InteraccionesPagina(); // Iniciar la clase
  
  // Instancia del carrusel si la clase Carrusel está definida
  if (typeof Carrusel === 'function') {
    const carrusel = new Carrusel('.carousel-item');
  }
});
