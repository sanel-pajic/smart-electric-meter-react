import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import meter from "../images/meter.jpg";
import { useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: 84,
    position: "relative",
    bottom: 139.5,
  },
  progressMedia: { width: 77, position: "relative", bottom: 112, left: 1 },
  rootDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 350, height: 350 },
  imageMedia: { width: 280, height: 280 },
}));

export const LinearMeterProgress: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={classes.rootDiv}>
      <img
        src={meter}
        alt="Meter"
        className={matches ? classes.image : classes.imageMedia}
      />
      <LinearProgress
        className={matches ? classes.progress : classes.progressMedia}
        color="secondary"
        variant="query"
      />
    </div>
  );
};
