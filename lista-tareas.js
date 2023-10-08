const readline = require('readline-sync');

const tareas = [
    { indicador: 1, descripcion: "Hacer desayuno", estado: false },
    { indicador: 2, descripcion: "Avanzar en proyecto", estado: false }
];

const estado_incompleta= "Incompleta"

function listarTareas() {
    console.log("Lista de tareas:");
    tareas.forEach((tarea) => {
        console.log(`${tarea.id}. [${tarea.completada ? 'x' : ' '}] ${tarea.descripcion}`);
    });
    /* console.log(); */
}
console.log(listarTareas)

function mostrarMenu(){
    console.log('Selecciona una opción:');
    console.log('1. Listar tareas');
    console.log('2. Agregar tarea');
    console.log('3. Eliminar tarea');
    console.log('4. Completar tarea');
    console.log('5. Salir'); 
}

function mostrarError(){
    console.log(`Error: ${mensaje}`);
}

function agregarTarea(descripcion, estado = estado_incompleta){
    const indicador =tareas.length + 1;
}

if (!descripcion) {
    descripcion=obtenerDescripcionUsuario();
}

    tareas.push({ indicador, descripcion, estado });
    mostrarMensaje(`Tareas #${indicador} agregada.`):
/* while (true) {
    console.log('Selecciona una opción:');
    console.log('1. Listar tareas');
    console.log('2. Agregar tarea');
    console.log('3. Eliminar tarea');
    console.log('4. Completar tarea');
    console.log('5. Salir');
    const opcion = readline.question('Opción: ');

    switch (opcion) {
        case '1':
            listarTareas();
            break;
        case '2':
            const descripcionNuevaTarea = readline.question('Descripción de la nueva tarea: ');
            agregarTarea(descripcionNuevaTarea);
            break;
        case '3':
            listarTareas();
            const indiceEliminar = parseInt(readline.question('Índice de la tarea a eliminar: ')) - 1;
            eliminarTarea(indiceEliminar);
            break;
        case '4':
            listarTareas();
            const indiceCompletar = parseInt(readline.question('Índice de la tarea a completar: ')) - 1;
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
} */