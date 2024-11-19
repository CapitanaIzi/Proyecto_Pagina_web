// Mostrar y ocultar el calendario al hacer clic en el botón
document.getElementById('btn-calendario').addEventListener('click', function() {
    const container = document.getElementById('calendar-container');
    
    // Alternar visibilidad del calendario
    container.style.display = (container.style.display === 'none' || container.style.display === '') ? 'block' : 'none';
    
    // Inicializar FullCalendar solo si no está inicializado
    if (container.style.display === 'block' && !container.classList.contains('initialized')) {
        // Inicializar FullCalendar con idioma español
        $(container).fullCalendar({
            locale: 'es',  // Cambiar el idioma a español
            header: {
                left: 'prev,next today',  // Mantener los botones de < y >, y el botón de "Hoy"
                center: 'title',  // Solo mostrar el título del mes
                right: ''  // Eliminar los botones de Mes, Semana, Día
            },
            events: []  // Puedes agregar eventos aquí si es necesario
        });

        // Marcar el calendario como inicializado
        container.classList.add('initialized');
    }
});

// Detectar clic fuera del calendario para ocultarlo
document.addEventListener('click', function(event) {
    const container = document.getElementById('calendar-container');
    const calendarButton = document.getElementById('btn-calendario');
    
    // Si el clic es fuera del calendario y fuera del botón de calendario
    if (!container.contains(event.target) && event.target !== calendarButton) {
        container.style.display = 'none';  // Ocultar el calendario
    }
});

// Detectar si el usuario prefiere el tema oscuro o claro
function setCalendarTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const container = document.getElementById('calendar-container');
    
    // Cambiar las clases de tema en el calendario
    if (isDarkMode) {
        container.classList.add('dark-theme');
        container.classList.remove('light-theme');
    } else {
        container.classList.add('light-theme');
        container.classList.remove('dark-theme');
    }
}

// Llamar a la función para aplicar el tema correcto al cargar la página
setCalendarTheme();

// También se puede escuchar cambios en la preferencia del usuario
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setCalendarTheme);
