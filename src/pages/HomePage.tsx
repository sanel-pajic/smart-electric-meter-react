import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  TextField,
  Divider,
  IconButton,
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
import {
  READINGS_QUERY,
  SETTINGS_QUERY,
} from "../graphql-queries-mutations/queries";
import { ADD_METER_READING } from "../graphql-queries-mutations/mutations";
import { Redirect, useHistory } from "react-router-dom";
import { useProtectedPath } from "../components/useProtectedPath";
import { LinearMeterProgress } from "../components/LinearMeterProgress";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Settings } from "../components/Settings";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

let schema = yup.object().shape({
  readingMeterValue: yup
    .string()
    .required("Meter Value is required.")
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
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
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
      width: "45vw",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: "2%",
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      marginBottom: "1%",
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
      width: 150,
      marginLeft: "2%",
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
      flexDirection: "column",
      paddingRight: "6%",
    },
    meterRootMedia: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      bottom: 30,
    },
    meterSettingsDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
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
      bottom: 30,
      padding: 15,
    },
    dividerHome: { width: "100%", marginTop: 20 },
    typographyListAllMedia: { marginTop: 24, fontSize: 22 },
    buttonStatistics: { marginBottom: 30 },
    settings: { marginLeft: "4%" },
    settingsDiv: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    settingsIcon: {
      width: 30,
      height: 30,
      marginTop: 8,
      marginBottom: 4,
      position: "relative",
      bottom: 20,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 80,
    },
    paperModal: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 4, 0),
      width: 250,
      height: 550,
    },
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
  const [open, setOpen] = useState(false);

  const { data: MeterReadingsData, loading: MeterReadingsLoading } = useQuery(
    READINGS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const { data: SettingsData, loading: SettingsDataLoading } = useQuery(
    SETTINGS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    }
  );
  const [addMeterReading, { error }] = useMutation(ADD_METER_READING, {
    errorPolicy: "all",
  });

  if (MeterReadingsLoading || !MeterReadingsData) {
    return <CircularLoading />;
  }
  if (SettingsDataLoading || !SettingsData) {
    return <CircularLoading />;
  }

  if (error) {
    console.log("error", error);
  }

  if (!accessGrant) {
    return <Redirect to="/authorize" />;
  }

  const lastReading =
    MeterReadingsData.meterReadings[MeterReadingsData.meterReadings.length - 1];

  const readingMeterValueNEW = lastReading.readingMeterValue;

  const priceElectricityNEW = SettingsData.meterSettings[0].priceElectricity;

  // Measuring Location Electricity is divided by 3 since three households are involved
  const measuringPointElectricityPriceNEW =
    SettingsData.meterSettings[0].measuringPointElectricity / 3;

  const priceNetworkFeeNEW = SettingsData.meterSettings[0].priceNetworkFee;

  // Measuring Location Network Fee is divided by 3 since three households are involved
  const measuringPointElectricityNetworkFeeNEW =
    SettingsData.meterSettings[0].measuringPointNetworkFee / 3;

  const renewableSourcesFeePriceNEW =
    SettingsData.meterSettings[0].renewableSourcesFeePrice;

  // Television Fee is divided by 3 since three households are involved
  const televisionFeePriceNEW = SettingsData.meterSettings[0].televisionFee / 3;

  function scrollToForm(id: string) {
    document?.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const handleClick = (id: string) => {
    setReadingMeterValue("");
    setTimeout(() => {
      scrollToForm(id);
    }, 100);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.rootDiv}>
      <Paper className={matches ? classes.paper : classes.paperMedia}>
        <div className={classes.meterSettingsDiv}>
          <div className={matches ? classes.meterRoot : classes.meterRootMedia}>
            <div className={classes.divMeter}>
              <LinearMeterProgress />
            </div>
            {matches ? undefined : (
              <div className={classes.settingsDiv}>
                <Typography variant="h6" color="textSecondary">
                  Meter Settings
                </Typography>
                <IconButton onClick={handleOpen}>
                  <SettingsIcon
                    className={classes.settingsIcon}
                    color="action"
                  />
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <div className={classes.paperModal}>
                        <Settings data={SettingsData} />
                      </div>
                    </Fade>
                  </Modal>
                </IconButton>
              </div>
            )}

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
                className={
                  matches ? classes.textHeader : classes.textHeaderMedia
                }
              >
                Enter Meter Value
              </Typography>

              <Paper
                className={matches ? classes.mainDiv : classes.mainDivMedia}
              >
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

                            const totalPriceElectricity =
                              //@ts-ignore
                              consumptionNew * priceElectricityNEW;

                            const totalPriceNetworkFee =
                              //@ts-ignore
                              consumptionNew * priceNetworkFeeNEW;

                            const totalRenewableSourcesFee =
                              //@ts-ignore
                              consumptionNew * renewableSourcesFeePriceNEW;

                            const totalPriceWithVAT =
                              //@ts-ignore
                              (totalPriceElectricity +
                                measuringPointElectricityPriceNEW +
                                totalPriceNetworkFee +
                                measuringPointElectricityNetworkFeeNEW +
                                totalRenewableSourcesFee) *
                              1.17;

                            const totalPriceNEW: number =
                              totalPriceWithVAT + televisionFeePriceNEW;

                            addMeterReading({
                              variables: {
                                data: {
                                  _id: mongoID.generate(),
                                  date,
                                  initialMeterValue: readingMeterValueNEW,
                                  readingMeterValue,
                                  consumptionElectricity: consumptionNew,
                                  networkFeeConsumption: consumptionNew,
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
          {matches ? (
            <div className={classes.settings}>
              <Settings data={SettingsData} />
            </div>
          ) : null}
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
        <TableMeterData data={MeterReadingsData} />
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
