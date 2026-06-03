var editingId = null;
var deleteTargetId = null;

var searchInput    = document.getElementById("searchInput");
var deptFilter     = document.getElementById("deptFilter");
var tableBody      = document.getElementById("tableBody");
var modal          = document.getElementById("employeeModal");
var modalTitle     = document.getElementById("modalTitle");
var empForm        = document.getElementById("empForm");
var addBtn         = document.getElementById("addBtn");
var closeModalBtn  = document.getElementById("closeModal");
var cancelBtn      = document.getElementById("cancelBtn");

// confirm delete modal
var confirmModal  = document.getElementById("confirmModal");
var confirmText   = document.getElementById("confirmText");
var confirmOk     = document.getElementById("confirmOk");
var confirmCancel = document.getElementById("confirmCancel");

// form fields
var fieldName   = document.getElementById("fieldName");
var fieldEmail  = document.getElementById("fieldEmail");
var fieldDept   = document.getElementById("fieldDept");
var fieldSalary = document.getElementById("fieldSalary");
var fieldStatus = document.getElementById("fieldStatus");

function renderTable() {
  var query = searchInput.value;
  var dept  = deptFilter.value;

  var list = searchEmployees(query);

  if (dept !== "All") {
    list = list.filter(function (emp) {
      return emp.department === dept;
    });
  }

  tableBody.innerHTML = "";

  if (list.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No employees found</td></tr>";
    return;
  }

  list.forEach(function (emp) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.email + "</td>" +
      "<td>" + emp.department + "</td>" +
      "<td>₹" + emp.salary.toLocaleString() + "</td>" +
      "<td><span class='badge " + (emp.status === "Active" ? "badge-active" : "badge-inactive") + "'>" + emp.status + "</span></td>" +
      "<td>" +
        "<button class='btn-edit' onclick='openEditModal(" + emp.id + ")'>Edit</button> " +
        "<button class='btn-delete' onclick='handleDelete(" + emp.id + ")'>Delete</button>" +
      "</td>";
    tableBody.appendChild(tr);
  });
}

function renderStats() {
  var stats = getStats();
  document.getElementById("statTotal").textContent    = stats.total;
  document.getElementById("statActive").textContent   = stats.active;
  document.getElementById("statInactive").textContent = stats.inactive;
  document.getElementById("statSalary").textContent   = "₹" + stats.totalSalary.toLocaleString();
}

function openAddModal() {
  editingId = null;
  modalTitle.textContent = "Add Employee";
  empForm.reset();
  modal.style.display = "flex";
}

function openEditModal(id) {
  var emp = employees.find(function (e) { return e.id === id; });
  if (!emp) return;
  editingId = id;
  modalTitle.textContent  = "Edit Employee";
  fieldName.value         = emp.name;
  fieldEmail.value        = emp.email;
  fieldDept.value         = emp.department;
  fieldSalary.value       = emp.salary;
  fieldStatus.value       = emp.status;
  modal.style.display     = "flex";
}

function closeModal() {
  modal.style.display = "none";
  editingId = null;
  empForm.reset();
}

function handleDelete(id) {
  var emp = employees.find(function (e) { return e.id === id; });
  if (!emp) return;
  deleteTargetId = id;
  confirmText.textContent = 'Are you sure you want to delete "' + emp.name + '"? This cannot be undone.';
  confirmModal.style.display = "flex";
}

// confirm delete — yes button
confirmOk.addEventListener("click", function () {
  if (deleteTargetId !== null) {
    deleteEmployee(deleteTargetId);
    deleteTargetId = null;
    confirmModal.style.display = "none";
    renderTable();
    renderStats();
  }
});

// confirm delete — cancel button
confirmCancel.addEventListener("click", function () {
  deleteTargetId = null;
  confirmModal.style.display = "none";
});

// close confirm modal on overlay click
confirmModal.addEventListener("click", function (e) {
  if (e.target === confirmModal) {
    deleteTargetId = null;
    confirmModal.style.display = "none";
  }
});

// form submit
empForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var name   = fieldName.value;
  var email  = fieldEmail.value;
  var dept   = fieldDept.value;
  var salary = fieldSalary.value;
  var status = fieldStatus.value;

  var isValid = validateForm(name, email, dept, salary);
  if (!isValid) return;

  if (editingId === null) {
    addEmployee(name, email, dept, salary, status);
  } else {
    updateEmployee(editingId, name, email, dept, salary, status);
  }

  closeModal();
  renderTable();
  renderStats();
});

// search
searchInput.addEventListener("input", function () {
  renderTable();
});

// filter
deptFilter.addEventListener("change", function () {
  renderTable();
});

// open modal
addBtn.addEventListener("click", function () {
  openAddModal();
});

// close modal
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// close on overlay click
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// dark mode toggle
document.getElementById("darkToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  var isDark = document.body.classList.contains("dark");
  this.textContent = isDark ? "Light Mode" : "Dark Mode";
});

// init
renderTable();
renderStats();