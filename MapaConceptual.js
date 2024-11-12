class MapaConceptual {
    constructor() {
        this.elementos = []; // Array para almacenar los elementos (cuadros, flechas, título)
        this.diagrama = new Diagrama(); // Instancia de Diagrama
        this.setupMenuToggle();
        this.setupDocumentClick();
        this.setupThemeToggle();
        this.applySavedTheme();  
        this.cargarElementos(); // Cargar los elementos al inicializar
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
