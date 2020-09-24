import React, { useState } from "react";
import {
  makeStyles,
  useTheme,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  useMediaQuery,
  TextField,
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { ErrorLoading } from "./ErrorLoading";
import DeleteIcon from "@material-ui/icons/Delete";
import { READINGS_QUERY } from "../graphql-queries-mutations/queries";
import {
  REMOVE_METER_READING,
  UPDATE_METER_READING,
} from "../graphql-queries-mutations/mutations";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    width: "95%",
    marginBottom: 30,
    marginTop: 20,
  },
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 700,
    marginTop: "1%",
  },
  tableMedia: {},
  tableColumn: { fontSize: 18 },
  tableColumnMedia: { fontSize: 16 },
  editIcon: { width: 24, height: 24, position: "relative", bottom: 11 },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

export const TableMeterData: React.FC<{ data: { [key: string]: any } }> = ({
  data,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [editingID, setEditingID] = useState<null | string>(null);
  const [editedDate, setEditedDate] = useState("");
  const [editedInitialMeterValue, setEditedInitialMeterValue] = useState("");
  const [editedReadingMeterValue, setEditedReadingMeterValue] = useState("");
  const [
    editedConsumptionElectricity,
    setEditedConsumptionElectricity,
  ] = useState(0);
  const [
    editedNetworkFeeConsumption,
    setEditedNetworkFeeConsumption,
  ] = useState(0);

  const [editedTotalPrice, setEditedTotalPrice] = useState(0);

  const [removeMeterReading, { error }] = useMutation(REMOVE_METER_READING);

  const [editMeterReading, { error: errorEditMeterReading }] = useMutation(
    UPDATE_METER_READING
  );

  if (error) {
    console.log("error", error);
    return <ErrorLoading />;
  }
  if (errorEditMeterReading) {
    alert(errorEditMeterReading);
  }

  function handleMonthYear(dateString: string) {
    var date = new Date(dateString);
    let dd = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let mm = date.getMonth() + 1;
    let month = monthNames[date.getMonth()];
    let yyyy = date.getFullYear();
    if (dd < 10) {
      // @ts-ignore
      dd = "0" + dd;
    }
    if (mm < 10) {
      // @ts-ignore
      mm = "0" + mm;
    }

    const convertedDate = month + " / " + yyyy;
    return convertedDate;
  }

  function handleDate(dateString: string) {
    var date = new Date(dateString);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      // @ts-ignore
      dd = "0" + dd;
    }
    if (mm < 10) {
      // @ts-ignore
      mm = "0" + mm;
    }

    const fullDate = dd + "." + mm + "." + yyyy;
    return fullDate;
  }

  const lastReading = data.meterReadings[data.meterReadings.length - 1];

  const lastReadingID = lastReading._id;

  const possibleDeleteEditReading = data.meterReadings.map(
    (meterReading: any) => {
      return {
        possibleDeleteEdit: meterReading._id === lastReadingID,
      };
    }
  );

  const inputProps = {
    step: 300,
  };

  const handleEditingMeterReading = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedReadingMeterValue(value);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table
          className={matches ? classes.table : classes.tableMedia}
          stickyHeader
          aria-label={matches ? "sticky table" : "a dense table"}
          size={matches ? undefined : "small"}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Date
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Reading Month/Year
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Initial Meter Value
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Reading Meter Value
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Consumption (A) kWh
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Network fee (B) kWh
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                {matches ? (
                  <Typography
                    className={
                      matches ? classes.tableColumn : classes.tableColumnMedia
                    }
                  >
                    Total (A+B) BAM incl.VAT 17%
                  </Typography>
                ) : (
                  <div>
                    <Typography className={classes.tableColumnMedia}>
                      Total
                    </Typography>
                    <Typography className={classes.tableColumnMedia}>
                      incl VAT
                    </Typography>
                  </div>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Edit{" "}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography
                  className={
                    matches ? classes.tableColumn : classes.tableColumnMedia
                  }
                >
                  Delete{" "}
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.meterReadings
              .map(
                (
                  reading: {
                    _id: string;
                    date: string;
                    initialMeterValue: string;
                    readingMeterValue: string;
                    consumptionElectricity: number;
                    networkFeeConsumption: number;
                    price: number | string;
                    totalPrice: number;
                  },
                  index: any
                ) => (
                  <StyledTableRow key={reading._id} id={reading._id}>
                    <TableCell align="center">
                      {handleDate(reading.date)}
                    </TableCell>
                    <TableCell align="center">
                      {handleMonthYear(reading.date)}
                    </TableCell>
                    <TableCell align="center">
                      {reading.initialMeterValue}
                    </TableCell>
                    {editingID !== reading._id ? (
                      <TableCell align="center">
                        {reading.readingMeterValue}
                      </TableCell>
                    ) : (
                      <TableCell component="th" scope="row">
                        <TextField
                          variant="outlined"
                          fullWidth
                          inputProps={inputProps}
                          value={editedReadingMeterValue}
                          onChange={handleEditingMeterReading}
                        />
                      </TableCell>
                    )}

                    <TableCell align="center">
                      {reading.consumptionElectricity}
                    </TableCell>
                    <TableCell align="center">
                      {reading.networkFeeConsumption}
                    </TableCell>

                    <TableCell align="center">
                      {ccyFormat(reading.totalPrice)}
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.editIcon}>
                        <IconButton
                          disabled={
                            !possibleDeleteEditReading[index].possibleDeleteEdit
                              ? true
                              : false
                          }
                        >
                          {possibleDeleteEditReading[index]
                            .possibleDeleteEdit ? (
                            <div>
                              {editingID === reading._id ? (
                                <div>
                                  <CheckIcon
                                    onClick={() => {
                                      editMeterReading({
                                        variables: {
                                          data: {
                                            _id: reading._id,
                                            date: editedDate,
                                            initialMeterValue: editedInitialMeterValue,
                                            readingMeterValue: editedReadingMeterValue,
                                            consumptionElectricity: editedConsumptionElectricity,
                                            networkFeeConsumption: editedNetworkFeeConsumption,
                                            totalPrice: editedTotalPrice,
                                          },
                                        },
                                      }).catch((error) => {
                                        alert(error);
                                      });
                                      setEditingID(null);
                                    }}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <EditIcon
                                    onClick={() => {
                                      setEditingID(reading._id);
                                      setEditedDate(reading.date);
                                      setEditedInitialMeterValue(
                                        reading.initialMeterValue
                                      );
                                      setEditedReadingMeterValue(
                                        reading.readingMeterValue
                                      );
                                      setEditedConsumptionElectricity(
                                        reading.consumptionElectricity
                                      );
                                      setEditedNetworkFeeConsumption(
                                        reading.networkFeeConsumption
                                      );

                                      setEditedTotalPrice(reading.totalPrice);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <HighlightOffIcon />
                          )}
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {possibleDeleteEditReading[index].possibleDeleteEdit ? (
                        <IconButton
                          disabled={
                            !possibleDeleteEditReading[index].possibleDeleteEdit
                              ? true
                              : false
                          }
                          onClick={() =>
                            removeMeterReading({
                              variables: { _id: reading._id },
                              refetchQueries: [{ query: READINGS_QUERY }],
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        <IconButton disabled={true}>
                          <HighlightOffIcon color="inherit" />
                        </IconButton>
                      )}
                    </TableCell>
                  </StyledTableRow>
                )
              )
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
