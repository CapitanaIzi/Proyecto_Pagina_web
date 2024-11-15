class MapaConceptual {
    constructor() {
        this.elementos = []; // Array para almacenar los elementos (cuadros, flechas, título)
        this.diagrama = new Diagrama(); // Instancia de Diagrama
        this.setupDocumentClick();
        this.configurarCambioTema();
        this.aplicarTemaGuardado();
        this.cargarElementos(); // Cargar los elementos al inicializar
    }
    setupDocumentClick() {
        const menuPrincipal = document.querySelector('.menuPrincipal');
        const menuCheckbox = document.getElementById('check');

        // Agrega un evento al documento para cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            // Verifica si el clic fue fuera del menú y del checkbox (el icono)
            if (!menuCheckbox.contains(e.target) && !menuPrincipal.contains(e.target)) {
                menuCheckbox.checked = false; // Desmarca el checkbox para cerrar el menú
            }
        });
    }

    // Configura el cambio de tema
    configurarCambioTema() {
        const enlaceApariencia = document.getElementById('toggleAppearance');
        const logo = document.getElementById('logo');
        const menuIcon = document.getElementById('menu-icon');

        enlaceApariencia.addEventListener('click', (evento) => {
            evento.preventDefault();
            document.body.classList.toggle('dark-theme');
            const esTemaOscuro = document.body.classList.contains('dark-theme');

            // Cambiar texto del enlace de apariencia
            enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';

            // Cambiar logo dependiendo del tema
            logo.src = esTemaOscuro ? 'logo Oscuro.png' : 'logo terminado.png';

            // Cambiar SVG icono del menú
            if (esTemaOscuro) {
                menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
            } else {
                menuIcon.setAttribute('fill', 'black'); // Cambiar el color del SVG a negro
            }

            // Guardar la preferencia de tema en localStorage
            localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
        });
    }

    // Aplica el tema guardado en localStorage
    aplicarTemaGuardado() {
        const temaGuardado = localStorage.getItem('theme');
        const enlaceApariencia = document.getElementById('toggleAppearance');
        const logo = document.getElementById('logo');
        const menuIcon = document.getElementById('menu-icon');

        if (temaGuardado === 'dark') {
            document.body.classList.add('dark-theme');
            enlaceApariencia.textContent = 'Tema Claro';
            logo.src = 'logo Oscuro.png'; // Logo claro
            menuIcon.setAttribute('fill', 'white'); // Cambiar el color del SVG a blanco
        } else {
            enlaceApariencia.textContent = 'Tema Oscuro';
            logo.src = 'logo terminado.png'; // Logo oscuro
            menuIcon.setAttribute('fill', 'black'); // Cambiar el color del SVG a negro
        }
    }
    /**
     * Guarda el estado del mapa conceptual en localStorage.
     */
    guardarEstado() {
        this.elementos = [];

        // Guardar título
        const titulo = this.diagrama.obtenerTitulo();
        this.elementos.push(titulo);

        // Guardar cuadros
        this.agregarElementosPorClase('cuadro', (element) => {
            const cuadro = new Cuadro(element.innerText, element.style.left, element.style.top, element.style.backgroundColor);
            this.elementos.push(cuadro.obtenerDatos());
        });

        // Guardar flechas
        this.agregarElementosPorClase('flecha', (element) => {
            const flecha = new Flecha(element.style.width, element.style.left, element.style.top, element.style.transform);
            this.elementos.push(flecha.obtenerDatos());
        });

        // Guardar en localStorage
        localStorage.setItem('mapaConceptual', JSON.stringify(this.elementos));
        console.log('Estado guardado:', this.elementos);
    }

    /**
     * Carga los elementos guardados desde localStorage.
     */
    cargarElementos() {
        const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
        if (elementosGuardados) {
            elementosGuardados.forEach(item => {
                if (item.type === 'titulo') {
                    this.diagrama.cargarTitulo(item.content);
                } else if (item.type === 'cuadro') {
                    new Cuadro(item.content, item.left, item.top, item.backgroundColor);
                } else if (item.type === 'flecha') {
                    new Flecha(item.width, item.left, item.top, item.rotation);
                }
            });
        }
    }

    /**
     * Agrega elementos de una clase específica al array de elementos.
     * 
     * @param {string} clase - Nombre de la clase de los elementos a guardar.
     * @param {Function} callback - Función que obtiene los datos del elemento.
     */
    agregarElementosPorClase(clase, callback) {
        const elementosDom = document.getElementsByClassName(clase);
        for (let element of elementosDom) {
            callback(element);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const mapa = new MapaConceptual();
});
