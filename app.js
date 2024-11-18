class App {
  constructor() {
    this.listaSemanalContenedor = document.getElementById('lista-semanal');
    this.listaPersonalContenedor = document.getElementById('listas-personales');
    this.listaMesContenedor = document.getElementById('listas-mes');
    this.listaSemanal = new ListaSemanal(this.listaSemanalContenedor);

    this.init();
  }

  /**
   * Inicializa los eventos de la aplicación.
   */
  init() {
    this.configurarListaSemanal();
    this.configurarListaPersonal();
    this.configurarListaMensual();
    this.agregarIconosExpandirContraer(); // Agregar iconos a los títulos no editables
    this.listaSemanal.crearListaSemanal();
  }

  /**
   * Configura el evento para crear una nueva lista semanal.
   */
  configurarListaSemanal() {
    document.getElementById('btn-semanal').addEventListener('click', () => {
      this.listaSemanal.crearListaSemanal();
    });
  }

  /**
   * Configura el evento para crear una nueva lista personal.
   */
  configurarListaPersonal() {
    document.getElementById('btn-personal').addEventListener('click', () => {
      const nuevaLista = new Lista('Agregue Titulo');
      this.listaPersonalContenedor.appendChild(nuevaLista.crearListaElement());
    });
  }

  /**
   * Configura el evento para crear una nueva lista mensual.
   */
  configurarListaMensual() {
    document.getElementById('btn-mensual').addEventListener('click', () => {
      const nuevaLista = new Lista('Agosto');
      this.listaMesContenedor.appendChild(nuevaLista.crearListaElement());
    });
  }

  /**
   * Agrega iconos de expandir/contraer a los títulos no editables.
   */
  agregarIconosExpandirContraer() {
    // Seleccionar los contenedores que tienen títulos no editables
    const contenedores = document.querySelectorAll('.container');
  
    contenedores.forEach(contenedor => {
      const titulo = contenedor.querySelector('.non-editable-title');
      const contenido = contenedor.querySelector('.listas-basicas, .listas-basicas-container');
  
      if (titulo && contenido) {
        // Crear el ícono de expandir/contraer
        const iconoExpandir = document.createElement('span');
        iconoExpandir.classList.add('icono-expandir', 'fas', 'fa-chevron-down');
        iconoExpandir.style.cursor = 'pointer';
        iconoExpandir.style.marginLeft = '10px';
  
        // Insertar el ícono al lado del título
        titulo.appendChild(iconoExpandir);
  
        // Funcionalidad de expandir/contraer
        iconoExpandir.addEventListener('click', () => {
          const isCollapsed = contenido.classList.contains('colapsada');
          if (isCollapsed) {
            // Expander la lista
            contenido.classList.remove('colapsada');
            iconoExpandir.classList.remove('fa-chevron-up');
            iconoExpandir.classList.add('fa-chevron-down');
          } else {
            // Colapsar la lista
            contenido.classList.add('colapsada');
            iconoExpandir.classList.remove('fa-chevron-down');
            iconoExpandir.classList.add('fa-chevron-up');
          }
        });
      }
    });
  }
  
}

const app = new App();
