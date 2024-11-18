import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FormPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    width: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "80%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const deleteButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  };

  const updateButtonStyle = {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setSubmittedData(storedData);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData };
    let allData = JSON.parse(localStorage.getItem("formData")) || [];
    allData.push(newData);
    localStorage.setItem("formData", JSON.stringify(allData));
    setSubmittedData(allData);
    setFormData({ title: "", description: "" });
  };

  const handleDelete = (index) => {
    let allData = JSON.parse(localStorage.getItem("formData")) || [];
    allData.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(allData));
    setSubmittedData(allData);
  };

  const handleUpdate = (index) => {
    navigate(`/edit/${index}`);
  };

  return (
    <div style={containerStyle}>
      <h2>React Form</h2>
      <form id="dataForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          required
          style={inputStyle}
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          id="description"
          placeholder="Enter Description"
          rows="4"
          required
          style={inputStyle}
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {submittedData.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f8f8f8",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>All Submitted Data:</h3>
          {submittedData.map((data, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p>
                  <strong>Title:</strong> {data.title}
                </p>
                <p>
                  <strong>Description:</strong> {data.description}
                </p>
              </div>
              <button
                style={updateButtonStyle}
                onClick={() => handleUpdate(index)}
              >
                Update
              </button>
              <button
                style={deleteButtonStyle}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
