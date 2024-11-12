class OpinionApp {
  constructor() {
    this.opinionesList = document.getElementById('opinionesList');
    this.opinionForm = document.getElementById('opinionForm');
    this.opinionText = document.getElementById('opinionText');

    // Cargar opiniones guardadas al iniciar la página
    this.setupMenuToggle();
    this.setupDocumentClick();
    this.setupThemeToggle(); // Configurar el botón de alternancia de tema
    this.applySavedTheme();
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
  setupMenuToggle() {
    const menuBtn = document.querySelector('.menu-btn');
    const menuPrincipal = document.querySelector('.menuPrincipal');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menuPrincipal.classList.toggle('active');
    });
  }

  setupDocumentClick() {
    const menuBtn = document.querySelector('.menu-btn');
    const menuPrincipal = document.querySelector('.menuPrincipal');

    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !menuPrincipal.contains(e.target)) {
        menuPrincipal.classList.remove('active');
      }
    });
  }

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

// Inicializar la aplicación de opiniones al cargar la página
window.onload = () => {
  new OpinionApp();
};
