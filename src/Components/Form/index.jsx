import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const Form = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
      // Get existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("formData")) || [];
          // Add new data to the existing array
    const updatedData = [...existingData, formData];
// Save updated array back to localStorage
localStorage.setItem("formData", JSON.stringify(updatedData));


    // Clear the form after submission (optional)
    setFormData({ title: "", description: "" });

    alert("Data saved to local storage!");
    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default Form;
