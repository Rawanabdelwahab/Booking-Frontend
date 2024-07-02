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
import { useNavigate ,Link} from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userType, setUserType] = useState("admin");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint =
        userType === "admin"
          ? "http://localhost:3000/adminLogin"
          : "http://localhost:3000/staffLogin";
      const response = await axios.post(endpoint, {
        emailAddress: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        navigate("/Booking");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid password");
      } else if (error.response && error.response.status === 404) {
        setMessage("User not found");
      } else {
        setMessage("Login failed. Please try again.");
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </Button>
          {message && (
            <Typography color="error" align="center">
              {message}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <a href="#">Forgot password?</a>
            </Grid>
            <Grid item>
              <Link to="/RegisterForm">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
