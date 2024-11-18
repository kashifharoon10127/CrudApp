import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import View from '../View';

export const Form = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [submittedData, setSubmittedData] = useState([]);

  
  useEffect(() => {
    const allData = JSON.parse(localStorage.getItem("formData")) || [];
    setSubmittedData(allData);  
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
  
    // Reset the form
    setFormData({ title: "", description: "" });
  };

  return (
    <Container>
      <form id="dataForm" onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            id="title"
            label="Enter Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            id="description"
            label="Enter Description"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {/* Display all submitted data */}
      {submittedData.length > 0 && (
        <Box mt={3} p={2} bgcolor="#F8F8F8" borderRadius="4px" boxShadow={3}>
          <View data={submittedData} />
        </Box>
      )}
    </Container>
  );
};
