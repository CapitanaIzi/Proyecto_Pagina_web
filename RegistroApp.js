class RegistroApp {
    constructor() {
        // Asegúrate de que los elementos existan antes de intentar usarlos
        this.registerForm = document.getElementById("registerForm");
        this.loginForm = document.getElementById("loginForm");
        this.bienvenidaDefault = document.getElementById("bienvenidaDefault");
        this.bienvenidaSection = document.getElementById("bienvenidaSection");
        this.nombreUsuarioSpan = document.getElementById("nombreUsuario");

        // Verifica el estado del usuario al cargar la página
        this.checkLoginStatus();

        // Eventos
        if (this.registerForm) {
            this.registerForm.addEventListener("submit", (e) => this.registrarUsuario(e));
        }

        if (this.loginForm) {
            this.loginForm.addEventListener("submit", (e) => this.iniciarSesion(e));
        }
    }

    // Revisa si ya hay un usuario logueado
    checkLoginStatus() {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (usuario) {
            // Si el usuario está logueado, muestra el mensaje personalizado y esconde el mensaje por defecto
            this.mostrarEstadoUsuario(usuario.nombre);
        } else {
            // Si no hay usuario logueado, muestra el mensaje por defecto
            if (this.bienvenidaDefault) {
                this.bienvenidaDefault.style.display = "block";
            }
            if (this.bienvenidaSection) {
                this.bienvenidaSection.style.display = "none";
            }
        }
    }

    // Función para registrar usuario
    registrarUsuario(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("emailRegister").value;
        const password = document.getElementById("passwordRegister").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Verifica que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Guarda el usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push({ nombre, email, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Usuario registrado con éxito");

        // Redirige al index.html después de registrarse
        window.location.href = "index.html";
    }

    // Función para iniciar sesión
    iniciarSesion(e) {
        e.preventDefault();

        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;

        // Verifica las credenciales
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find((u) => u.email === email && u.password === password);

        if (usuario) {
            alert("Inicio de sesión exitoso");

            // Guarda al usuario logueado en localStorage
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            // Redirige al index.html después de iniciar sesión
            window.location.href = "index.html";
        } else {
            alert("Correo o contraseña incorrectos");
        }
    }

    // Muestra el estado de usuario en el index.html
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

    // Función para cerrar sesión
    cerrarSesion() {
        // Elimina el usuario logueado de localStorage
        localStorage.removeItem("usuarioLogueado");

        // Muestra nuevamente el mensaje por defecto y esconde el mensaje personalizado
        if (this.bienvenidaDefault) {
            this.bienvenidaDefault.style.display = "block";
        }
        if (this.bienvenidaSection) {
            this.bienvenidaSection.style.display = "none";
        }

        // Redirige al registro o login (dependiendo de tu flujo de navegación)
        window.location.href = "registro.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const app = new RegistroApp();
    
    // Agrega el evento para el botón de "Cerrar sesión" 
    const cerrarSesionBtn = document.querySelector("button[onclick='cerrarSesion()']");
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener("click", () => app.cerrarSesion());
    }
});
