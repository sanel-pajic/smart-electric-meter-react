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
import meter from "../images/meter.jpg";
import { DatePickerComponent } from "../components/DatePickerComponent";
import mongoID from "bson-objectid";
import { useQuery, useMutation } from "@apollo/react-hooks";
import * as yup from "yup";
import { CircularLoading } from "../components/CircularLoading";
import { READINGS_QUERY } from "../graphql-queries-mutations/queries";
import { ADD_METER_READING } from "../graphql-queries-mutations/mutations";
import { Redirect } from "react-router-dom";
import { useProtectedPath } from "../components/useProtectedPath";

let schema = yup.object().shape({
  readingMeterValue: yup.number().required().min(5),
  // .test("Meter Value", "Must be exactly 5 characters", (val) => val.length === 5),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "85vw",
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
    image: { width: 350, height: 350 },
    imageMedia: {},
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
    dividerHome: { width: "100%", marginTop: 20 },
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
  const currentUser: string | null = localStorage.getItem("userId");
  const accessGrant = useProtectedPath();

  // const { first_name, last_name, authorized, userId, token } = useContext(
  //   CurrentUserContext
  // );

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

  // console.log(
  //   "DATA FROM CURRENT USER CONTEXT",
  //   " First Name:",
  //   first_name,
  //   " Last Name:",
  //   last_name,
  //   "Authorized:",
  //   authorized,
  //   "User ID:",
  //   userId,
  //   "Token:",
  //   token
  // );

  console.log("CURRENT USER", currentUser);

  return (
    <div className={classes.rootDiv}>
      <Paper className={matches ? classes.paper : classes.paperMedia}>
        <div className={classes.meterRoot}>
          <div className={classes.divMeter}>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.typographyHouse}
            >
              House Mujo
            </Typography>
            <img
              src={meter}
              alt="Meter"
              className={matches ? classes.image : classes.imageMedia}
            />
          </div>
          <div className={classes.divValues}>
            <Typography
              variant={matches ? "h4" : "h5"}
              color="textSecondary"
              className={classes.textHeader}
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
                        id="filled-basic3"
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
                          }).catch((error) =>
                            console.log("ERROR ADD ARTICLE", error)
                          );
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
            <div className={classes.typographyInstructions}>
              <Typography
                color="secondary"
                className={classes.textNoteInstructions}
              >
                Instructions:
              </Typography>
              <Typography className={classes.textNote}>1. Pick date</Typography>
              <Typography className={classes.textNote}>
                2. Enter first 5 numbers on your meter! Don't enter last number
                on your meter (in red)!
              </Typography>
              <Typography color="primary" className={classes.textNote}>
                Input example: 75432
              </Typography>
            </div>
          </div>
        </div>

        <Typography
          variant={matches ? "h4" : "h5"}
          color="textSecondary"
          className={matches ? classes.typographyListAll : undefined}
        >
          List of all Meter readings by date
        </Typography>
        <Divider className={classes.dividerHome} />
        <TableMeterData />
      </Paper>
    </div>
  );
};
