import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Divider } from "@material-ui/core";

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
}));

export const Footer: React.FC<{
  description: string;
  title: string;
}> = (props) => {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Divider />
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        style={{ color: "white" }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
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
