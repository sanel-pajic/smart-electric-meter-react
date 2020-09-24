import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Toolbar,
  Typography,
  useMediaQuery,
  Avatar,
  Divider,
} from "@material-ui/core";
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
  containerMedia: {
    position: "relative",
    top: 85,
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
  divider: { marginTop: 30 },
}));

export function logout(
  apolloclient: ApolloClient<any>,
  history: any,
  setAuthorized: Function
) {
  setAuthorized(false);
  localStorage.clear();
  apolloclient.clearStore();
  history.push("https://smart-electric-meter-app.netlify.app/");
  window.location.reload();
}

export const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const history = useHistory();
  const apolloclient = useApolloClient();
  const { setAuthorized } = useContext(CurrentUserContext);

  function handleClick() {
    history.push("https://smart-electric-meter-app.netlify.app/authorize");
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
          {matches ? (
            <ColorButton
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Login
            </ColorButton>
          ) : null}
        </div>
      </React.Fragment>
    );
  }

  const firstName: string = data.currentUser.first_name;
  const lastName: string = data.currentUser.last_name;
  const letterFN = firstName.charAt(0);
  const letterLN = lastName.charAt(0);

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
      <div className={matches ? classes.container : classes.containerMedia}>
        <div className={classes.avatarTypographyTogether}>
          <Avatar className={classes.avatar}>
            {letterFN}
            {letterLN}
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
      {!matches ? <Divider className={classes.divider} /> : null}
    </React.Fragment>
  );
};
