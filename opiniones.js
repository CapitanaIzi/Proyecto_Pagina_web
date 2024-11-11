// Manejar el envío de opiniones
document.getElementById('opinionForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const opinionText = document.getElementById('opinionText').value;
    if (opinionText) {
      // Crear un nuevo contenedor para la opinión
      const opinionElement = document.createElement('div');
      opinionElement.classList.add('opinion');
      opinionElement.innerHTML = `<p>${opinionText}</p>`;
  
      // Agregar la nueva opinión al listado de opiniones
      const opinionesList = document.getElementById('opinionesList');
      opinionesList.appendChild(opinionElement);
  
      // Guardar la nueva opinión en localStorage
      const savedOpinions = JSON.parse(localStorage.getItem('opiniones')) || [];
      savedOpinions.push({ texto: opinionText });
      localStorage.setItem('opiniones', JSON.stringify(savedOpinions));
  
      // Limpiar el formulario
      document.getElementById('opinionText').value = '';
    }
  });
  
  // Cargar las opiniones guardadas al cargar la página
  window.onload = function() {
    const savedOpinions = JSON.parse(localStorage.getItem('opiniones')) || [];
    const opinionesList = document.getElementById('opinionesList');
    
    savedOpinions.forEach(function(opinion) {
      const opinionElement = document.createElement('div');
      opinionElement.classList.add('opinion');
      opinionElement.innerHTML = `<p>${opinion.texto}</p>`;
      opinionesList.appendChild(opinionElement);
    });
  };
  