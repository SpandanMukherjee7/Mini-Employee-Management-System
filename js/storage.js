function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function loadEmployees() {
  const data = localStorage.getItem("employees");
  return data ? JSON.parse(data) : [];
}