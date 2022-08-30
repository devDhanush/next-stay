import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState();
  const [showCode, setShowCode] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const navigate = useNavigate();
  const login = () => {
    axios
      .post("https://next-home-api.herokuapp.com/login", { email, password })
      .then((data) => {
        console.log("Response", data.data);
        if (data.data.authenticatedUser) {
          localStorage.setItem("authenticatedUser", "true");
          navigate("/places");
        } else {
          setShowError(true);
        }
      });
  };
  const signOn = () => {
    axios
      .post("https://next-home-api.herokuapp.com/signon", {
        dataTable: "credentials",
        input: { email, password },
      })
      .then((data) => {
        console.log("Response", data);
        if (data?.data?.executedSuccessfully) {
          setShowCode(true);
        } else {
          setShowError(true);
        }
      });
  };
  const verify = () => {
    axios
      .post("https://next-home-api.herokuapp.com/verify", { email, code })
      .then((data) => {
        console.log("Response", data.data);
        if (data?.data?.authenticatedUser) {
          navigate("/places");
        } else {
          setShowError(true);
        }
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login or Sign on
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please login to continue</DialogTitle>
        <DialogContent>
          {showCode ? (
            <TextField
              autoFocus
              margin="dense"
              id="coode"
              label="Verification code"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          ) : (
            <>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!showCode ? (
            <>
              <Button
                onClick={login}
                color="primary"
                disabled={!email.length || !password.length}
                variant="contained"
              >
                Login
              </Button>
              <Button
                onClick={signOn}
                color="secondary"
                disabled={!email.length || !password.length}
                variant="contained"
              >
                Sign on
              </Button>
            </>
          ) : (
            <>
              <DialogContentText>
                Verification code is sent to your registered mail id {email}.
                Please enter the verification code to proceed. Please check the
                spam list , if you can't find the email.
              </DialogContentText>
              <Button
                onClick={verify}
                color="secondary"
                disabled={!code?.length}
                variant="contained"
              >
                Sign on
              </Button>
            </>
          )}
        </DialogActions>
        {showError && (
          <DialogContent>
            <Typography color="red">
              Entered email or password is incorrect. Please retry.
            </Typography>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
