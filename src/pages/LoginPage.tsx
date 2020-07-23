import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_MUTATION } from "../graphql-queries-mutations/mutations";
import { useHistory } from "react-router-dom";
import { useMediaQuery, TextField } from "@material-ui/core";
import logo from "../images/icon_logo.png";
import Modal from "@material-ui/core/Modal";
import { CurrentUserContext } from "../App";

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "#bdbdbd",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

function Copyright() {
  return (
    <div style={{ position: "relative", bottom: 30 }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="primary"
          href="https://react-beach-resort-sanel-recording.netlify.com/"
        >
          Sanel Pajic
        </Link>{" "}
        2020
        {"."}
      </Typography>
    </div>
  );
}

function rand() {
  return Math.round(Math.random() * 2) - 1;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  rootDiv: { display: "flex", justifyContent: "center", alignItems: "center" },
  paper: {
    width: 350,
    marginTop: "5%",
    padding: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginTop: 50,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    width: "68%",
    backgroundColor: "#1976d2",
    height: 42,
  },
  submitButtonMedia: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1976d2",
    height: 42,
  },
  imageLogo: { width: 100, height: 100, marginTop: 10 },
  imageLogoMedia: { width: 60, height: 60 },
  paperModal: {
    position: "absolute",
    width: 380,
    height: 530,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paperModalMedia: {
    position: "absolute",
    width: 300,
    height: 340,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const LoginPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { first_name, last_name, setAuthorized } = useContext(
    CurrentUserContext
  );

  const [modalStyle] = React.useState(getModalStyle);
  const [open] = React.useState(true);

  const [login, { error }] = useMutation(LOGIN_MUTATION);

  if (error) {
    console.log("error", error);
  }

  console.log(
    "DATA FROM CURRENT USER CONTEXT",
    " First Name:",
    first_name,
    " Last Name:",
    last_name
  );

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
    >
      <div
        style={modalStyle}
        className={matches ? classes.paperModal : classes.paperModalMedia}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <ValidationTextField
            autoComplete="email"
            margin="normal"
            name="email"
            label="Email Address"
            required
            variant="outlined"
            id="email"
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ValidationTextField
            autoComplete="current-password"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            required
            variant="outlined"
            id="password"
            fullWidth
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={
                matches ? classes.submitButton : classes.submitButtonMedia
              }
              onClick={(e) => {
                e.preventDefault();
                setEmail("");
                setPassword("");
                login({
                  variables: {
                    email: email,
                    password: password,
                  },
                })
                  .then((res) => {
                    localStorage.setItem("token", res.data.login.token);
                    localStorage.setItem("userId", res.data.login.userId);
                    history.push("/app");
                    setAuthorized(true);
                  })
                  .catch((error) => {
                    console.log("ERROR", error);
                    alert(error);
                  })
                  .finally(() => window.location.reload());
              }}
            >
              Sign In - PRESS TO LOGIN
            </Button>
            <img
              src={logo}
              alt="El Meter Logo"
              className={matches ? classes.imageLogo : classes.imageLogoMedia}
            />
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Modal>
  );
};
