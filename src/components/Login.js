import { Button, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const doLogin = () => {
    navigate("/places");
  };
  return (
    <Grid xs={12} display="flex" justifyContent="center" alignItems="center" >
      <Paper
        variant="elevation"
        square
        display="flex"
        sx={{
          backgroundColor: "#1A2027",

        }}
      >
        <Typography variant={"h2"} color="primary" align="center">
          Welcome to Your Next Stay. We help you find the better place for your
          next stay.
        </Typography>

        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item>
            <Button size="large" variant="outlined" onClick={doLogin}>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button size="large" variant="outlined" onClick={doLogin}>
              Sing up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default Login;
