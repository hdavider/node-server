const http = require('http');
const host = 'localhost';
const port = 5000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // Modificar la estructura de cada tarea
    const tareasConDetalles = tareas.map((tarea) => {
        return {
            id: tarea.indicador,
            descripcion: tarea.descripcion,
            estado: tarea.estado ? 'completada' : 'pendiente',
        };
    });

    // Devolver las tareas en formato JSON
    const responseBody = JSON.stringify({ tareas: tareasConDetalles });
    res.end(responseBody);
});

// Agregar información adicional a cada tarea
const tareas = [
    { indicador: 1, descripcion: 'Tarea 1', estado: false },
    { indicador: 2, descripcion: 'Tarea 2', estado: true },
    // ... Agrega más tareas si es necesario
];

let descripcion = "Descripcion generica";
const estadoIncompleta = "Incompleta";

function listarTareas() {
    if (tareas.length === 0) {
        console.log("No hay tareas.");
    } else {
        console.log("Lista de tareas:");
        tareas.forEach((tarea) => {
            if (tarea.estado === true) {
                completada = "X";
            } else {
                completada = " ";
            }
            
            console.log(`${tarea.indicador}. [${completada}] ${tarea.descripcion}`);
        });
    }
}


function obtenerDescripcionUsuario() {
        const descripcion = readline.question("Ingresa la descripción de la nueva tarea: ");
    return descripcion;
}
if (!descripcion) {
    descripcion = obtenerDescripcionUsuario();
}

function completarTarea(indicador) {
    const tarea = tareas.find((tarea) => tarea.indicador === indicador);
    if (tarea) {
        tarea.estado = true;
        mostrarMensaje(`Tarea #${indicador} marcada como completada.`);
    } else {
        mostrarError('La tarea seleccionada no existe.');
    }
}


function mostrarMensaje(mensaje) {
    console.log(mensaje);
}

function eliminarTarea(indicador) {
    const tareaEliminadaIndex = tareas.findIndex((tarea) => tarea.indicador === indicador);

    if (tareaEliminadaIndex !== -1) {
        tareas.splice(tareaEliminadaIndex, 1);
        mostrarMensaje(`Tarea #${indicador} eliminada.`);

        // Recalcula los índices de las tareas restantes
        tareas.forEach((tarea, index) => {
            tarea.indicador = index + 1;
        });

        
        listarTareas();
    } else {
        mostrarError('La tarea seleccionada no existe.');
    }
}


function mostrarError(){
    console.log(`Error: ${mensaje}`);
}

function agregarTarea(descripcion, estado = estado_incompleta) {
    if (!descripcion || descripcion.trim() === '') {
        descripcion = 'Tarea Generica';
    }
    const indicador = tareas.length + 1;
    const nuevaTarea = { indicador, descripcion, estado };
    tareas.push(nuevaTarea);
}



while (true) {
    console.log('Selecciona una opcion:');
    console.log('1. Listar tareas');
    console.log('2. Agregar tarea');
    console.log('3. Eliminar tarea');
    console.log('4. Completar tarea');
    console.log('5. Salir');
    const opcion = readline.question('Opcion: ');

    switch (opcion) {
        case '1':
            listarTareas();
            break;

        case '2':
            const descripcionNuevaTarea = readline.question('Descripcion de la nueva tarea: ');
            agregarTarea(descripcionNuevaTarea);
            break;
        case '3':
            listarTareas();
            const indiceEliminar = parseInt(readline.question('Indice de la tarea a eliminar: '));
            eliminarTarea(indiceEliminar);
            break;
        case '4':
            listarTareas();
            const indiceCompletar = parseInt(readline.question('Indice de la tarea a completar: '));
            completarTarea(indiceCompletar);
            break;
        case '5':
            console.log('Saliendo del programa.');
            process.exit(0);
            break;
        default:
            console.log('Opción no válida. Inténtalo de nuevo.');
            break;
    }
}  