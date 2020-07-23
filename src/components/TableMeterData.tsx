import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
} from "@material-ui/core";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { CircularLoading } from "../components/CircularLoading";
import { ErrorLoading } from "./ErrorLoading";
import DeleteIcon from "@material-ui/icons/Delete";
import { READINGS_QUERY } from "../graphql-queries-mutations/queries";
import { REMOVE_METER_READING } from "../graphql-queries-mutations/mutations";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: "1%",
  },
  tableMedia: {},
  tableColumn: { fontSize: 18 },
});

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

export const TableMeterData: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, loading } = useQuery(READINGS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [removeMeterReading, { error }] = useMutation(REMOVE_METER_READING);
  if (loading || !data) {
    return <CircularLoading />;
  }
  if (error) {
    console.log("error", error);
    return <ErrorLoading />;
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

  return (
    <TableContainer component={Paper}>
      <Table
        className={matches ? classes.table : classes.tableMedia}
        aria-label="spanning table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>Date</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Reading Month/Year
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Initial Meter Value
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Reading Meter Value
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Consumption (A) kWh
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Network fee (B) kWh
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>Price kWh</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>
                Total (A+B) BAM
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>Action </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.meterReadings.map(
            (reading: {
              _id: string;
              date: string;
              initialMeterValue: string;
              readingMeterValue: string;
              consumption: number;
              networkFee: number;
              price: number;
              totalPrice: number;
            }) => (
              <TableRow key={reading._id}>
                <TableCell align="center">{handleDate(reading.date)}</TableCell>
                <TableCell align="center">
                  {handleMonthYear(reading.date)}
                </TableCell>
                <TableCell align="center">
                  {reading.initialMeterValue}
                </TableCell>
                <TableCell align="center">
                  {reading.readingMeterValue}
                </TableCell>
                <TableCell align="center">{reading.consumption}</TableCell>
                <TableCell align="center">{reading.networkFee}</TableCell>
                <TableCell align="center">{reading.price}</TableCell>
                <TableCell align="center">
                  {ccyFormat(reading.totalPrice)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      removeMeterReading({
                        variables: { _id: reading._id },
                        refetchQueries: [{ query: READINGS_QUERY }],
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
