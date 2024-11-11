
// Función para manejar el registro
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (nombre && email && password) {
        // Guardar los datos en localStorage (para que el usuario pueda acceder desde su dispositivo actual)
        localStorage.setItem('usuario', JSON.stringify({ nombre, email, password }));

        // Ocultar el formulario de registro
        document.getElementById('registroForm').style.display = 'none';

        // Mostrar el mensaje de registro exitoso
        document.getElementById('registroExitoso').style.display = 'block';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Verificar si el usuario ya está registrado (esto es solo para futuras sesiones)
window.onload = function() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
        // Si ya está registrado, mostrar el mensaje de bienvenida
        const usuario = JSON.parse(usuarioGuardado);
        alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);
        document.getElementById('registroForm').style.display = 'none';
        document.getElementById('registroExitoso').style.display = 'block';
    }
}
function guardarContenido() {
    const contenido = document.getElementById('contenido').value;
    if (contenido) {
        // Guardar en localStorage
        localStorage.setItem('contenidoModificado', contenido);
        alert('Contenido guardado correctamente.');
    } else {
        alert('Por favor, escribe algo antes de guardar.');
    }
}
