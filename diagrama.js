class Diagrama {
    constructor() {
        this.cuadroActivo = null;
        this.guardarBtn = document.getElementById('btn-guardar');
        this.eliminarBtn = document.getElementById('btn-eliminar');
        this.btnInsertar = document.getElementById('btn-insertar');
        this.menuInsertar = document.getElementById('menu-insertar');
        this.btnEditar = document.getElementById('btn-editar');
        this.menuEditar = document.getElementById('menu-editar');
        this.btnColor = document.getElementById('btn-color');
        this.menuColor = document.getElementById('menu-color');

        this.setupMenuToggle();
        this.setupDocumentClick();
        this.setupThemeToggle(); // Configurar el botón de alternancia de tema
        this.applySavedTheme(); // Aplicar el tema guardado al cargar la página
        this.init();
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

    init() {
        this.configurarEventos();
        this.cargarElementos();
        this.configurarMenu();
        this.configurarColor();
        this.seleccionarCuadroActivo();
    }

    configurarEventos() {
        this.guardarBtn.addEventListener('click', () => {
            this.guardarEstado();
            alert('Estado guardado.');
        });

        document.getElementById('insertar-cuadro').addEventListener('click', () => this.crearCuadro());
        document.getElementById('insertar-flecha').addEventListener('click', () => this.crearFlecha());
        this.configurarEventoEliminar();
    }

    configurarMenu() {
        this.configurarMenuDiagrama(this.btnInsertar, this.menuInsertar);
        this.configurarMenuDiagrama(this.btnEditar, this.menuEditar);
        this.configurarMenuDiagrama(this.btnColor, this.menuColor);
    }

    configurarMenuDiagrama(button, menu) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && e.target !== button) {
                menu.style.display = 'none';
            }
        });
    }

    configurarEventoEliminar() {
        this.eliminarBtn.addEventListener('mousemove', (e) => {
            const rectEliminarBtn = this.eliminarBtn.getBoundingClientRect();
            const elementos = document.querySelectorAll('.cuadro, .flecha');

            elementos.forEach(element => {
                const rectElemento = element.getBoundingClientRect();
                if (this.isElementoSobreBotonEliminar(rectElemento, rectEliminarBtn)) {
                    element.remove();
                }
            });
        });
    }

    isElementoSobreBotonEliminar(rectElemento, rectEliminarBtn) {
        return rectElemento.bottom > rectEliminarBtn.top &&
               rectElemento.top < rectEliminarBtn.bottom &&
               rectElemento.right > rectEliminarBtn.left &&
               rectElemento.left < rectEliminarBtn.right;
    }

    crearCuadro() {
        const nuevoCuadro = new Cuadro();
        this.cuadroActivo = nuevoCuadro.element;
    }

    crearFlecha() {
        new Flecha();
    }

    configurarColor() {
        document.querySelectorAll('.color-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const color = e.target.getAttribute('data-color');
                if (this.cuadroActivo) {
                    this.cuadroActivo.style.backgroundColor = color;
                }
            });
        });
    }

    seleccionarCuadroActivo() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('cuadro')) {
                this.cuadroActivo = e.target;
            }
        });
    }

    guardarEstado() {
        console.log("Estado guardado");
    }

    cargarElementos() {
        // Lógica para cargar el estado de los elementos
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Diagrama();
});
