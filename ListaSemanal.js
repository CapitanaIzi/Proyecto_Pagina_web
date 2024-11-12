class ListaSemanal {
    constructor(container) {
        this.container = container;
        this.semanas = [];
    }

    crearListaSemanal() {
        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.classList.add('container');

        const tituloEditable = document.createElement('input');
        tituloEditable.classList.add('editable-title');
        tituloEditable.placeholder = 'Agregue la semana aquí (Ejemplo: 21/10 al 27/10)';

        const listaSemanalContainer = document.createElement('div');
        listaSemanalContainer.classList.add('listas-basicas');

        nuevoContenedor.appendChild(tituloEditable);
        nuevoContenedor.appendChild(listaSemanalContainer);

        const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        diasDeLaSemana.forEach(dia => {
            const lista = new Lista(dia);
            listaSemanalContainer.appendChild(lista.crearListaElement());
            this.semanas.push(lista);
        });

        this.container.appendChild(nuevoContenedor);
    }
}