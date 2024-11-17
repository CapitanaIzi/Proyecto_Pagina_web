class NoteApp {
  constructor() {
    this.notesListElement = document.getElementById('notesList');
    this.noteTitleElement = document.getElementById('noteTitle');
    this.noteContentElement = document.getElementById('noteContent');
    this.saveNoteButton = document.getElementById('saveNoteBtn');
    this.clearNoteButton = document.getElementById('clearNoteBtn');
    this.addNoteButton = document.getElementById('addNoteBtn'); 

    this.cargarNotas(); 
    this.inicializaEventos();
  }

  /**
   * Inicializar eventos
   */
  inicializaEventos() {
    this.saveNoteButton.addEventListener('click', () => this.guardaNota());
    this.clearNoteButton.addEventListener('click', () => this.limpiaEntradaNota());
    this.addNoteButton.addEventListener('click', () => this.limpiaEntradaNota());
  }

  /**
   *Cargar todas las notas desde el almacenamiento local
   */
  cargarNotas() {
    this.notesListElement.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
      const noteItem = this.creaNotasEnLista(note, index);
      this.notesListElement.appendChild(noteItem);
    });
  }

/**
 *  Crear un elemento de lista para cada nota con titulo y boton de eliminar
 * @param {Object} nota que contiene la informacion
 * @param {Number} posicion de la nota dentro de la lista de notas
 * @returns {HTMLElement} Elemento de lista que contiene el título de la nota y el botón de eliminar.
 */
  creaNotasEnLista(nota, posicion) {
    const articuloNota = document.createElement('li');
    articuloNota.textContent = nota.title || `Nota sin título (${posicion + 1})`;
    articuloNota.onclick = () => this.cargarNota(posicion);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('delete-button');
    botonEliminar.onclick = (event) => {
      event.stopPropagation(); // Evitar que se active `loadNote`
      this.eliminaNota(posicion);
    };

    articuloNota.appendChild(botonEliminar);
    return articuloNota;
  }

  /**
   * Guardar una nueva nota
   */
  guardaNota() {
    const title = this.noteTitleElement.value;
    const content = this.noteContentElement.value;

    if (!content) {
      alert('Por favor, escribe algo en la nota antes de guardar.');
      return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, content });
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('¡Nota guardada con éxito!');

    this.limpiaEntradaNota();
    this.cargarNotas();
  }
/**
 * Cargar una nota específica en el editor
 * @param {} posicion 
 */
  cargarNota(posicion) {
    const notas = JSON.parse(localStorage.getItem('notes')) || [];
    const nota = notas[posicion];

    if (nota) {
      this.noteTitleElement.value = nota.title;
      this.noteContentElement.value = nota.content;
    }
  }
  /**
   *  Limpia los campos de entrada de la nota
   */
  limpiaEntradaNota() {
    this.noteTitleElement.value = '';
    this.noteContentElement.value = '';
  }
  /**
   * elimina una nota q esta guardada en una lista, en la posicion solicitada
   * @param {Number} posicion de la nota a eliminar
   */
  eliminaNota(posicion) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (confirm('¿Seguro que quieres eliminar esta nota?')) {
      notes.splice(posicion, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      this.cargarNotas();
      alert('Nota eliminada');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new NoteApp();
});
