import * as React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
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
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(
    "Entered email or password is incorrect. Please retry."
  );
  const navigate = useNavigate();
  const login = () => {
    setLoading(true);
    axios
      .post("https://next-home-api.herokuapp.com/login", { email, password })
      .then((data) => {
        if (data.data.authenticatedUser) {
          setLoading(false);
          localStorage.setItem("authenticatedUser", "true");
          navigate("/places");
        } else {
          setShowError(true);
          setLoading(false);
        }
      });
  };
  const signOn = () => {
    setLoading(true);
    axios
      .post("https://next-home-api.herokuapp.com/signon", {
        dataTable: "credentials",
        input: { email, password },
      })
      .then((data) => {
        setLoading(false);
        if (data?.data?.executedSuccessfully) {
          setShowCode(true);
        } else {
          if (data?.data?.message) setMessage(data?.data?.message);
          setShowError(true);
        }
      });
  };
  const verify = () => {
    setLoading(true);
    axios
      .post("https://next-home-api.herokuapp.com/verify", { email, code })
      .then((data) => {
        if (data?.data?.authenticatedUser) {
          navigate("/places");
        } else {
          setShowError(true);
        }
        setLoading(false);
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
      <LoadingButton
        loading={loading}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Login or Sign on
      </LoadingButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please login to continue</DialogTitle>
        <DialogContent>
          {showCode ? (
            <>
              <DialogContentText>
                Verification code is sent to your registered mail id {email}.
                Please enter the verification code to proceed. Please check the
                spam list , if you can't find the email.
              </DialogContentText>
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
            </>
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
              <LoadingButton
                loading={loading}
                onClick={login}
                color="primary"
                disabled={!email.length || !password.length}
                variant="contained"
              >
                Login
              </LoadingButton>
              <LoadingButton
                loading={loading}
                onClick={signOn}
                color="secondary"
                disabled={!email.length || !password.length}
                variant="contained"
              >
                Sign on
              </LoadingButton>
            </>
          ) : (
            <>
              <LoadingButton
                loading={loading}
                onClick={verify}
                color="secondary"
                disabled={!code?.length}
                variant="contained"
              >
                Sign on
              </LoadingButton>
            </>
          )}
        </DialogActions>
        {showError && (
          <DialogContent>
            <Typography color="red">{message}</Typography>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
