import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { useChart2020 } from "../components/useChart2020";
import { CircularLoading } from "../components/CircularLoading";
import { useProtectedPath } from "../components/useProtectedPath";
import { Redirect, Link } from "react-router-dom";
import { deepOrange } from "@material-ui/core/colors";
import { useChart2021 } from "../components/useChart2021";

const useStyles = makeStyles(() => ({
  root: { height: "50%", width: "80%" },
  chartContainer: {
    height: 400,
    position: "relative",
  },
  actions: {
    justifyContent: "center",
    padding: 20,
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainDivMedia: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: 30,
  },
  cardHeader: { padding: 16, color: deepOrange[700], fontSize: 28 },
  cardHeaderMedia: { padding: 4, color: deepOrange[600], fontWeight: "bold" },

  typographyDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: { position: "relative", top: "3vh" },
  buttonMedia: { marginBottom: 50, marginTop: 20 },
  containerBetweenCards: {height:50, width:"100%"}
}));

export const MeterMonthlyReviewPage = (props: {
  [x: string]: any;
  className: string;
}) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const accessGrant = useProtectedPath();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { dataChart: dataChart2020, optionsChart: optionsChart2020 }: any = useChart2020();
  const { dataChart: dataChart2021, optionsChart: optionsChart2021 }: any = useChart2021();

  if (dataChart2021 === undefined) {
    return <CircularLoading />;
  }
  if (dataChart2020 === undefined) {
    return <CircularLoading />;
  }
  if (!accessGrant) {
    return <Redirect to="/authorize" />;
  }

  return (
    <div className={matches ? classes.mainDiv : classes.mainDivMedia}>
       <Card {...rest} className={clsx(classes.root, className)} component="div">
        <div className={matches ? undefined : classes.typographyDiv}>
          <Typography
            className={matches ? classes.cardHeader : classes.cardHeaderMedia}
            variant={matches ? "h5" : "overline"}
          >
            Consumption Electricity Per Month - Year 2021
          </Typography>
        </div>

        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={dataChart2021} options={optionsChart2021} />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Typography variant={matches ? "h5" : "h6"} color="error">
            Year - 2021
          </Typography>
        </CardActions>
      </Card>
      <div className={classes.containerBetweenCards}/>
      <Card {...rest} className={clsx(classes.root, className)} component="div">
        <div className={matches ? undefined : classes.typographyDiv}>
          <Typography
            className={matches ? classes.cardHeader : classes.cardHeaderMedia}
            variant={matches ? "h5" : "overline"}
          >
            Consumption Electricity Per Month - Year 2020
          </Typography>
        </div>

        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={dataChart2020} options={optionsChart2020} />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Typography variant={matches ? "h5" : "h6"} color="error">
            Year - 2020
          </Typography>
        </CardActions>
      </Card>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          color="default"
          className={matches ? classes.button : classes.buttonMedia}
        >
          Back to home
        </Button>
      </Link>
    </div>
  );
};

MeterMonthlyReviewPage.propTypes = {
  className: PropTypes.string,
};
