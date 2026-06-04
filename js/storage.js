function saveEmployees(employees) {
  localStorage.setItem("employees", JSON.stringify(employees));
}

function loadEmployees() {
  var data = localStorage.getItem("employees");
  return data ? JSON.parse(data) : [];
}



/*
var INDEX_KEY = "emp_index";

function saveEmployees(employees) {
  // might remove it , keeping it because of initial demo value saving for now
  var ids = employees.map(function (emp) {
    localStorage.setItem("emp_" + emp.id, JSON.stringify(emp));
    return emp.id;
  });
  localStorage.setItem(INDEX_KEY, JSON.stringify(ids));
}

function loadEmployees() {
  var index = localStorage.getItem(INDEX_KEY);
  if (!index) return [];
  var ids = JSON.parse(index);
  return ids.map(function (id) {
    return JSON.parse(localStorage.getItem("emp_" + id));
  });
}

function saveOneEmployee(emp) {
  localStorage.setItem("emp_" + emp.id, JSON.stringify(emp));
  // update index if new id
  var index = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
  if (!index.includes(emp.id)) {
    index.push(emp.id);
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
  }
}

function removeOneEmployee(id) {
  localStorage.removeItem("emp_" + id);
  var index = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
  index = index.filter(function (i) { return i !== id; });
  localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}

*/