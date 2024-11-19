class Calendario {
   
    constructor(idBoton, idContenedor) {
        this.boton = document.getElementById(idBoton);  
        this.contenedor = document.getElementById(idContenedor);  
        this.estaInicializado = false;  
        this.init();
    }

    /**
     * Inicializa los eventos asociados al calendario y establece el tema.
     */
    init() {
        // Manejar el clic en el botón de calendario
        this.boton.addEventListener('click', this.toggleCalendario.bind(this));

        // Detectar clic fuera del calendario
        document.addEventListener('click', this.manejarClicFuera.bind(this));

        // Establecer el tema del calendario al cargar la página
        this.establecerTemaCalendario();

        // Escuchar cambios en la preferencia de color del usuario
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.establecerTemaCalendario.bind(this));
    }

    /**
     * Muestra u oculta el calendario al hacer clic en el botón.
     * Inicializa el calendario si no se ha hecho aún.
     */
    toggleCalendario() {
        // Alternar visibilidad del calendario
        this.contenedor.style.display = (this.contenedor.style.display === 'none' || this.contenedor.style.display === '') ? 'block' : 'none';

        // Inicializar FullCalendar solo si no está inicializado
        if (this.contenedor.style.display === 'block' && !this.estaInicializado) {
            this.inicializarCalendario();
        }
    }

    /**
     * Maneja el clic fuera del calendario y el botón, ocultando el calendario si es necesario.
     * @param {Event} evento - El evento de clic que se ha disparado.
     */
    manejarClicFuera(evento) {
        // Si el clic es fuera del calendario y fuera del botón de calendario
        if (!this.contenedor.contains(evento.target) && evento.target !== this.boton) {
            this.contenedor.style.display = 'none';  // Ocultar el calendario
        }
    }

    /**
     * Inicializa el calendario usando la librería FullCalendar.
     * Establece el idioma como español y configura el encabezado.
     */
    inicializarCalendario() {
        // Inicializar FullCalendar con idioma español
        $(this.contenedor).fullCalendar({
            locale: 'es',  // Cambiar el idioma a español
            header: {
                left: 'prev,next today',  // Mantener los botones de < y >, y el botón de "Hoy"
                center: 'title',  // Solo mostrar el título del mes
                right: ''  // Eliminar los botones de Mes, Semana, Día
            },
            events: []  // Puedes agregar eventos aquí si es necesario
        });

        this.estaInicializado = true;  // Marcar el calendario como inicializado
    }

    /**
     * Establece el tema del calendario según la preferencia del sistema (oscuro o claro).
     */
    establecerTemaCalendario() {
        const esModoOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Cambiar las clases de tema en el calendario
        if (esModoOscuro) {
            this.contenedor.classList.add('dark-theme');
            this.contenedor.classList.remove('light-theme');
        } else {
            this.contenedor.classList.add('light-theme');
            this.contenedor.classList.remove('dark-theme');
        }
    }
}

/**
 * Crear una instancia del calendario y pasarle los ids del botón y del contenedor.
 */
const calendario = new Calendario('btn-calendario', 'calendar-container');
