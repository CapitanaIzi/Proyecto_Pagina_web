class OpinionesApp {
  constructor() {
    this.opinionesList = document.getElementById('opinionesList');
    this.opinionForm = document.getElementById('opinionForm');
    this.opinionText = document.getElementById('opinionText');

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
}

// Inicializar la aplicación de opiniones al cargar la página
window.onload = () => {
  new OpinionesApp();
};
