var employees = loadEmployees();

var nextId = 1;

if (employees.length > 0) {
  var maxId = employees.reduce(function (max, emp) {
    return emp.id > max ? emp.id : max;
  }, 0);
  nextId = maxId + 1;
}

// seed demo data only if storage is empty
if (employees.length === 0) {
  employees = [
    { id: 1,  name: "Aarav Sharma",    email: "aarav@company.com",     department: "Engineering", salary: 85000, status: "Active"   },
    { id: 2,  name: "Priya Mehta",     email: "priya@company.com",     department: "HR",          salary: 60000, status: "Active"   },
    { id: 3,  name: "Rohan Gupta",     email: "rohan@company.com",     department: "Finance",     salary: 72000, status: "Inactive" },
    { id: 4,  name: "Sneha Joshi",     email: "sneha@company.com",     department: "Engineering", salary: 90000, status: "Active"   },
    { id: 5,  name: "Vikram Nair",     email: "vikram@company.com",    department: "Operations",  salary: 55000, status: "Active"   },
    { id: 6,  name: "Ananya Pillai",   email: "ananya@company.com",    department: "Marketing",   salary: 62000, status: "Active"   },
    { id: 7,  name: "Arjun Das",       email: "arjun@company.com",     department: "Engineering", salary: 78000, status: "Inactive" },
    { id: 8,  name: "Divya Reddy",     email: "divya@company.com",     department: "Finance",     salary: 68000, status: "Active"   },
    { id: 9,  name: "Kiran Rao",       email: "kiran@company.com",     department: "HR",          salary: 58000, status: "Active"   },
    { id: 10, name: "Meera Kapoor",    email: "meera@company.com",     department: "Operations",  salary: 52000, status: "Active"   },
    { id: 11, name: "Siddharth Bose",  email: "siddharth@company.com", department: "Engineering", salary: 95000, status: "Active"   },
    { id: 12, name: "Tanvi Shah",      email: "tanvi@company.com",     department: "Marketing",   salary: 65000, status: "Inactive" },
    { id: 13, name: "Kabir Singh",     email: "kabir@company.com",     department: "Engineering", salary: 88000, status: "Active"   },
    { id: 14, name: "Riya Verma",      email: "riya@company.com",      department: "HR",          salary: 56000, status: "Active"   }
  ];
  nextId = 15;
  saveEmployees(employees);
}

function addEmployee(name, email, department, salary, status) {
  var newEmp = {
    id: nextId,
    name: name,
    email: email,
    department: department,
    salary: Number(salary),
    status: status
  };
  nextId++;
  employees.push(newEmp);
  saveEmployees(employees);
}

function updateEmployee(id, name, email, department, salary, status) {
  employees = employees.map(function (emp) {
    if (emp.id === id) {
      return {
        id: id,
        name: name,
        email: email,
        department: department,
        salary: Number(salary),
        status: status
      };
    }
    return emp;
  });
  saveEmployees(employees);
}

function deleteEmployee(id) {
  employees = employees.filter(function (emp) {
    return emp.id !== id;
  });
  saveEmployees(employees);
}

function searchEmployees(query) {
  var q = query.toLowerCase();
  return employees.filter(function (emp) {
    return emp.name.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q);
  });
}

function filterByDepartment(dept) {
  if (dept === "All") return employees;
  return employees.filter(function (emp) {
    return emp.department === dept;
  });
}

function getStats() {
  var total = employees.length;
  var active = employees.filter(function (emp) { return emp.status === "Active"; }).length;
  var inactive = employees.filter(function (emp) { return emp.status === "Inactive"; }).length;
  var totalSalary = employees.reduce(function (sum, emp) { return sum + emp.salary; }, 0);
  return { total, active, inactive, totalSalary };
}