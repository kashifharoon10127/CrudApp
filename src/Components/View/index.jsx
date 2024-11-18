import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export const View = () => {
  const [userData, setUserData] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/");
    }
  }, [navigate]);

  function showForm() {
    setUpdateForm(!updateForm);
  }


  function update(e) {
    e.preventDefault(); 

    const newData = {
      email: email || userData.email, 
      password: password || userData.password, 
    };

    localStorage.setItem("userdata", JSON.stringify(newData)); 
    setUserData(newData); 
    setUpdateForm(false); 
  }

  // Logout and redirect to login page
  function logout() {
    localStorage.removeItem("userdata");
    navigate("/");
  }

  return (
    <div style={{ width: "60%", margin: "auto", marginTop: "100px", textAlign: "center" }}>
      {userData ? (
        <>
          <h2>Welcome, {userData.email}</h2>
          <h2>Your Password: {userData.password}</h2>
        </>
      ) : (
        navigate("/")
      )}

      <button onClick={showForm} style={{ backgroundColor: "white", border: "none", cursor: "pointer" }}>
        Update User
      </button><br />

      {updateForm && (
        <form onSubmit={update} style={{ width: "50%", margin: "auto" }}>
          <TextField
            label="Email"
            type="email"
            defaultValue={userData ? userData.email : ""}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Password"
            type="password"
            defaultValue={userData ? userData.password : ""}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <Button type="submit" style={{ backgroundColor: "black", color: "white" }}>
            Update
          </Button>
        </form>
      )}

      <Button onClick={logout}>Logout/Delete</Button>
    </div>
  );
};
