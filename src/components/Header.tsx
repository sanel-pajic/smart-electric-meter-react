import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, Typography, useMediaQuery, Avatar } from "@material-ui/core";
import logo from "../images/icon_logo.png";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../graphql-queries-mutations/queries";
import { CurrentUserContext } from "../App";
import { ApolloClient } from "apollo-boost";
import { ColorButton } from "./StyledButton";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: 10,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 150, height: 150 },
  imageMedia: { width: 80, height: 80 },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: { marginRight: 24, position: "relative", bottom: 70 },
  avatarTypographyTogether: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: 200,
    marginRight: 20,
    position: "relative",
    bottom: 70,
  },
  avatar: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[400],
    height: 40,
    width: 40,
    fontSize: "1.3rem",
    marginRight: "3%",
  },
  typography: {
    color: "#212121",
    fontSize: 23,
    height: 50,
    marginTop: 15,
  },
}));

function logout(
  apolloclient: ApolloClient<any>,
  history: any,
  setAuthorized: Function
) {
  setAuthorized(false);
  localStorage.clear();
  apolloclient.clearStore();
  history.push("/");
  window.location.reload();
}

export const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const history = useHistory();
  const apolloclient = useApolloClient();
  const { setAuthorized, first_name, last_name } = useContext(
    CurrentUserContext
  );

  function handleClick() {
    history.push("/authorize");
  }

  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data) {
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <NavLink to="/home">
            <img
              src={logo}
              alt="El Meter Logo"
              className={matches ? classes.image : classes.imageMedia}
            />
          </NavLink>
          <Typography color="textSecondary" variant={matches ? "h3" : "h5"}>
            Smart Electric Meter
          </Typography>
        </Toolbar>
        <div className={classes.container}>
          <ColorButton
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Login
          </ColorButton>
        </div>
      </React.Fragment>
    );
  }

  const firstName: string = data.currentUser.first_name;
  const lastName: string = data.currentUser.last_name;
  const letterFN = firstName.charAt(0);
  const letterLN = lastName.charAt(0);

  const firstNameContext: string = first_name;
  const lastNameContext: string = last_name;
  const letterFNContext = firstNameContext.charAt(0);
  const letterLNContext = lastNameContext.charAt(0);

  // console.log("FIRST NAME  CURRENT USER", firstName);
  // console.log("LAST NAME  CURRENT USER", lastName);

  // console.log("FIRST NAME CONTEXT", firstNameContext);
  // console.log("LAST NAME CONTEXT", lastNameContext);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <NavLink to="/home">
          <img
            src={logo}
            alt="El Meter Logo"
            className={matches ? classes.image : classes.imageMedia}
          />
        </NavLink>
        <Typography color="textSecondary" variant={matches ? "h3" : "h5"}>
          Smart Electric Meter
        </Typography>
      </Toolbar>
      <div className={classes.container}>
        <div className={classes.avatarTypographyTogether}>
          <Avatar className={classes.avatar}>
            {letterFN || letterFNContext}
            {letterLN || letterLNContext}
          </Avatar>
          <Typography className={classes.typography}>
            {firstName} {lastName}
          </Typography>
        </div>
        <ColorButton
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            setAuthorized(false);
            logout(apolloclient, history, setAuthorized);
          }}
        >
          Logout
        </ColorButton>
      </div>
    </React.Fragment>
  );
};
