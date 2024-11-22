class Calendario {
    /**
     * Crea una nueva instancia de Calendario.
     * 
     * @param {string} idBoton - El ID del botón para abrir o cerrar el calendario.
     * @param {string} idContenedor - El ID del contenedor donde se mostrará el calendario.
     */
    constructor(idBoton, idContenedor) {
        this.boton = document.getElementById(idBoton);
        this.contenedor = document.getElementById(idContenedor);
        this.botonCerrar = document.getElementById('cerrar-calendario');
        this.estaInicializado = false; 
        this.init();
    }

    /**
     * Inicializa los eventos y configuraciones necesarios para el calendario.
     * 
     * Se encargará de agregar los escuchadores de eventos para los botones de abrir/cerrar,
     * manejar los clics fuera del calendario y configurar el cambio de tema.
     */
    init() {
        this.boton.addEventListener('click', this.toggleCalendario.bind(this));
        this.botonCerrar.addEventListener('click', this.ocultarCalendario.bind(this));
        document.addEventListener('click', this.manejarClicFuera.bind(this));
        this.configurarCambioTema();
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.configurarCambioTema.bind(this));
    }

    /**
     * Muestra u oculta el calendario al hacer clic en el botón de calendario.
     * Si el calendario está visible y no ha sido inicializado, se inicializa.
     */
    toggleCalendario() {
        this.contenedor.style.display = (this.contenedor.style.display === 'none' || this.contenedor.style.display === '') ? 'block' : 'none';
        if (this.contenedor.style.display === 'block' && !this.estaInicializado) {
            this.inicializarCalendario();
        }
    }

    /**
     * Oculta el calendario cuando se hace clic en el botón de cerrar.
     */
    ocultarCalendario() {
        this.contenedor.style.display = 'none';
    }

    /**
     * Maneja los clics fuera del calendario. Si el clic es fuera del calendario y del botón,
     * se oculta el calendario.
     * 
     * @param {Event} evento - El evento del clic.
     */
    manejarClicFuera(evento) {
        if (!this.contenedor.contains(evento.target) && evento.target !== this.boton) {
            this.ocultarCalendario();
        }
    }

    /**
     * Inicializa el calendario usando FullCalendar y configura el tema claro.
     * 
     * El calendario se configura con idioma español y con una cabecera básica de navegación.
     */
    inicializarCalendario() {
        $(this.contenedor).fullCalendar({
            locale: 'es',
            header: {
                left: 'prev,next today',
                center: 'title', 
                right: '' 
            },
            events: [] 
        });

        this.estaInicializado = true;
        this.contenedor.classList.add('light-theme');
        this.contenedor.classList.remove('dark-theme');
        this.configurarCambioTema();
    }

    /**
     * Configura la respuesta al cambio de tema (oscuro/claro) basado en la preferencia del sistema.
     * Este método se ejecuta cada vez que el sistema cambia de tema (oscuro a claro o viceversa).
     */
    configurarCambioTema() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)'); 
        
        mediaQuery.addEventListener('change', (event) => {
            if (event.matches) {
                this.contenedor.classList.add('dark-theme');
                this.contenedor.classList.remove('light-theme');
            } else {
                this.contenedor.classList.add('light-theme');
                this.contenedor.classList.remove('dark-theme');
            }
        });
    }
}

const calendario = new Calendario('btn-calendario', 'calendar-container');
