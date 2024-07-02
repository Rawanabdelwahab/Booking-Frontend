/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [userType, setUserType] = useState("admin");
  const [message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint =
        userType === "admin"
          ? "http://localhost:3000/registerAdmin"
          : "http://localhost:3000/registerStaff/:id";
      const response = await axios.post(endpoint, {
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        businessType: businessType,
        userType: userType,
        emailAddress: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setMessage("Register successful!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid password");
      } else if (error.response && error.response.status === 404) {
        setMessage("User not found");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginLeft: "500px",
      }}
    >
      <Paper elevation={5} sx={{ padding: 4, mt: 8 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="firstName"
            autoComplete="firstName"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            autoComplete="lastName"
            autoFocus
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="companyName"
            label="Company Name"
            type="text"
            id="companyName"
            autoComplete="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="businessType "
            label="Business Type "
            type="text"
            id="businessType "
            autoComplete="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup
              row
              aria-label="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                value="staff"
                control={<Radio />}
                label="Staff"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          {message && (
            <Typography color="error" align="center">
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
