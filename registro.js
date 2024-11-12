class RegistroApp {
    constructor() {
        this.registroForm = document.getElementById('registroForm');
        this.registroExitoso = document.getElementById('registroExitoso');
        this.nombreInput = document.getElementById('nombre');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.contenidoInput = document.getElementById('contenido');

        // Verificar si el usuario ya está registrado al cargar la página
        this.setupMenuToggle();
        this.setupDocumentClick();
        this.setupThemeToggle(); // Configurar el botón de alternancia de tema
        this.applySavedTheme();
        this.checkUserRegistration();

        // Configurar el manejo de eventos
        this.registroForm.addEventListener('submit', (event) => this.handleRegistro(event));
    }

    // Maneja el registro de usuarios
    handleRegistro(event) {
        event.preventDefault();

        const nombre = this.nombreInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        if (nombre && email && password) {
            // Guardar los datos del usuario en localStorage
            this.saveUser({ nombre, email, password });

            // Ocultar el formulario de registro y mostrar mensaje de éxito
            this.registroForm.style.display = 'none';
            this.registroExitoso.style.display = 'block';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    // Guarda los datos del usuario en localStorage
    saveUser(user) {
        localStorage.setItem('usuario', JSON.stringify(user));
    }

    // Verifica si el usuario ya está registrado
    checkUserRegistration() {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            const usuario = JSON.parse(usuarioGuardado);
            alert(`¡Bienvenido de nuevo, ${usuario.nombre}!`);

            // Ocultar el formulario y mostrar el mensaje de éxito si el usuario ya está registrado
            this.registroForm.style.display = 'none';
            this.registroExitoso.style.display = 'block';
        }
    }

    // Guarda el contenido ingresado en el área de texto
    saveContent() {
        const contenido = this.contenidoInput.value;
        if (contenido) {
            localStorage.setItem('contenidoModificado', contenido);
            alert('Contenido guardado correctamente.');
        } else {
            alert('Por favor, escribe algo antes de guardar.');
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

// Inicializar la aplicación de registro y contenido al cargar la página
window.onload = () => {
    const app = new RegistroApp();

    // Agregar evento para guardar el contenido
    document.getElementById('saveContentBtn').addEventListener('click', () => app.saveContent());
};
