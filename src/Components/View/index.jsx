import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box } from '@mui/material';

export const View = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem('formData', JSON.stringify(newData));
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditData({
      title: data[index].title,
      description: data[index].description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = editData;
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
    setEditingIndex(null); // Exit edit mode
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
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
                    onClick={() => handleEditClick(index)}
                    style={{ marginLeft: '8px' }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Form */}
      {editingIndex !== null && (
        <Box sx={{ marginTop: '20px' }}>
          <TextField
            label="Title"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          
          <TextField
            label="Description"
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default View;
