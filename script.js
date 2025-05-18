let calificaciones = [];

function agregarEstudiante(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const calificacion = parseFloat(document.getElementById("calificacion").value);

    if (!nombre || !apellido || isNaN(calificacion) || calificacion < 1.0 || calificacion > 7.0) return;

    const tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    const fila = tabla.insertRow();

    fila.insertCell(0).textContent = nombre;
    fila.insertCell(1).textContent = apellido;
    fila.insertCell(2).textContent = calificacion.toFixed(1);

    calificaciones.push(calificacion);
    actualizarPromedio();

    // Resetear el formulario
    document.getElementById("formulario").reset();
}

function actualizarPromedio() {
    const promedio = calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
    document.getElementById("promedio").textContent = `Promedio de Calificaciones: ${promedio.toFixed(2)}`;
}
