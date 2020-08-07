import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  TextField,
  Divider,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { TableMeterData } from "../components/TableMeterData";
import { DatePickerComponent } from "../components/DatePickerComponent";
import mongoID from "bson-objectid";
import { useQuery, useMutation } from "@apollo/react-hooks";
import * as yup from "yup";
import { CircularLoading } from "../components/CircularLoading";
import { READINGS_QUERY } from "../graphql-queries-mutations/queries";
import { ADD_METER_READING } from "../graphql-queries-mutations/mutations";
import { Redirect, useHistory } from "react-router-dom";
import { useProtectedPath } from "../components/useProtectedPath";
import { LinearMeterProgress } from "../components/LinearMeterProgress";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

let schema = yup.object().shape({
  readingMeterValue: yup
    .string()
    .test(
      "Meter Value",
      "Must be exactly 5 characters",
      (val) => val.length === 5
    ),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "90vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 10,
    },
    paperMedia: {
      width: "380px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
    },
    mainDiv: {
      width: "43vw",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "1%",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      position: "relative",
      padding: "1%",
      marginBottom: "4%",
    },
    mainDivMedia: {
      width: "340px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "1%",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      position: "relative",
      padding: "1%",
      marginBottom: "4%",
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        border: "1px solid gray",
      },
    },
    quantity: {
      width: 160,
    },
    quantityMedia: {
      width: 300,
    },
    addButton: {
      width: 170,
      marginLeft: "5%",
    },
    addButtonMedia: {
      width: 170,
      marginTop: 20,
      marginBottom: 20,
    },
    textHeader: {
      marginTop: "2%",
      marginBottom: "1%",
    },
    textHeaderMedia: { marginTop: 25, marginBottom: 15 },
    rootGrid: {
      flexGrow: 2,
    },
    rootDiv: {
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      marginTop: "1vh",
    },
    typographyListAll: { marginTop: 50, marginBottom: 10 },
    divMeter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    typographyHouse: { position: "relative", top: 10 },
    meterRoot: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #bdbdbd",
      padding: 10,
      paddingRight: 70,
      marginTop: 30,
    },
    meterRootMedia: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    divValues: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    textNote: { fontSize: 15 },
    textNoteInstructions: { fontSize: 17, textDecoration: "underline" },
    typographyInstructions: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      top: 35,
    },
    typographyInstructionsMedia: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      top: 15,
      padding: 15,
    },
    dividerHome: { width: "100%", marginTop: 20 },
    typographyListAllMedia: { marginTop: 24, fontSize: 22 },
    buttonStatistics: { marginBottom: 30 },
  })
);

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const [readingMeterValue, setReadingMeterValue] = useState<number | string>(
    ""
  );
  const [date, setDate] = useState<Date | null>(new Date());
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const history = useHistory();
  const accessGrant = useProtectedPath();

  const { data, loading } = useQuery(READINGS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [addMeterReading, { error }] = useMutation(ADD_METER_READING, {
    errorPolicy: "all",
  });

  if (error) {
    console.log("error", error);
  }

  if (!accessGrant) {
    return <Redirect to="/authorize" />;
  }

  if (loading || !data) {
    return <CircularLoading />;
  }

  const lastReading = data.meterReadings[data.meterReadings.length - 1];

  const readingMeterValueNEW = lastReading.readingMeterValue;

  const priceNEW = lastReading.price;

  function scrollToForm(id: string) {
    document?.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const handleClick = (id: string) => {
    setReadingMeterValue("");
    setTimeout(() => {
      scrollToForm(id);
    }, 100);
  };

  return (
    <div className={classes.rootDiv}>
      <Paper className={matches ? classes.paper : classes.paperMedia}>
        <div className={matches ? classes.meterRoot : classes.meterRootMedia}>
          <div className={classes.divMeter}>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.typographyHouse}
            >
              House Mujo
            </Typography>
            <LinearMeterProgress />
          </div>
          <div className={classes.divValues}>
            {!matches ? (
              <div
                className={
                  matches
                    ? classes.typographyInstructions
                    : classes.typographyInstructionsMedia
                }
              >
                <Typography
                  color="secondary"
                  className={classes.textNoteInstructions}
                >
                  Instructions:
                </Typography>
                <Typography className={classes.textNote}>
                  1. Pick date
                </Typography>
                <Typography className={classes.textNote}>
                  2. Enter first 5 numbers on your meter! Don't enter last
                  number on your meter (in red)!
                </Typography>
                <Typography color="primary" className={classes.textNote}>
                  Input example: 75432
                </Typography>
              </div>
            ) : null}
            <Typography
              variant={matches ? "h4" : "h5"}
              color="textSecondary"
              className={matches ? classes.textHeader : classes.textHeaderMedia}
            >
              Enter Meter Value
            </Typography>

            <Paper className={matches ? classes.mainDiv : classes.mainDivMedia}>
              <div className={classes.rootGrid}>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                >
                  <Grid item xs="auto">
                    <DatePickerComponent date={date} onDateChange={setDate} />
                  </Grid>

                  <Grid item xs="auto">
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="reading"
                        label="Meter Value Input"
                        variant="filled"
                        size="small"
                        type="number"
                        className={
                          matches ? classes.quantity : classes.quantityMedia
                        }
                        color="secondary"
                        value={readingMeterValue}
                        onChange={(e) => setReadingMeterValue(e.target.value)}
                      />
                    </form>
                  </Grid>

                  <Grid item xs="auto">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={
                        matches ? classes.addButton : classes.addButtonMedia
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setReadingMeterValue("");
                        try {
                          const valid = schema.validateSync({
                            readingMeterValue,
                          });
                          console.log("VALID", valid);
                          const consumptionNew =
                            //@ts-ignore
                            readingMeterValue - readingMeterValueNEW;
                          const totalPriceNEW = consumptionNew * priceNEW * 2;

                          addMeterReading({
                            variables: {
                              data: {
                                _id: mongoID.generate(),
                                date,
                                initialMeterValue: readingMeterValueNEW,
                                readingMeterValue,
                                consumption: consumptionNew,
                                networkFee: consumptionNew,
                                price: priceNEW,
                                totalPrice: totalPriceNEW,
                              },
                            },
                            refetchQueries: [{ query: READINGS_QUERY }],
                          })
                            .then((res) =>
                              handleClick(res.data.addMeterReading._id)
                            )
                            .catch((error) => alert(error));
                        } catch (error) {
                          alert(error);
                        }
                      }}
                    >
                      Add Reading
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Paper>
            {matches ? (
              <div className={classes.typographyInstructions}>
                <Typography
                  color="secondary"
                  className={classes.textNoteInstructions}
                >
                  Instructions:
                </Typography>
                <Typography className={classes.textNote}>
                  1. Pick date
                </Typography>
                <Typography className={classes.textNote}>
                  2. Enter first 5 numbers on your meter! Don't enter last
                  number on your meter (in red)!
                </Typography>
                <Typography color="primary" className={classes.textNote}>
                  Input example: 75432
                </Typography>
              </div>
            ) : null}
          </div>
        </div>
        <Typography
          variant={matches ? "h4" : "h5"}
          color="textSecondary"
          className={
            matches ? classes.typographyListAll : classes.typographyListAllMedia
          }
        >
          List of all Meter readings by date
        </Typography>
        <Divider className={classes.dividerHome} />
        <TableMeterData />
        <Button
          onClick={() => history.push("/statistics")}
          size="large"
          className={classes.buttonStatistics}
          variant="outlined"
        >
          Statistics <ArrowRightIcon />
        </Button>
      </Paper>
    </div>
  );
};
