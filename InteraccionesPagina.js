// Clase para las interacciones de la página
class InteraccionesPagina {
  constructor() {
    this.configurarCambioTema();
    this.aplicarTemaGuardado();
  }

  // Configura el cambio de tema
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

  // Instancia del carrusel
  const carrusel = new Carrusel('.carousel-item');
});
