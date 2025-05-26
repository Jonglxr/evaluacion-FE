const students = [];
const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const form = document.getElementById("studentForm");
const submitBtn = form.querySelector('button[type="submit"]');

let editIndex = -1;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value);
  const date = document.getElementById("date").value;

  if (!name || !lastName || isNaN(grade) || grade < 1 || grade > 7 || !date) {
    alert("Error al ingresar Datos");
    return;
  }

  const student = { name, lastName, grade, date };

  if (editIndex === -1) {
    // Agregar nuevo estudiante
    students.push(student);
  } else {
    // Actualizar estudiante existente
    students[editIndex] = student;
    editIndex = -1;
    submitBtn.textContent = "Guardar Alumno";
  }

  renderTable();
  calcularPromedio();
  this.reset();
});

function renderTable() {
  tableBody.innerHTML = ""; // limpiar tabla

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.lastName}</td>
      <td>${student.grade}</td>
      <td>${student.date}</td>
      <td>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </td>
    `;

    // Botón Editar
    row.querySelector(".edit-btn").addEventListener("click", () => {
      loadStudentToForm(index);
    });

    // Botón Eliminar
    row.querySelector(".delete-btn").addEventListener("click", () => {
      deleteEstudiante(index);
    });

    tableBody.appendChild(row);
  });
}

function loadStudentToForm(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;
  document.getElementById("date").value = student.date;

  editIndex = index;
  submitBtn.textContent = "Actualizar Alumno";
}

function deleteEstudiante(index) {
  students.splice(index, 1);
  renderTable();
  calcularPromedio();

  if (editIndex === index) {
    editIndex = -1;
    form.reset();
    submitBtn.textContent = "Guardar Alumno";
  } else if (editIndex > index) {
    editIndex--;
  }
}

function calcularPromedio() {
  if (students.length === 0) {
    averageDiv.textContent = "Promedio General del Curso : N/A";
    return;
  }
  const total = students.reduce((sum, student) => sum + student.grade, 0);
  const prom = total / students.length;
  averageDiv.textContent = "Promedio General del Curso : " + prom.toFixed(2);
}

function calcularPromedio() {
  if (students.length === 0) {
    averageDiv.textContent = "Promedio General del Curso : N/A";
    updateStatistics(0, 0, 0);
    return;
  }
  
  const total = students.reduce((sum, student) => sum + student.grade, 0);
  const prom = total / students.length;
  averageDiv.textContent = "Promedio General del Curso : " + prom.toFixed(2);
  
  // Actualizar estadísticas
  const totalStudents = students.length;
  const passed = students.filter(student => student.grade >= 4.0).length;
  const failed = totalStudents - passed;
  
  updateStatistics(totalStudents, passed, failed);
}

function updateStatistics(total, passed, failed) {
  const statsDiv = document.getElementById("statistics");
  statsDiv.innerHTML = `
    <p>Total de Estudiantes: ${total}</p>
    <p>Cantidad de Aprobados: ${passed}</p>
    <p>Cantidad de Reprobados: ${failed}</p>
  `;
}
