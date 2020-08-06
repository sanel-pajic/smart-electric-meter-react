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
} from "@material-ui/core";
import { useChart } from "../components/useChart";
import { CircularLoading } from "../components/CircularLoading";
import { useProtectedPath } from "../components/useProtectedPath";
import { Redirect } from "react-router-dom";

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
    justifyContent: "center",
    alignItems: "center",
  },
  mainDivMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 30,
  },
  cardHeader: { padding: 16 },
  cardHeaderMedia: { padding: 10, marginLeft: "7%" },
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

  const { dataChart, optionsChart }: any = useChart();

  if (dataChart === undefined) {
    return <CircularLoading />;
  }
  if (!accessGrant) {
    return <Redirect to="/authorize" />;
  }

  return (
    <div className={matches ? classes.mainDiv : classes.mainDivMedia}>
      <Card {...rest} className={clsx(classes.root, className)} component="div">
        <Typography
          className={matches ? classes.cardHeader : classes.cardHeaderMedia}
          variant={matches ? "h5" : "h6"}
        >
          Consumption Per Month
        </Typography>
        <Divider />
        <CardContent>
          <div className={classes.chartContainer}>
            <Bar data={dataChart} options={optionsChart} />
          </div>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Typography variant={matches ? "h5" : "h6"} color="error">
            Year - 2020
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

MeterMonthlyReviewPage.propTypes = {
  className: PropTypes.string,
};
