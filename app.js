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
    this.configurarListaSemanal();  // Configura el evento para crear una nueva lista semanal
    this.configurarListaPersonal();  
    this.configurarListaMensual();
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
   
}

const app = new App();



