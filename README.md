# Proyecto: Página Web de Organización Personal

## Descripción

Este proyecto es una página web diseñada para facilitar la organización personal. Permite a los usuarios crear listas, establecer metas y tomar notas. A futuro, también incluirá funcionalidades avanzadas para planificar proyectos con integración de un calendario mejorado.

---

## Funcionalidades Principales

### Inicio
- Barra de navegación *responsiva* con un logo y nombre del proyecto.
- Menú adaptativo que se ajusta al tamaño de la pantalla.
- Carrusel interactivo con imágenes (SVG) y descripciones de las secciones disponibles. 
  - *Interactividad*: Se puede hacer clic en las imágenes o descripciones para ir directamente a cada sección.

---

### Sección: *Lista de Pendientes*
#### Estructura
- *Menú principal* que organiza la página en tres secciones:
  1. *Lista Personal*:  
      - Incluye tareas personalizables y permite editar el título.  
  2. *Lista Semanal*:  
      - Organizada de lunes a domingo.  
  3. *Lista por Mes*:  
      - Similar a la lista personal pero categorizada por meses.

#### Funcionalidades
- *Expandir y Contraer*: Cada lista tiene un ícono para mostrar u ocultar sus elementos.
- *Botón de Guardar* (actualmente sin funcionalidad implementada).
- *Calendario sencillo* usando la librería FullCalendar, con:
  - Fecha de hoy resaltada.
  - Configuración para ocultarse al hacer clic fuera de él.

#### Gestión de Tareas
- Cada tarea incluye:
  - *Eliminar, duplicar y destacar* tareas con botones desplegables.
  - *Checkbox* para marcar tareas completadas.
  - Contenedor ajustable al tamaño del texto.
- Opciones adicionales:
  - *Ordenar tareas*: Las completadas se posicionan automáticamente al final.
  - *Editar título*: Cada lista tiene un título editable.
  - *Agregar tareas* con un menú interactivo.

---

### Sección: *Diagrama Conceptual*
#### Barra de Herramientas
- *Botón Guardar*: Pendiente de implementación.
- *Botón Editar*:  
  - Submenú para cambiar colores.
- *Botón Insertar*:  
  - Submenú para agregar:
    - *Cuadros*: Contenedores de texto que se ajustan automáticamente según su contenido.
    - *Flechas*:  
      - Movibles, rotables y redimensionables.
      - Configuración para un mínimo tamaño y movimiento libre dentro de la página.

#### Otras Funcionalidades
- *Eliminación dinámica*:  
  - Los elementos que pasen sobre el botón "Eliminar" serán eliminados automáticamente.

---

### Sección: *Notas*
- Crear notas con título y texto.
- Guardar notas en una lista visible.
- Funcionalidades de edición y eliminación.

---

### Sección: *Registrarse*
- Proceso simple con mensaje de confirmación tras un registro exitoso.

---

### Sección: *Opiniones*
- Espacio para que los usuarios dejen comentarios, sin necesidad de estar registrados.

---

## Estado Actual del Proyecto
- *Completado*:
  - Diseño funcional para la mayoría de las secciones.
  - Interactividad básica implementada.
- *Pendiente*:
  - Lógica para el botón de "Guardar".
  - Ampliación de las funcionalidades del calendario.

---

## Tecnologías Utilizadas
- *HTML5*: Estructura de la página.
- *CSS3*: Diseño y estilo.
- *JavaScript*:  
  - Funcionalidad dinámica e interacción del usuario.
  - Librería FullCalendar para el calendario.
- *SVG*: Imágenes en el carrusel.

---

## Futuras Mejoras
- Implementación completa del botón "Guardar".
- Planificación de proyectos con un calendario más avanzado.
- Mejora de la experiencia de usuario en dispositivos móviles.

---

Este proyecto es un trabajo en progreso diseñado para mejorar la productividad personal mediante herramientas digitales intuitivas y accesibles.