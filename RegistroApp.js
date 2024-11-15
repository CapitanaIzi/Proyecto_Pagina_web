class RegistroApp {
    constructor() {
        this.formularioRegistro = document.getElementById('registroForm');
        this.mensajeExitoso = document.getElementById('registroExitoso');
        this.inputNombre = document.getElementById('nombre');
        this.inputEmail = document.getElementById('email');
        this.inputContrasena = document.getElementById('password');
        this.inputContenido = document.getElementById('contenido');

        this.verificarRegistroUsuario();

        // Configurar el manejo de eventos
        this.formularioRegistro.addEventListener('submit', (evento) => this.manejarRegistro(evento));
    }

    // Maneja el registro de usuarios
    manejarRegistro(evento) {
        evento.preventDefault();

        const nombre = this.inputNombre.value;
        const email = this.inputEmail.value;
        const contrasena = this.inputContrasena.value;

        if (nombre && email && contrasena) {
            // Guardar los datos del usuario en localStorage
            this.guardarUsuario({ nombre, email, contrasena });

            // Ocultar el formulario de registro y mostrar mensaje de éxito
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    // Guarda los datos del usuario en localStorage
    guardarUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    // Verifica si el usuario ya está registrado
    verificarRegistroUsuario() {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);

            // Ocultar el formulario y mostrar el mensaje de éxito si el usuario ya está registrado
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        }
    }

    // Guarda el contenido ingresado en el área de texto
    guardarContenido() {
        const contenido = this.inputContenido.value;
        if (contenido) {
            localStorage.setItem('contenidoModificado', contenido);
            alert('Contenido guardado correctamente.');
        } else {
            alert('Por favor, escribe algo antes de guardar.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new RegistroApp();
});
