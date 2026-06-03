function validateForm(name, email, department, salary) {
  if (name.trim() === "") {
    alert("Name is required");
    return false;
  }

  if (email.trim() === "") {
    alert("Email is required");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Enter a valid email");
    return false;
  }

  if (department.trim() === "") {
    alert("Department is required");
    return false;
  }

  if (salary === "" || Number(salary) <= 0) {
    alert("Salary must be greater than 0");
    return false;
  }

  return true;
}