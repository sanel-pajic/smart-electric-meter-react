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

// import { useQuery, useMutation } from "@apollo/react-hooks";
// import { CircularLoading } from "../components/CircularLoading";
// import { ErrorLoading } from "./ErrorLoading";
import DeleteIcon from "@material-ui/icons/Delete";
// import { ARTICLES_QUERY } from "../graphql-queries-mutations/queries";
// import { REMOVE_ARTICLE_MUTATION } from "../graphql-queries-mutations/mutations";

const TAX_RATE = 0.1;

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

  //   const { data, loading } = useQuery(ARTICLES_QUERY, {
  //     fetchPolicy: "cache-and-network",
  //   });

  //   const [removeComponentArticle, { error }] = useMutation(
  //     REMOVE_ARTICLE_MUTATION
  //   );
  //   if (loading || !data) {
  //     return <CircularLoading />;
  //   }
  //   if (error) {
  //     console.log("error", error);
  //     return <ErrorLoading />;
  //   }

  //   const invoiceSubtotal = data.componentArticles
  //     .map(
  //       (article: {
  //         _id: string;
  //         code: string;
  //         description: string;
  //         quantity: number;
  //         price: number;
  //       }) => article.price * article.quantity
  //     )
  //     .reduce((acc: number, val: number) => acc + val, 0);

  //   const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  //   const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
                Total Price (A+B) BAM
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography className={classes.tableColumn}>Action </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.componentArticles.map(
            (article: {
              _id: string;
              code: string;
              description: string;
              quantity: number;
              price: number;
            }) => (
              <TableRow key={article._id}>
                <TableCell>{article.code}</TableCell>
                <TableCell align="left">{article.description}</TableCell>
                <TableCell align="center">{article.quantity}</TableCell>
                <TableCell align="center">{ccyFormat(article.price)}</TableCell>
                <TableCell align="center">
                  {ccyFormat(article.price * article.quantity)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      removeComponentArticle({
                        variables: { _id: article._id },
                        refetchQueries: [{ query: ARTICLES_QUERY }],
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
