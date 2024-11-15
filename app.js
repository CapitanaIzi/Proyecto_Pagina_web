class App {
  constructor() {
    // Referencias a los contenedores de las listas
    this.listaSemanalContainer = document.getElementById('lista-semanal');
    this.listaPersonalContainer = document.getElementById('listas-personales');
    this.listaMesContainer = document.getElementById('listas-mes');

    // Instancia de la lista semanal
    this.listaSemanal = new ListaSemanal(this.listaSemanalContainer);

    // Inicializa los eventos de la aplicación
    this.init();
  }

  /**
   * Inicializa los eventos de la aplicación.
   * Esto incluye la configuración del menú y las acciones de los botones.
   */
  init() {
    this.setupDocumentClick();  // Cierra el menú si se hace clic fuera de él
    this.setupListaSemanal();  // Configura el evento para crear una nueva lista semanal
    this.setupListaPersonal();  // Configura el evento para crear una nueva lista personal
    this.setupListaMensual();  // Configura el evento para crear una nueva lista mensual
    this.aplicarTemaGuardado(); // Aplicar el tema guardado al cargar la página
    this.configurarCambioTema()
    // Llama a la creación de una lista semanal inicial al cargar la página (opcional)
    this.listaSemanal.crearListaSemanal();
  }

  /**
   * Configura el evento para crear una nueva lista semanal al hacer clic en el botón correspondiente.
   */
  setupListaSemanal() {
    document.getElementById('btn-semanal').addEventListener('click', () => {
      this.listaSemanal.crearListaSemanal();
    });
  }

  /**
   * Configura el evento para crear una nueva lista personal al hacer clic en el botón correspondiente.
   */
  setupListaPersonal() {
    document.getElementById('btn-personal').addEventListener('click', () => {
      // Crea una nueva instancia de Lista con un título predeterminado
      const nuevaLista = new Lista('Agregue Titulo');
      // Agrega la nueva lista al contenedor de listas personales
      this.listaPersonalContainer.appendChild(nuevaLista.crearListaElement());
    });
  }

  /**
   * Configura el evento para crear una nueva lista mensual al hacer clic en el botón correspondiente.
   */
  setupListaMensual() {
    document.getElementById('btn-mensual').addEventListener('click', () => {
      // Crea una nueva instancia de Lista con el título 'Agosto'
      const nuevaLista = new Lista('Agosto');
      // Agrega la nueva lista al contenedor de listas mensuales
      this.listaMesContainer.appendChild(nuevaLista.crearListaElement());
    });
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
}


// Inicializa la aplicación
const app = new App();



