class OpinionesApp {
  constructor() {
    this.opinionesList = document.getElementById('opinionesList');
    this.opinionForm = document.getElementById('opinionForm');
    this.opinionText = document.getElementById('opinionText');

    this.setupDocumentClick();
    this.configurarCambioTema();
    this.aplicarTemaGuardado();
    this.loadOpinions();

    // Configurar el manejo del formulario
    this.opinionForm.addEventListener('submit', (event) => this.handleFormSubmit(event));
  }

  // Maneja el envío del formulario de opinión
  handleFormSubmit(event) {
    event.preventDefault();

    const opinionText = this.opinionText.value;
    if (opinionText) {
      this.addOpinion(opinionText);
      this.saveOpinion(opinionText);
      this.clearForm();
    }
  }

  // Añade la opinión al DOM
  addOpinion(texto) {
    const opinionElement = document.createElement('div');
    opinionElement.classList.add('opinion');
    opinionElement.innerHTML = `<p>${texto}</p>`;
    this.opinionesList.appendChild(opinionElement);
  }

  // Guarda la opinión en localStorage
  saveOpinion(texto) {
    const savedOpinions = JSON.parse(localStorage.getItem('opiniones')) || [];
    savedOpinions.push({ texto });
    localStorage.setItem('opiniones', JSON.stringify(savedOpinions));
  }

  // Cargar opiniones desde localStorage
  loadOpinions() {
    const savedOpinions = JSON.parse(localStorage.getItem('opiniones')) || [];
    savedOpinions.forEach(opinion => {
      this.addOpinion(opinion.texto);
    });
  }

  // Limpiar el campo del formulario
  clearForm() {
    this.opinionText.value = '';
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

// Inicializar la aplicación de opiniones al cargar la página
window.onload = () => {
  new OpinionesApp();
};
