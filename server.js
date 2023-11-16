const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const tareas = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        // HTML
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (method === 'GET' && url === '/tareas') {
        // Retornar los valores como JSON
        const tareasConIndice = tareas.map((tarea, indice) => ({ ...tarea, indice: indice + 1 }));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tareasConIndice));
    } else if (method === 'POST' && url === '/tareas') {
        // añadir nueva tarea
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            const nuevaTarea = JSON.parse(data);
            agregarTarea(nuevaTarea.descripcion);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Tarea agregada correctamente.' }));
        });
    } else if (method === 'PUT' && url === '/tareas') {
        // tarea completada
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            const { indice } = JSON.parse(data);
            const tareaExistente = completarTarea(indice);

            if (tareaExistente) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Tarea #${indice} marcada como completada.` }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'La tarea no existe.' }));
            }
        });
    } else if (method === 'DELETE' && url.startsWith('/tareas')) {
        // manejar eliminar tarea 
        const indice = parseInt(url.split('=')[1], 10);
        const tareaEliminada = eliminarTarea(indice);

        if (tareaEliminada) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Tarea #${indice} eliminada.` }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'La tarea no existe.' }));
        }
    } else {
        // manejar error 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

function agregarTarea(descripcion) {
    if (!descripcion || descripcion.trim() === '') {
        descripcion = 'Tarea Generica';
    }
    const nuevaTarea = { descripcion, estado: false };
    tareas.push(nuevaTarea);
}

function completarTarea(indice) {
    const tarea = tareas[indice - 1];
    if (tarea) {
        tarea.estado = true;
        console.log(`Tarea #${indice} marcada como completada.`);
        return true;
    } else {
        console.error('La tarea no existe.');
        return false;
    }
}

function eliminarTarea(indice) {
    if (indice > 0 && indice <= tareas.length) {
        tareas.splice(indice - 1, 1);
        console.log(`Tarea #${indice} eliminada.`);
        return true;
    } else {
        console.error('La tarea no existe.');
        return false;
    }
}

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
