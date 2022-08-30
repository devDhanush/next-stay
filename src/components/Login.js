import { Button, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Paper
      variant="elevation"
      square
      display="flex"
      sx={{
        backgroundColor: "#1A2027",
        height: 710,
      }}
    >
      <Typography variant={"h2"} color="primary" align="center">
        Welcome to Your Next Stay. We help you find the better place for your
        next stay.
      </Typography>
      <Grid
        container
        xs={12}
        spacing={3}
        display="flex"
        justifyContent="center"
        alignItmes="center"
      >
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Login;
