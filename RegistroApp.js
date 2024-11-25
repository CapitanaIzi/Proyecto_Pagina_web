class RegistroApp {
    constructor() {
        this.formularioRegistro = document.getElementById('registroForm');
        this.mensajeExitoso = document.getElementById('registroExitoso');
        this.inputNombre = document.getElementById('nombre');
        this.inputEmail = document.getElementById('email');
        this.inputContrasena = document.getElementById('password');
        this.inputContenido = document.getElementById('contenido');
        this.verificarRegistroUsuario();
        this.formularioRegistro.addEventListener('submit', (evento) => this.manejarRegistro(evento));
    }

    /**
     * Maneja el registro del usuario cuando el formulario es enviado.
     * Evita que se recargue la página y guarda los datos del usuario.
     * 
     * @param {Event} evento - El evento de submit del formulario.
     */
    manejarRegistro(evento) {
        evento.preventDefault(); 
        const nombre = this.inputNombre.value;
        const email = this.inputEmail.value;
        const contrasena = this.inputContrasena.value;
        if (nombre && email && contrasena) {
            this.guardarUsuario({ nombre, email, contrasena });
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    /**
     * Guarda los datos del usuario en localStorage.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario (nombre, email, contrasena).
     */
    guardarUsuario(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    /**
     * Verifica si el usuario ya está registrado al cargar la página.
     * Si el usuario está registrado, muestra un mensaje de bienvenida y oculta el formulario.
     */
    verificarRegistroUsuario() {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado); 
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`); 
            this.formularioRegistro.style.display = 'none';
            this.mensajeExitoso.style.display = 'block';
        }
    }
    /**
     * Guarda el contenido ingresado en el área de texto en localStorage.
     * Muestra un mensaje de confirmación o error.
     */
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
 new RegistroApp();
});
