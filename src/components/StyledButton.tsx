import { Button, withStyles, Theme } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[300],
    },
  },
}))(Button);
