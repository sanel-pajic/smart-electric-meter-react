import React from "react";
import { Paper, makeStyles, Divider, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ElectricityIcon from "@material-ui/icons/EmojiObjectsOutlined";
import {
  blue,
  green,
  yellow,
  grey,
  deepOrange,
  orange,
} from "@material-ui/core/colors";
import NetworkFee from "@material-ui/icons/Timeline";
import electricGridImage from "../images/electricGrid.png";
import electricIconImage from "../images/electricIcon.png";
import TelevisionFee from "@material-ui/icons/Tv";
import WindMill from "@material-ui/icons/Toys";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    height: 700,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  divider: {
    width: "100%",
    marginTop: 10,
  },
  dividerTwo: {
    width: 320,
    marginTop: 0,
    marginLeft: 80,
    position: "relative",
    bottom: 25,
  },
  settings: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 4,
  },
  electricityIcon: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[400],
    height: 45,
    width: 45,
    borderRadius: 10,
    marginRight: 60,
  },
  networkFee: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[400],
    height: 35,
    width: 35,
    borderRadius: 10,
    marginRight: 40,
    padding: 5,
  },
  windMill: {
    color: theme.palette.getContrastText(deepOrange[600]),
    backgroundColor: deepOrange[500],
    height: 35,
    width: 35,
    borderRadius: 10,

    padding: 5,
  },
  televisionFee: {
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[800],
    height: 35,
    width: 35,
    borderRadius: 10,
    marginRight: 40,
    padding: 5,
  },
  divSetting: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 70,
    marginTop: 20,
  },
  divSettingTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 75,
    marginTop: 20,
  },
  divSettingThree: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 85,
    marginTop: 20,
  },
  divSettingFour: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 65,
    marginTop: 20,
  },
  typographyTitle: { position: "relative", right: 45 },
  typographyTitleTwo: { position: "relative", right: 25 },
  typographyPrice: { position: "relative", left: 130, bottom: 25 },
  image: {
    width: 32,
    height: 32,
  },
  imageElectric: {
    width: 40,
    height: 40,
  },
  imageDiv: {
    width: 45,
    height: 45,
    backgroundColor: yellow[400],
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageDivTwo: {
    width: 45,
    height: 45,
    backgroundColor: orange[300],
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  typographyTwo: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    left: 15,
  },
}));

export const Settings: React.FC = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper className={classes.paper}>
        <SettingsIcon className={classes.settings} color="action" />
        <Typography variant="h5" color="textSecondary">
          Meter Settings
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.divSetting}>
          <ElectricityIcon className={classes.electricityIcon} />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.typographyTitle}
          >
            Electricity Price
          </Typography>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />
        <div className={classes.divSettingTwo}>
          <div className={classes.imageDivTwo}>
            <img
              src={electricIconImage}
              alt="El Grid"
              className={classes.imageElectric}
            />
          </div>
          <div className={classes.typographyTwo}>
            <Typography variant="subtitle1" color="textSecondary">
              Measurement Location
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Electricity Fee
            </Typography>
          </div>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />

        <div className={classes.divSetting}>
          <NetworkFee className={classes.networkFee} />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.typographyTitleTwo}
          >
            Network Fee Price
          </Typography>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />
        <div className={classes.divSettingTwo}>
          <div className={classes.imageDiv}>
            <img
              src={electricGridImage}
              alt="El Grid"
              className={classes.image}
            />
          </div>
          <div className={classes.typographyTwo}>
            <Typography variant="subtitle1" color="textSecondary">
              Measurement Location
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Network Fee
            </Typography>
          </div>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />
        <div className={classes.divSettingThree}>
          <WindMill className={classes.windMill} />
          <div className={classes.typographyTwo}>
            <Typography variant="subtitle1" color="textSecondary">
              Renewable Sources
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fee Price
            </Typography>
          </div>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />
        <div className={classes.divSettingFour}>
          <TelevisionFee className={classes.televisionFee} fontSize="small" />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.typographyTitleTwo}
          >
            Television Fee Price
          </Typography>
        </div>
        <Typography
          className={classes.typographyPrice}
          variant="body1"
          color="textSecondary"
        >
          0.006982 BAM
        </Typography>
        <Divider className={classes.dividerTwo} />
      </Paper>
    </div>
  );
};
