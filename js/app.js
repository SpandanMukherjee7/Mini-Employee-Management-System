var editingId = null;
var deleteTargetId = null;
var currentPage = 1;
var PAGE_SIZE = 10;

var searchInput    = document.getElementById("searchInput");
var deptFilter     = document.getElementById("deptFilter");
var tableBody      = document.getElementById("tableBody");
var modal          = document.getElementById("employeeModal");
var modalTitle     = document.getElementById("modalTitle");
var empForm        = document.getElementById("empForm");
var addBtn         = document.getElementById("addBtn");
var closeModalBtn  = document.getElementById("closeModal");
var cancelBtn      = document.getElementById("cancelBtn");

var confirmModal  = document.getElementById("confirmModal");
var confirmText   = document.getElementById("confirmText");
var confirmOk     = document.getElementById("confirmOk");
var confirmCancel = document.getElementById("confirmCancel");

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

  var totalPages = Math.ceil(list.length / PAGE_SIZE);
  if (currentPage > totalPages) currentPage = 1;

  var start    = (currentPage - 1) * PAGE_SIZE;
  var end      = start + PAGE_SIZE;
  var pageList = list.slice(start, end);

  tableBody.innerHTML = "";

  if (list.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No employees found</td></tr>";
    renderPagination(0, 0);
    return;
  }

  pageList.forEach(function (emp) {
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

  renderPagination(totalPages, list.length);
}

function renderPagination(totalPages, totalItems) {
  var container = document.getElementById("pagination");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  var prev = document.createElement("button");
  prev.textContent = "←";
  prev.className = "page-btn";
  prev.disabled = currentPage === 1;
  prev.addEventListener("click", function () {
    currentPage--;
    renderTable();
  });
  container.appendChild(prev);

  for (var i = 1; i <= totalPages; i++) {
    (function (i) {
      var btn = document.createElement("button");
      btn.textContent = i;
      btn.className = "page-btn" + (i === currentPage ? " page-active" : "");
      btn.addEventListener("click", function () {
        currentPage = i;
        renderTable();
      });
      container.appendChild(btn);
    })(i);
  }

  var next = document.createElement("button");
  next.textContent = "→";
  next.className = "page-btn";
  next.disabled = currentPage === totalPages;
  next.addEventListener("click", function () {
    currentPage++;
    renderTable();
  });
  container.appendChild(next);
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

confirmOk.addEventListener("click", function () {
  if (deleteTargetId !== null) {
    deleteEmployee(deleteTargetId);
    deleteTargetId = null;
    confirmModal.style.display = "none";
    renderTable();
    renderStats();
  }
});

confirmCancel.addEventListener("click", function () {
  deleteTargetId = null;
  confirmModal.style.display = "none";
});

confirmModal.addEventListener("click", function (e) {
  if (e.target === confirmModal) {
    deleteTargetId = null;
    confirmModal.style.display = "none";
  }
});

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

searchInput.addEventListener("input", function () {
  currentPage = 1;
  renderTable();
});

deptFilter.addEventListener("change", function () {
  currentPage = 1;
  renderTable();
});

addBtn.addEventListener("click", function () {
  openAddModal();
});

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

document.getElementById("darkToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  var isDark = document.body.classList.contains("dark");
  this.textContent = isDark ? "Light Mode" : "Dark Mode";
});

renderTable();
renderStats();