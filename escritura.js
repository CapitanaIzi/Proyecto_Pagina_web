// Cargar las notas guardadas al iniciar la página
document.addEventListener('DOMContentLoaded', loadNotes);

function loadNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.textContent = note.title || `Nota sin título (${index + 1})`;
        noteItem.onclick = () => loadNote(index);

        // Botón de eliminación para cada nota
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = (event) => {
            event.stopPropagation(); // Evitar que se active `loadNote`
            deleteNote(index);
        };

        noteItem.appendChild(deleteButton);
        notesList.appendChild(noteItem);
    });
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!content) {
        alert('Por favor, escribe algo en la nota antes de guardar.');
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.push({ title, content });
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('¡Nota guardada con éxito!');
    
    clearNote();
    loadNotes();
}

function loadNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];

    if (note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
    }
}

function clearNote() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}

// Eliminar una nota específica
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Confirmar eliminación
    if (confirm('¿Seguro que quieres eliminar esta nota?')) {
        notes.splice(index, 1); // Eliminar la nota del array
        localStorage.setItem('notes', JSON.stringify(notes)); // Actualizar en localStorage
        loadNotes(); // Recargar la lista de notas
        alert('Nota eliminada');
    }
}
