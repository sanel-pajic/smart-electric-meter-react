import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Divider, useMediaQuery } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" align="center" style={{ color: "white" }}>
      {"Copyright ©  "}
      <Link
        style={{ color: "#f44336", fontSize: 16 }}
        href="https://react-beach-resort-sanel-recording.netlify.com/"
      >
        Sanel Pajic
      </Link>
      {"  "}
      2020
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#383e42",
    position: "relative",
    bottom: 0,
    height: 150,
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
  },
  footerMedia: {
    backgroundColor: "#383e42",
    position: "relative",
    bottom: 0,
    height: 100,
    marginTop: "2vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
  },
}));

export const Footer: React.FC<{
  description: string;
  title: string;
}> = (props) => {
  const classes = useStyles();
  const { description, title } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <footer className={matches ? classes.footer : classes.footerMedia}>
      <Divider />
      <Typography
        variant={matches ? "h6" : "subtitle2"}
        align="center"
        gutterBottom
        style={{ color: "white" }}
      >
        {title}
      </Typography>
      <Typography
        variant={matches ? "subtitle1" : "subtitle2"}
        align="center"
        component="p"
        style={{ color: "white" }}
      >
        {description}
      </Typography>
      <Copyright />
    </footer>
  );
};
