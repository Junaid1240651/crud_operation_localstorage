import React, { useState, useEffect } from "react";
import "../css/home.css"; // Import your CSS file

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    // Save data to local storage whenever employees change
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addEmployee = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return;
    }

    // Check for duplicate email
    const isDuplicateEmail = employees.some(
      (employee) => employee.email === formData.email
    );

    if (isDuplicateEmail) {
      alert("Duplicate email address. Please use a different email.");
      return;
    }

    if (editIndex !== null) {
      // If in edit mode, update the employee
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = formData;
      setEmployees(updatedEmployees);
      setEditIndex(null);
    } else {
      // Otherwise, add a new employee
      setEmployees([...employees, formData]);
    }

    // Clear the form
    setFormData({ firstName: "", lastName: "", email: "" });
    // Close the popup
    setShowPopup(false);
  };
  const editEmployee = (index) => {
    // Activate edit mode for the selected employee
    setEditIndex(index);
    setFormData(employees[index]);
    // Open the popup
    setShowPopup(true);
  };

  const deleteEmployee = (index) => {
    // Remove the selected employee
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  return (
    <div>
      <h1>Employee List</h1>
      <div className="employee-list-actions">
        <button
          className="add-employee-button"
          onClick={() => setShowPopup(true)}
        >
          Add Employee
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <form>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button type="button" onClick={addEmployee}>
              {editIndex !== null ? "Save" : "Add"}
            </button>
            <button type="button" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <div className={employees.length > 0 ? "employee-list" : "empty-list"}>
        <table>
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    className="editEmploy"
                    onClick={() => editEmployee(index)}
                  >
                    Update
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => deleteEmployee(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
