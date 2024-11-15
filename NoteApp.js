class NoteApp {
    constructor() {
        this.notesListElement = document.getElementById('notesList');
        this.noteTitleElement = document.getElementById('noteTitle');
        this.noteContentElement = document.getElementById('noteContent');

        this.setupDocumentClick();
        this.aplicarTemaGuardado(); 
        this.configurarCambioTema()
        this.loadNotes(); // Cargar notas al iniciar
        
    }

    // Cargar todas las notas desde el almacenamiento local
    loadNotes() {
        this.notesListElement.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.forEach((note, index) => {
            const noteItem = this.createNoteListItem(note, index);
            this.notesListElement.appendChild(noteItem);
        });
    }

    // Crear un elemento de lista para cada nota
    createNoteListItem(note, index) {
        const noteItem = document.createElement('li');
        noteItem.textContent = note.title || `Nota sin título (${index + 1})`;
        noteItem.onclick = () => this.loadNote(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = (event) => {
            event.stopPropagation(); // Evitar que se active `loadNote`
            this.deleteNote(index);
        };

        noteItem.appendChild(deleteButton);
        return noteItem;
    }

    // Guardar una nueva nota
    saveNote() {
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

        this.clearNote();
        this.loadNotes();
    }

    // Cargar una nota específica en el editor
    loadNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const note = notes[index];

        if (note) {
            this.noteTitleElement.value = note.title;
            this.noteContentElement.value = note.content;
        }
    }

    // Limpiar los campos de entrada de la nota
    clearNote() {
        this.noteTitleElement.value = '';
        this.noteContentElement.value = '';
    }

    // Eliminar una nota específica
    deleteNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];

        if (confirm('¿Seguro que quieres eliminar esta nota?')) {
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            this.loadNotes();
            alert('Nota eliminada');
        }
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

// Inicializar la aplicación de notas cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const app = new NoteApp();

    // Agregar eventos de los botones de guardar y limpiar desde la instancia de la clase
    const saveNoteButton = document.getElementById('saveNoteBtn');
    const clearNoteButton = document.getElementById('clearNoteBtn');
    const addNoteButton = document.getElementById('addNoteBtn');  // Este es el botón '+'

    // Conectar los eventos de los botones con las funciones correspondientes
    saveNoteButton.addEventListener('click', () => app.saveNote());
    clearNoteButton.addEventListener('click', () => app.clearNote());
    
    // Evento para el botón '+', que limpia los campos de la nota para crear una nueva
    addNoteButton.addEventListener('click', () => app.clearNote());
});

