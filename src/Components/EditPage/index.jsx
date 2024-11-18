import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const allData = JSON.parse(localStorage.getItem("formData")) || [];
    return allData[id] || { title: "", description: "" };
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let allData = JSON.parse(localStorage.getItem("formData")) || [];
    allData[id] = formData; // Update the specific entry
    localStorage.setItem("formData", JSON.stringify(allData));
    navigate("/"); // Navigate back to the main page
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2>Edit Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Enter Title"
          required
          style={{
            width: "80%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          id="description"
          placeholder="Enter Description"
          rows="4"
          required
          style={{
            width: "80%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
};
