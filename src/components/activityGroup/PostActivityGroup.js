import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import LocationSearchInput from "../googleMap/LocationSearchInput";
// Redux stuff
import { connect } from "react-redux";
import {
  postActivityGroup,
  clearErrors,
} from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
});

const tag = [
  {
    value: "Jeux",
    label: "Jeux",
  },
  {
    value: "Bowling",
    label: "Bowling",
  },
  {
    value: "Art",
    label: "Art",
  },
  {
    value: "Pleine air",
    label: "Pleine air",
  },
  {
    value: "Sport",
    label: "Sport",
  },
  {
    value: "Arcade",
    label: "Arcade",
  },
  {
    value: "Aquatique",
    label: "Aquatique",
  },
  {
    value: "Educatif",
    label: "Educatif",
  },
  {
    value: "Musée",
    label: "Musée",
  },
  {
    value: "Soirée",
    label: "Soirée",
  },
];

class PostActivityGroup extends Component {
  constructor(props) {
    super(props);
    this.parentmethod = this.parentmethod.bind(this);
    this.state = {
      address: "",
      lat: "",
      lng: "",
      open: false,
      body: "",
      errors: {},
    };
  }

  renderSwitch(tag) {
    let colorTag = "";
    switch (tag) {
      case "Jeux":
        colorTag = "#311b92";
        return colorTag;
      case "Aquatique":
        colorTag = "#1976d2";
        return colorTag;
      case "Bowling":
        colorTag = "#004d40";
        return colorTag;
      case "Art":
        colorTag = "#880e4f";
        return colorTag;
      case "Pleine air":
        colorTag = "#2e7d32";
        return colorTag;
      case "Sport":
        colorTag = "#aeea00";
        return colorTag;
      case "Arcade":
        colorTag = "#311b92";
        return colorTag;
      case "Educatif":
        colorTag = "#b71c1c";
        return colorTag;
      case "Musée":
        colorTag = "#ff6f00";
        return colorTag;
      case "Soirée":
        colorTag = "#d500f9";
        return colorTag;
      default:
    }
  }

  parentmethod(address, lat, lng) {
    this.setState({
      address: address,
      lng: lng,
      lat: lat,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        title: "",
        body: "",
        memberLimit: 0,
        finishedAt: new Date(),
        location: "",
        open: false,
        errors: {},
        tag: "",
        lng: "",
        lat: "",
        address: "",
      });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };

  handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.address);
    console.log(this.state.lng);
    console.log(this.state.lat);
    const newActivityGroup = {
      title: this.state.title,
      body: this.state.body,
      memberLimit: this.state.memberLimit,
      finishedAt: this.state.finishedAt,
      location: this.state.location,
      tag: this.state.tag,
      activityImage: this.state.image,
      lng: this.state.lng,
      lat: this.state.lat,
      location: this.state.address,
    };
    console.log(newActivityGroup);
    console.log(newActivityGroup);
    this.props.postActivityGroup(newActivityGroup);
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    const characterLimitTitle = 25;
    const characterLimitBody = 500;

    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a ActivityGroup!">
          <Typography variant="body2" style={{ color: "white" }}>
            New Activity
          </Typography>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Creation d'une nouvelle activité</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="title"
                label="Titre de l'activitée"
                type="text"
                variant="outlined"
                inputProps={{
                  maxlength: characterLimitTitle,
                }}
                error={errors.body ? true : false}
                helperText={errors.body}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="body"
                type="text"
                label="Description"
                multiline
                rows="3"
                variant="outlined"
                placeholder="Describe your Activity Group"
                inputProps={{
                  maxlength: characterLimitBody,
                }}
                style={{ wordWrap: "break-word" }}
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                name="memberLimit"
                label="Nombre de participant max"
                type="number"
                variant="outlined"
                error={errors.body ? true : false}
                helperText={errors.body}
                onChange={this.handleChange}
                InputProps={{ inputProps: { min: 2, max: 50 } }}
                fullWidth
              />
              
              <TextField
                id="outlined-select-currency"
                select
                label="Tag"
                name="tag"
                value={this.state.tag}
                onChange={this.handleChange}
                className={classes.textField}
                variant="outlined"
                fullWidth
              >
                {tag.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="finishedAt"
                label="Date de l'activité"
                type="datetime-local"
                variant="outlined"
                defaultValue={new Date()}
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={this.handleChange}
                fullWidth
              />
              <LocationSearchInput methodfromparent={this.parentmethod} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostActivityGroup.propTypes = {
  postActivityGroup: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postActivityGroup, clearErrors })(
  GoogleApiWrapper({
    apiKey: "AIzaSyCS-YbV0v1EYqL6dYKc6bncIOQWLJTR0Xc",
  })(withStyles(styles)(PostActivityGroup))
);
