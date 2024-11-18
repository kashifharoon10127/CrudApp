import React, { useState } from "react";
import { Button, Box, Typography, TextField, Modal } from "@mui/material";

const ViewData = () => {
  const [data, setData] = useState([]);
  const [hasClicked, setHasClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editIndex, setEditIndex] = useState(null); // Index of the item being edited
  const [editFormData, setEditFormData] = useState({ title: "", description: "" }); // Edit form data

  // Fetch data from localStorage
  const handleViewData = () => {
    setHasClicked(true);
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
  };

  // Delete a specific item
  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index); // Remove item by index
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData)); // Update localStorage
    alert("Data deleted successfully!");
  };

  // Open edit modal
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFormData(data[index]);
    setIsEditing(true);
  };

  // Handle form changes in the modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Save updated data
  const handleEditSave = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editFormData; // Update the specific item
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData)); // Update localStorage
    setIsEditing(false);
    alert("Data updated successfully!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <Button variant="contained" color="primary" onClick={handleViewData}>
        View Data
      </Button>

      {hasClicked && data.length === 0 && (
        <Typography variant="body1" color="textSecondary" marginTop={2}>
          No data found in local storage!
        </Typography>
      )}

      {data.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid #ccc",
                padding: 2,
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6">Title: {item.title}</Typography>
              <Typography>Description: {item.description}</Typography>
              <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(index)}
                >
                  Update
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Edit Modal */}
      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Edit Data</Typography>
          <TextField
            label="Title"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={editFormData.description}
            onChange={handleEditChange}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewData;
