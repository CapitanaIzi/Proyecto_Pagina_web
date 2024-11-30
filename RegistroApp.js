class RegistroApp {
    constructor() {
        this.bienvenidaSection = document.getElementById("bienvenidaSection");
        this.bienvenidaDefault = document.getElementById("bienvenidaDefault");
        this.nombreUsuarioSpan = document.getElementById("nombreUsuario");
        this.registerForm = document.getElementById("registerForm");
        this.loginForm = document.getElementById("loginForm");

        // Inicializa el estado del usuario
        this.checkLoginStatus();

        // Evento de envío de formulario de registro
        if (this.registerForm) {
            this.registerForm.addEventListener("submit", (event) => this.handleRegister(event));
        }
         // Evento de envío de formulario de inicio de sesión
    if (this.loginForm) {
        this.loginForm.addEventListener("submit", (event) => this.handleLogin(event));
    }
    }

    // Función para registrar y autenticar al usuario
    handleRegister(event) {
        event.preventDefault(); // Previene que el formulario se envíe de la forma tradicional

        // Obtener los datos del formulario
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("emailRegister").value;
        const password = document.getElementById("passwordRegister").value;

        // Crear un objeto de usuario
        const usuario = {
            nombre: nombre,
            email: email,
            password: password, // En una implementación real, nunca debes guardar la contraseña sin encriptar.
        };

        // Guardar el usuario en localStorage (simula el inicio de sesión)
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

        // Mostrar estado del usuario
        this.mostrarEstadoUsuario(nombre);

        // Redirigir a la página principal o index.html automáticamente después del registro
        window.location.href = "index.html";
    }

    // Función para mostrar el estado del usuario (bienvenida)
    mostrarEstadoUsuario(nombre) {
        // Se esconde el mensaje por defecto
        if (this.bienvenidaDefault) {
            this.bienvenidaDefault.style.display = "none";
        }
        
        // Se muestra el mensaje personalizado con el nombre del usuario
        if (this.bienvenidaSection) {
            this.bienvenidaSection.style.display = "block";
        }

        if (this.nombreUsuarioSpan) {
            this.nombreUsuarioSpan.textContent = nombre; // Aquí se agrega el nombre al h1
        }
    }

    // Verifica si el usuario ya está logueado
    checkLoginStatus() {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (usuario) {
            this.mostrarEstadoUsuario(usuario.nombre); // Muestra el nombre si el usuario está logueado
        } else {
           
            // Esconde la sección de bienvenida si no hay usuario logueado
            if (this.bienvenidaSection) {
                this.bienvenidaSection.style.display = "none";
            }
        }
    }

    // Función para cerrar sesión
    cerrarSesion() {
        // Elimina la información de sesión
        localStorage.removeItem("usuarioLogueado");
        // Esconde la sección de bienvenida
        if (this.bienvenidaSection) {
            this.bienvenidaSection.style.display = "none";
        }

        // Redirige al usuario al formulario de registro (registro.html)
        window.location.href = "registro.html";
    }
    handleLogin(event) {
        event.preventDefault();
    
        // Obtener los datos del formulario de inicio de sesión
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;
    
        // Obtener los usuarios registrados de localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    
        // Buscar si el email existe en los usuarios registrados
        const usuarioRegistrado = usuariosRegistrados.find(
            (usuario) => usuario.email === email
        );
    
        if (!usuarioRegistrado) {
            alert("Este correo no está registrado. Por favor, regístrate antes de iniciar sesión.");
            return;
        }
    
        // Validar la contraseña del usuario
        if (usuarioRegistrado.password !== password) {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
            return;
        }
    
        // Guardar el usuario como logueado en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioRegistrado));
    
        // Mostrar el estado del usuario en la interfaz
        this.mostrarEstadoUsuario(usuarioRegistrado.nombre);
    
        // Redirigir al usuario a la página principal
        window.location.href = "index.html";
    }
    
    
}

// Espera a que el documento esté completamente cargado antes de inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
    const app = new RegistroApp();

    // Si hay un botón de cerrar sesión, agrega el evento de cerrar sesión
    const cerrarSesionBtn = document.querySelector("button[onclick='cerrarSesion()']");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", () => app.cerrarSesion());
    }
});
