import React, { useState } from "react";
import {
  Paper,
  Button,
  Typography,
  Grid,
  useMediaQuery,
  TextField,
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
// import mongoID from "bson-objectid";
// import { useQuery, useMutation } from "@apollo/react-hooks";
// import * as yup from "yup";
// import { Redirect } from "react-router";
// import { CircularLoading } from "../components/CircularLoading";
// import { TableArticles } from "../components/TableArticles";
// import { ARTICLES_QUERY } from "../graphql-queries-mutations/queries";
// import { ADD_MUTATION_ARTICLE } from "../graphql-queries-mutations/mutations";
// import { ModalError } from "../components/ModalError";

// let schema = yup.object().shape({
//   code: yup.string().required().min(5),
//   description: yup.string().required().min(5),
//   quantity: yup.number().required().min(1),
//   price: yup.number().required().min(1),
// });
import gray from "@material-ui/core/colors/red";

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
  })
);

export const Home: React.FC = () => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
                    <DatePickerComponent />
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
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
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
                      //   onClick={(e) => {
                      //     e.preventDefault();
                      //     setCode("");
                      //     setDescription("");
                      //     setQuantity("");
                      //     setPrice("");
                      //     try {
                      //       const valid = schema.validateSync({
                      //         code,
                      //         description,
                      //         quantity,
                      //         price,
                      //       });
                      //       console.log("VALID", valid);

                      //       addComponentArticle({
                      //         variables: {
                      //           data: {
                      //             _id: mongoID.generate(),
                      //             code,
                      //             description,
                      //             quantity,
                      //             price,
                      //             author: userId,
                      //           },
                      //         },
                      //         refetchQueries: [{ query: ARTICLES_QUERY }],
                      //       }).catch((error) =>
                      //         console.log("ERROR ADD ARTICLE", error)
                      //       );
                      //     } catch (error) {
                      //       alert(error);
                      //     }
                      //   }}
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
        <TableMeterData />
      </Paper>
    </div>
  );
};
