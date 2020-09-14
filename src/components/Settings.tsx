import React, { ChangeEvent, useState } from "react";
import {
  Paper,
  makeStyles,
  Divider,
  Typography,
  IconButton,
  TextField,
} from "@material-ui/core";
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
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_METER_SETTINGS } from "../graphql-queries-mutations/mutations";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    height: 750,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  paperEditing: {
    width: 400,
    height: 850,
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
  typographyPriceTwo: { position: "relative", left: 135, bottom: 25 },
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
  settingsDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  editSettings: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 10,
    left: 20,
    marginBottom: 10,
  },
  iconButton: { marginLeft: 10 },
  editingTextField: {
    position: "relative",
    left: 130,
    bottom: 40,
    width: 110,
  },
}));

export const Settings: React.FC<{ data: { [key: string]: any } }> = ({
  data,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  const electricityPriceNEW = data.meterSettings[0].priceElectricity;

  const [electricityPrice, setElectricityPrice] = useState(electricityPriceNEW);
  const measuringLocationElectricityFeeNEW =
    data.meterSettings[0].measuringPointElectricity;
  const [
    measuringLocationElectricityFee,
    setMeasuringLocationElectricityFee,
  ] = useState(measuringLocationElectricityFeeNEW);
  const networkFeePriceNEW = data.meterSettings[0].priceNetworkFee;
  const [networkFeePrice, setNetworkFeePrice] = useState(networkFeePriceNEW);
  const measurementLocationNetworkFeeNEW =
    data.meterSettings[0].measuringPointNetworkFee;
  const [
    measurementLocationNetworkFee,
    setMeasurementLocationNetworkFee,
  ] = useState(measurementLocationNetworkFeeNEW);

  const renewableSourcesFeePriceNEW =
    data.meterSettings[0].renewableSourcesFeePrice;
  const [renewableSourcesFeePrice, setRenewableSourcesFeePrice] = useState(
    renewableSourcesFeePriceNEW
  );
  const televisionFeePriceNEW = data.meterSettings[0].televisionFee;
  const [televisionFeePrice, setTelevisionFeePrice] = useState(
    televisionFeePriceNEW
  );

  const [editedPriceElectricity, setEditedPriceElectricity] = useState("");
  const [
    editedMeasuringPointElectricity,
    setEditedMeasuringPointElectricity,
  ] = useState("");
  const [editedPriceNetworkFee, setEditedPriceNetworkFee] = useState("");
  const [
    editedMeasuringPointNetworkFee,
    setEditedMeasuringPointNetworkFee,
  ] = useState("");
  const [
    editedRenewableSourcesFeePrice,
    setEditedRenewableSourcesFeePrice,
  ] = useState("");
  const [editedTelevisionFee, setEditedTelevisionFee] = useState("");

  const [editSettings, { error: errorEditSettings }] = useMutation(
    UPDATE_METER_SETTINGS
  );

  if (errorEditSettings) {
    alert(errorEditSettings);
  }

  const handleEditingElectricityPrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setElectricityPrice(value);
  };

  const handleMeasuringLocationElectricityFee = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setMeasuringLocationElectricityFee(value);
  };

  const handleNetworkFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setNetworkFeePrice(value);
  };

  const handleMeasurementLocationNetworkFee = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setMeasurementLocationNetworkFee(value);
  };

  const handleRenewableSourcesFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setRenewableSourcesFeePrice(value);
  };

  const handleTelevisionFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setTelevisionFeePrice(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper className={!editing ? classes.paper : classes.paperEditing}>
        <div className={classes.settingsDiv}>
          <SettingsIcon className={classes.settings} color="action" />
          <Typography variant="h5" color="textSecondary">
            Meter Settings
          </Typography>
        </div>
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
        {editing ? (
          <TextField
            value={electricityPrice}
            onChange={handleEditingElectricityPrice}
            className={classes.editingTextField}
            id="outlined-size-small-1"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPrice}
            variant="body1"
            color="textSecondary"
          >
            {electricityPrice} BAM
          </Typography>
        )}

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
        {editing ? (
          <TextField
            value={measuringLocationElectricityFee}
            onChange={handleMeasuringLocationElectricityFee}
            className={classes.editingTextField}
            id="outlined-size-small-2"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPriceTwo}
            variant="body1"
            color="textSecondary"
          >
            {measuringLocationElectricityFee} BAM
          </Typography>
        )}

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
        {editing ? (
          <TextField
            value={networkFeePrice}
            onChange={handleNetworkFeePrice}
            className={classes.editingTextField}
            id="outlined-size-small-3"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPrice}
            variant="body1"
            color="textSecondary"
          >
            {networkFeePrice} BAM
          </Typography>
        )}

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
        {editing ? (
          <TextField
            value={measurementLocationNetworkFee}
            onChange={handleMeasurementLocationNetworkFee}
            className={classes.editingTextField}
            id="outlined-size-small-4"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPriceTwo}
            variant="body1"
            color="textSecondary"
          >
            {measurementLocationNetworkFee} BAM
          </Typography>
        )}

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
        {editing ? (
          <TextField
            value={renewableSourcesFeePrice}
            onChange={handleRenewableSourcesFeePrice}
            className={classes.editingTextField}
            id="outlined-size-small-5"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPrice}
            variant="body1"
            color="textSecondary"
          >
            {renewableSourcesFeePrice} BAM
          </Typography>
        )}

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
        {editing ? (
          <TextField
            value={televisionFeePrice}
            onChange={handleTelevisionFeePrice}
            className={classes.editingTextField}
            id="outlined-size-small-5"
            defaultValue="Small"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={classes.typographyPriceTwo}
            variant="body1"
            color="textSecondary"
          >
            {televisionFeePrice} BAM
          </Typography>
        )}

        <Divider className={classes.dividerTwo} />
        <div className={classes.editSettings}>
          <Typography variant="h6" color="primary">
            Edit your meter settings!
          </Typography>
          <IconButton
            className={classes.iconButton}
            color="primary"
            onClick={() => setEditing((editing) => !editing)}
          >
            {editing ? (
              <CheckIcon
                onClick={() => {
                  editSettings({
                    variables: {
                      data: {
                        priceElectricity: editedPriceElectricity,
                        measuringPointElectricity: editedMeasuringPointElectricity,
                        priceNetworkFee: editedPriceNetworkFee,
                        measuringPointNetworkFee: editedMeasuringPointNetworkFee,
                        renewableSourcesFeePrice: editedRenewableSourcesFeePrice,
                        televisionFee: editedTelevisionFee,
                      },
                    },
                  }).catch((error) => {
                    alert(error);
                  });
                  setEditing(editing);
                }}
              />
            ) : (
              <EditIcon
                onClick={() => {
                  setEditedPriceElectricity(electricityPrice);
                  setEditedMeasuringPointElectricity(
                    measuringLocationElectricityFee
                  );
                  setEditedPriceNetworkFee(networkFeePrice);
                  setEditedMeasuringPointNetworkFee(
                    measurementLocationNetworkFee
                  );
                  setEditedRenewableSourcesFeePrice(renewableSourcesFeePrice);
                  setEditedTelevisionFee(televisionFeePrice);
                }}
              />
            )}
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};
