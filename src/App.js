import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      // Add new user
      setUsers([...users, { email, password }]);
    } else {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { email, password };
      setUsers(updatedUsers);
      setEditIndex(-1);
    }
    setEmail("");
    setPassword("");
  };

  // Edit user
  const handleEdit = (index) => {
    setEditIndex(index);
    setEmail(users[index].email);
    setPassword(users[index].password);
  };

  // Delete user
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <h2>User Form</h2>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "10px" }}
        >
          {editIndex === -1 ? "Add User" : "Update User"}
        </Button>
      </form>

      {/* Users List */}
      <h3>Users List</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default App;
