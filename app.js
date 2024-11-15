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
   * Esto incluye la configuración del menú y las acciones de los botones.
   */
  init() {
    this.configurarDocumentoClick();  
    this.configurarListaSemanal();  // Configura el evento para crear una nueva lista semanal
    this.configurarListaPersonal();  
    this.configurarListaMensual();
    this.aplicarTemaGuardado(); 
    this.configurarCambioTema()
    this.listaSemanal.crearListaSemanal();
  }

  /**
   * Configura el evento para crear una nueva lista semanal al hacer clic en el botón correspondiente.
   */
  configurarListaSemanal() {
    document.getElementById('btn-semanal').addEventListener('click', () => {
      this.listaSemanal.crearListaSemanal();
    });
  }

  /**
   * Configura el evento para crear una nueva lista personal al hacer clic en el botón correspondiente.
   */
  configurarListaPersonal() {
    document.getElementById('btn-personal').addEventListener('click', () => {
      const nuevaLista = new Lista('Agregue Titulo');
      this.listaPersonalContenedor.appendChild(nuevaLista.crearListaElement());
    });
  }
  /**
   * Configura el evento para crear una nueva lista mensual al hacer clic en el botón correspondiente.
   */
  configurarListaMensual() {
    document.getElementById('btn-mensual').addEventListener('click', () => {
      const nuevaLista = new Lista('Agosto');
     
      this.listaMesContenedor.appendChild(nuevaLista.crearListaElement());
    });
  }
   /**
   * Configura el evento para cerrar el menú si se hace clic fuera de él
   */
  configurarDocumentoClick() {
    const menuPrincipal = document.querySelector('.menuPrincipal');
    const menuCheckbox = document.getElementById('check');

   
    document.addEventListener('click', (e) => {
      
      if (!menuCheckbox.contains(e.target) && !menuPrincipal.contains(e.target)) {
        menuCheckbox.checked = false; 
      }
    });
  }
 /**
   * Configura el cambio de Tema de Claro a Ocuro
   */
  configurarCambioTema() {
    const enlaceApariencia = document.getElementById('toggleAppearance');
    const logo = document.getElementById('logo');
    const menuIcon = document.getElementById('menu-icon');

    enlaceApariencia.addEventListener('click', (evento) => {
      evento.preventDefault();
      document.body.classList.toggle('dark-theme');
      const esTemaOscuro = document.body.classList.contains('dark-theme');
      enlaceApariencia.textContent = esTemaOscuro ? 'Tema Claro' : 'Tema Oscuro';
      logo.src = esTemaOscuro ? 'logo Oscuro.png' : 'logo terminado.png';

      if (esTemaOscuro) {
        menuIcon.setAttribute('fill', 'white'); 
      } else {
        menuIcon.setAttribute('fill', 'black');
      }

      localStorage.setItem('theme', esTemaOscuro ? 'dark' : 'light');
    });
  }
  /**
   * Aplica el tema guardado de temas en localStorage
   */
  aplicarTemaGuardado() {
    const temaGuardado = localStorage.getItem('theme');
    const enlaceApariencia = document.getElementById('toggleAppearance');
    const logo = document.getElementById('logo');
    const menuIcon = document.getElementById('menu-icon');

    if (temaGuardado === 'dark') {
      document.body.classList.add('dark-theme');
      enlaceApariencia.textContent = 'Tema Claro';
      logo.src = 'logo Oscuro.png'; 
      menuIcon.setAttribute('fill', 'white');
    } else {
      enlaceApariencia.textContent = 'Tema Oscuro';
      logo.src = 'logo terminado.png'; 
      menuIcon.setAttribute('fill', 'black'); 
    }
  }
}

const app = new App();



