import React, { ChangeEvent, useState } from "react";
import {
  Paper,
  makeStyles,
  Divider,
  Typography,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
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
import dotenv from "dotenv";

dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    height: 750,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  paperMedia: {
    width: 380,
    height: 550,
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
  dividerMedia: {
    width: "100%",
  },
  dividerMediaEditing: {
    width: 380,
    marginTop: 5,
    position: "relative",
    bottom: 50,
  },
  dividerTwo: {
    width: 320,
    marginTop: 0,
    marginLeft: 80,
    position: "relative",
    bottom: 25,
  },
  dividerTwoMedia: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 37,
  },
  dividerTwoMediaMeasurementLocationNetworkFee: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 55,
  },
  dividerTwoMediaIcon: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 23,
  },
  dividerTwoMediaIconNetworkFeePrice: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 43,
  },
  dividerTwoMediaIconRenewableSources: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 70,
  },
  dividerTwoMediaIconTelevisionFee: {
    width: 260,
    marginTop: 0,
    marginLeft: 50,
    position: "relative",
    bottom: 77,
  },
  settings: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 4,
  },
  settingsMedia: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  electricityIcon: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[400],
    height: 45,
    width: 45,
    borderRadius: 10,
    marginRight: 60,
  },
  electricityIconMedia: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[400],
    height: 45,
    width: 45,
    borderRadius: 10,
    marginRight: 10,
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
  networkFeeMedia: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[400],
    height: 35,
    width: 35,
    borderRadius: 10,
    marginRight: -14,
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
  divSettingMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 65,
    marginTop: 15,
  },
  divSettingMediaNetworkFee: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 65,
    bottom: 20,
  },
  divSettingTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 75,
    marginTop: 20,
  },
  divSettingTwoMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 43,
    bottom: 10,
  },
  divSettingTwoMediaMeasurementLocationNetworkFee: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 43,
    bottom: 30,
  },
  divSettingThree: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 85,
    marginTop: 20,
  },
  divSettingThreeMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 53,
    bottom: 45,
  },
  divSettingFour: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 65,
    marginTop: 20,
  },
  divSettingFourMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 33,
    bottom: 55,
  },
  typographyTitle: { position: "relative", right: 45 },
  typographyTitleMedia: { position: "relative", right: 5 },
  typographyTitleTwo: { position: "relative", right: 25 },
  typographyTitleTwoMedia: { position: "relative", left: 20 },
  typographyPrice: { position: "relative", left: 130, bottom: 25 },
  typographyPriceMedia: { position: "relative", left: 100, bottom: 22 },
  typographyPriceMediaNetworkFeePrice: {
    position: "relative",
    left: 100,
    bottom: 40,
  },
  typographyPriceMediaRenewableSourcesFee: {
    position: "relative",
    left: 92,
    bottom: 67,
  },
  typographyPriceTwo: { position: "relative", left: 135, bottom: 25 },
  typographyPriceTwoMedia: { position: "relative", left: 110, bottom: 35 },
  typographyPriceTwoMediaMeasurementLocationNetworkFee: {
    position: "relative",
    left: 110,
    bottom: 52,
  },
  typographyPriceTwoMediaTelevisionFee: {
    position: "relative",
    left: 110,
    bottom: 74,
  },
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
  typographyTwoMedia: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    left: 8,
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
  editSettingsMedia: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: 10,
    bottom: 60,
    marginBottom: 10,
  },
  editSettingsMediaTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: 10,
    bottom: 35,
    marginBottom: 10,
  },
  iconButton: { marginLeft: 10 },
  editingTextField: {
    position: "relative",
    left: 130,
    bottom: 40,
    width: 110,
  },
  editingTextFieldMedia: {
    position: "relative",
    left: 100,
    bottom: 40,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaOne: {
    position: "relative",
    left: 130,
    bottom: 40,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaTwo: {
    position: "relative",
    left: 130,
    bottom: 55,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaThree: {
    position: "relative",
    left: 130,
    bottom: 60,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaFour: {
    position: "relative",
    left: 130,
    bottom: 75,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaFive: {
    position: "relative",
    left: 130,
    bottom: 90,
    width: 100,
    height: 18,
  },
  editingTextFieldMediaSix: {
    position: "relative",
    left: 130,
    bottom: 95,
    width: 100,
    height: 18,
  },
}));

const ID_SETTINGS = process.env.REACT_APP_SETTINGS_ID;

export const Settings: React.FC<{ data: { [key: string]: any } }> = ({
  data,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const electricityPrice = data.meterSettings[0].priceElectricity;

  const measuringLocationElectricityFee =
    data.meterSettings[0].measuringPointElectricity;

  const networkFeePrice = data.meterSettings[0].priceNetworkFee;

  const measurementLocationNetworkFee =
    data.meterSettings[0].measuringPointNetworkFee;

  const renewableSourcesFeePrice =
    data.meterSettings[0].renewableSourcesFeePrice;

  const televisionFeePrice = data.meterSettings[0].televisionFee;

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
    setEditedPriceElectricity(value);
  };

  const handleMeasuringLocationElectricityFee = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedMeasuringPointElectricity(value);
  };

  const handleNetworkFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedPriceNetworkFee(value);
  };

  const handleMeasurementLocationNetworkFee = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedMeasuringPointNetworkFee(value);
  };

  const handleRenewableSourcesFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedRenewableSourcesFeePrice(value);
  };

  const handleTelevisionFeePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setEditedTelevisionFee(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        className={
          matches
            ? !editing
              ? classes.paper
              : classes.paperEditing
            : classes.paperMedia
        }
      >
        <div className={classes.settingsDiv}>
          <SettingsIcon
            className={matches ? classes.settings : classes.settingsMedia}
            color="action"
          />
          <Typography variant={matches ? "h5" : "h6"} color="textSecondary">
            Meter Settings
          </Typography>
        </div>
        <Divider className={matches ? classes.divider : classes.dividerMedia} />
        <div className={matches ? classes.divSetting : classes.divSettingMedia}>
          <ElectricityIcon
            className={
              matches ? classes.electricityIcon : classes.electricityIconMedia
            }
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={
              matches ? classes.typographyTitle : classes.typographyTitleMedia
            }
          >
            Electricity Price
          </Typography>
        </div>
        {editing ? (
          <TextField
            value={editedPriceElectricity}
            onChange={handleEditingElectricityPrice}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaOne
            }
            id="outlined-size-small-1"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches ? classes.typographyPrice : classes.typographyPriceMedia
            }
            variant="body1"
            color="textSecondary"
          >
            {electricityPrice} BAM
          </Typography>
        )}
        {editing ? undefined : (
          <Divider
            className={
              matches ? classes.dividerTwo : classes.dividerTwoMediaIcon
            }
          />
        )}

        <div
          className={
            matches ? classes.divSettingTwo : classes.divSettingTwoMedia
          }
        >
          <div className={classes.imageDivTwo}>
            <img
              src={electricIconImage}
              alt="El Grid"
              className={classes.imageElectric}
            />
          </div>
          <div
            className={
              matches ? classes.typographyTwo : classes.typographyTwoMedia
            }
          >
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
            value={editedMeasuringPointElectricity}
            onChange={handleMeasuringLocationElectricityFee}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaTwo
            }
            id="outlined-size-small-2"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches
                ? classes.typographyPriceTwo
                : classes.typographyPriceTwoMedia
            }
            variant="body1"
            color="textSecondary"
          >
            {measuringLocationElectricityFee} BAM
          </Typography>
        )}

        {editing ? undefined : (
          <Divider
            className={matches ? classes.dividerTwo : classes.dividerTwoMedia}
          />
        )}

        <div
          className={
            matches ? classes.divSetting : classes.divSettingMediaNetworkFee
          }
        >
          <NetworkFee
            className={matches ? classes.networkFee : classes.networkFeeMedia}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={
              matches
                ? classes.typographyTitleTwo
                : classes.typographyTitleTwoMedia
            }
          >
            Network Fee Price
          </Typography>
        </div>
        {editing ? (
          <TextField
            value={editedPriceNetworkFee}
            onChange={handleNetworkFeePrice}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaThree
            }
            id="outlined-size-small-3"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches
                ? classes.typographyPrice
                : classes.typographyPriceMediaNetworkFeePrice
            }
            variant="body1"
            color="textSecondary"
          >
            {networkFeePrice} BAM
          </Typography>
        )}

        {editing ? undefined : (
          <Divider
            className={
              matches
                ? classes.dividerTwo
                : classes.dividerTwoMediaIconNetworkFeePrice
            }
          />
        )}

        <div
          className={
            matches
              ? classes.divSettingTwo
              : classes.divSettingTwoMediaMeasurementLocationNetworkFee
          }
        >
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
            value={editedMeasuringPointNetworkFee}
            onChange={handleMeasurementLocationNetworkFee}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaFour
            }
            id="outlined-size-small-4"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches
                ? classes.typographyPriceTwo
                : classes.typographyPriceTwoMediaMeasurementLocationNetworkFee
            }
            variant="body1"
            color="textSecondary"
          >
            {measurementLocationNetworkFee} BAM
          </Typography>
        )}
        {editing ? undefined : (
          <Divider
            className={
              matches
                ? classes.dividerTwo
                : classes.dividerTwoMediaMeasurementLocationNetworkFee
            }
          />
        )}

        <div
          className={
            matches ? classes.divSettingThree : classes.divSettingThreeMedia
          }
        >
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
            value={editedRenewableSourcesFeePrice}
            onChange={handleRenewableSourcesFeePrice}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaFive
            }
            id="outlined-size-small-5"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches
                ? classes.typographyPrice
                : classes.typographyPriceMediaRenewableSourcesFee
            }
            variant="body1"
            color="textSecondary"
          >
            {renewableSourcesFeePrice} BAM
          </Typography>
        )}

        {editing ? undefined : (
          <Divider
            className={
              matches
                ? classes.dividerTwo
                : classes.dividerTwoMediaIconRenewableSources
            }
          />
        )}

        <div
          className={
            matches ? classes.divSettingFour : classes.divSettingFourMedia
          }
        >
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
            value={editedTelevisionFee}
            onChange={handleTelevisionFeePrice}
            className={
              matches
                ? classes.editingTextField
                : !editing
                ? classes.editingTextFieldMedia
                : classes.editingTextFieldMediaSix
            }
            id="outlined-size-small-6"
            variant="outlined"
            size="small"
          />
        ) : (
          <Typography
            className={
              matches
                ? classes.typographyPriceTwo
                : classes.typographyPriceTwoMediaTelevisionFee
            }
            variant="body1"
            color="textSecondary"
          >
            {televisionFeePrice} BAM
          </Typography>
        )}
        {editing ? (
          !matches ? (
            <Divider className={classes.dividerMediaEditing} />
          ) : undefined
        ) : (
          <Divider
            className={
              matches
                ? classes.dividerTwo
                : classes.dividerTwoMediaIconTelevisionFee
            }
          />
        )}

        <div
          className={
            matches
              ? classes.editSettings
              : !editing
              ? classes.editSettingsMedia
              : classes.editSettingsMediaTwo
          }
        >
          <Typography variant="h6" color="primary">
            Edit your meter settings!
          </Typography>
          <IconButton className={classes.iconButton} color="primary">
            {editing ? (
              <div>
                <CheckIcon
                  onClick={() => {
                    editSettings({
                      variables: {
                        data: {
                          _id: ID_SETTINGS,
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
                    setEditing(!editing);
                  }}
                />
              </div>
            ) : (
              <div>
                <EditIcon
                  onClick={() => {
                    setEditing(!editing);
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
              </div>
            )}
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};
