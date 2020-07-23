import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Toolbar, Typography, useMediaQuery } from "@material-ui/core";
import logo from "../images/icon_logo.png";
import { NavLink, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "../graphql-queries-mutations/queries";

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
}));

export const Header: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, loading } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data) {
    return <Redirect to="/" />;
  }

  const firstName: string = data.currentUser.first_name;
  const lastName: string = data.currentUser.last_name;

  console.log("DATA CURRENT USER", data);
  console.log("FIRST NAME  CURRENT USER", firstName);
  console.log("LAST NAME  CURRENT USER", lastName);

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <NavLink to="/">
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
    </React.Fragment>
  );
};
