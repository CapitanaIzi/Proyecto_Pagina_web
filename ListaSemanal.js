class ListaSemanal {
    constructor(container) {
        this.container = container;
        this.semanas = [];
    }
    /**
    * Crea una lista semanal con listas basicas en conjunto
    */
    crearListaSemanal() {
        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.classList.add('bloque'); // Aplicar flexbox para el contenedor
        
        // Crear el ícono para expandir/contraer usando Font Awesome
        const iconoExpandir = document.createElement('span');
        iconoExpandir.classList.add('icono-expandir');
        iconoExpandir.classList.add('fas', 'fa-chevron-down');  // Ícono de Font Awesome para expandir
        iconoExpandir.style.cursor = 'pointer';
        
        // Crear el título editable
        const tituloEditable = document.createElement('input');
        tituloEditable.classList.add('editable-title');
        tituloEditable.placeholder = 'Agregue la semana aquí (Ejemplo: 21/10 al 27/10)';
        
        // Crear el contenedor de la lista semanal
        const listaSemanalContainer = document.createElement('div');
        listaSemanalContainer.classList.add('listas-basicas');
        
        // Agregar el ícono, título editable y el contenedor de listas al contenedor principal
        nuevoContenedor.appendChild(tituloEditable);
        nuevoContenedor.appendChild(iconoExpandir); // El icono ahora estará al lado del título
        nuevoContenedor.appendChild(listaSemanalContainer);
        
        // Agregar los días de la semana a la lista
        const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        diasDeLaSemana.forEach(dia => {
            const lista = new Lista(dia);
            listaSemanalContainer.appendChild(lista.crearListaElement());
            this.semanas.push(lista);
        });
        
        // Agregar el nuevo contenedor al DOM
        this.container.appendChild(nuevoContenedor);
        
        // Funcionalidad para expandir/contraer el bloque al hacer clic en el ícono
        iconoExpandir.addEventListener('click', () => {
            listaSemanalContainer.classList.toggle('colapsada'); // Alternar la clase 'colapsada' para ocultar/mostrar
            
            // Cambiar el ícono de expansión/colapso
            iconoExpandir.classList.toggle('fa-chevron-down');
            iconoExpandir.classList.toggle('fa-chevron-up');
        });
    }
    
    
    
    
}