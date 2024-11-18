import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const View = () => {
  const [data, setData] = useState([]);
  const [hasClicked, setHasClicked] = useState(false); // State to track button click

  const handleViewData = () => {
    // Update state to indicate button was clicked
    setHasClicked(true);

    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
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
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default View;
