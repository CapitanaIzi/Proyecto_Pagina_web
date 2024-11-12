class NoteApp {
    constructor() {
        this.notesListElement = document.getElementById('notesList');
        this.noteTitleElement = document.getElementById('noteTitle');
        this.noteContentElement = document.getElementById('noteContent');

        this.setupMenuToggle();
        this.setupDocumentClick();
        this.setupThemeToggle(); // Configurar el botón de alternancia de tema
        this.applySavedTheme();
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

// Inicializar la aplicación de notas cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const app = new NoteApp();

    // Agregar eventos de los botones de guardar y limpiar
    document.getElementById('saveNoteBtn').addEventListener('click', () => app.saveNote());
    document.getElementById('clearNoteBtn').addEventListener('click', () => app.clearNote());
});
